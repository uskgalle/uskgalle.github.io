/** Deploy this file as a Google Apps Script web app. See README.md. */
// Run manually in the editor to verify configuration and authorize access.
// Reads the destination objects without creating submissions or documents.
function checkBlogSetup() {
  var config = PropertiesService.getScriptProperties();
  ['SPREADSHEET_ID', 'DOCUMENT_FOLDER_ID', 'ALLOWED_ORIGINS'].forEach(function (key) {
    if (!config.getProperty(key)) throw new Error('Missing script property: ' + key);
  });
  SpreadsheetApp.openById(config.getProperty('SPREADSHEET_ID')).getName();
  console.log('Spreadsheet access OK');
  DriveApp.getFolderById(config.getProperty('DOCUMENT_FOLDER_ID')).getName();
  console.log('Document folder access OK');
  console.log('Allowed origins: ' + config.getProperty('ALLOWED_ORIGINS'));
}

function doPost(e) {
  var p = {};
  var file = null;
  var lock = LockService.getScriptLock();
  var validated = false;
  try {
    if (!e || !e.parameter || !e.parameter.payload || e.parameter.payload.length > 14000000) throw new Error('Invalid submission.');
    p = JSON.parse(e.parameter.payload);
    var config = PropertiesService.getScriptProperties();
    var origins = (config.getProperty('ALLOWED_ORIGINS') || 'https://uskgalle.github.io').split(',').map(function (s) { return s.trim(); });
    if (origins.indexOf(p.returnOrigin) === -1) throw new Error('Origin not enabled: ' + String(p.returnOrigin).slice(0, 200));
    if (!/^[a-f0-9-]{36}$/.test(p.requestId) || !/^[a-f0-9-]{36}$/.test(p.receiptToken)) throw new Error('Invalid submission reference.');
    if (p.website) throw new Error('Submission could not be accepted.');
    if (typeof p.artistId !== 'string' || !/^(USKG[1-9][0-9]*|USK-ADM|USK-DEV)$/.test(p.artistId)) throw new Error('Select a registered artist ID.');
    if (typeof p.title !== 'string' || !p.title.trim() || p.title.length > 160 || typeof p.notes !== 'string' || p.notes.length > 2000) throw new Error('Check title and notes.');
    if (['link', 'file', 'text'].indexOf(p.mode) === -1) throw new Error('Choose a submission method.');
    var bytes = null;
    var types = { pdf: 'application/pdf', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', txt: 'text/plain', md: 'text/markdown' };
    if (p.mode === 'link' && (typeof p.link !== 'string' || p.link.length > 2000 || !/^https:\/\/[^\s/?#@]+(?:[/?#][^\s]*)?$/.test(p.link))) throw new Error('Enter an HTTPS document link.');
    if (p.mode === 'text' && (typeof p.body !== 'string' || !p.body.trim() || p.body.length > 30000)) throw new Error('Check your article text.');
    if (p.mode === 'file') {
      if (!Object.prototype.hasOwnProperty.call(types, p.extension) || typeof p.file !== 'string' || p.file.length > 6990508 || !/^[A-Za-z0-9+/]+={0,2}$/.test(p.file)) throw new Error('Choose a supported file up to 5 MB.');
      bytes = Utilities.base64Decode(p.file);
      if (!bytes.length || bytes.length > 5 * 1024 * 1024) throw new Error('File is empty or too large.');
      var u = bytes.map(function(n) { return n & 255; });
      if (p.extension === 'pdf' && !(u[0] === 37 && u[1] === 80 && u[2] === 68 && u[3] === 70 && u[4] === 45)) throw new Error('Invalid PDF.');
      if (p.extension === 'docx' && !(u[0] === 80 && u[1] === 75 && u[2] === 3 && u[3] === 4)) throw new Error('Invalid Word document.');
      if (p.extension === 'doc' && ![208,207,17,224,161,177,26,225].every(function(n,i) { return u[i] === n; })) throw new Error('Invalid Word document.');
    }
    validated = true;
    if (!lock.tryLock(20000)) throw new Error('Submission is busy. Please retry shortly.');
    var book = SpreadsheetApp.openById(config.getProperty('SPREADSHEET_ID'));
    var sheet = book.getSheetByName('Blog Submissions') || book.insertSheet('Blog Submissions');
    if (!sheet.getLastRow()) sheet.appendRow(['Reference', 'Received at', 'Artist ID', 'Article Title', 'Notes', 'Method', 'Document link', 'Article text', 'Document (private)', 'Review status']);
    if (sheet.getLastRow() > 1 && sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(p.requestId).matchEntireCell(true).findNext()) {
      return submissionReply_(p, true, 'Submission already received.');
    }
    // Basic daily cap protects storage. This is not a substitute for CAPTCHA under abuse.
    var day = new Date().toISOString().slice(0, 10);
    var countKey = 'COUNT_' + day;
    var count = Number(config.getProperty(countKey) || 0);
    if (count >= 100) throw new Error('Today’s submission limit has been reached. Please try tomorrow.');
    if (p.mode === 'file') {
      var folder = DriveApp.getFolderById(config.getProperty('DOCUMENT_FOLDER_ID'));
      file = folder.createFile(Utilities.newBlob(bytes, types[p.extension], p.requestId + '.' + p.extension));
    }
    // Treat user text as literal text, never as a spreadsheet formula.
    var text = function (value) { return /^[=+\-@\s]/.test(value) ? "'" + value : value; };
    sheet.appendRow([p.requestId, new Date(), text(p.artistId), text(p.title), text(p.notes), p.mode, text(p.mode === 'link' ? p.link : ''), text(p.mode === 'text' ? p.body : ''), file ? file.getUrl() : '', 'Pending']);
    SpreadsheetApp.flush();
    // Counter maintenance must not turn a completed submission into a failure.
    try {
      config.getKeys().filter(function (key) { return key.indexOf('COUNT_') === 0 && key !== countKey; }).forEach(function (key) { config.deleteProperty(key); });
      config.setProperty(countKey, String(count + 1));
    } catch (ignored) {}
    return submissionReply_(p, true, 'Submission received.');
  } catch (error) {
    // Log failures even before document creation; caught errors otherwise appear
    // as Completed executions with no explanation. Never log the payload.
    console.error('Submission failed', p.requestId || '', String(error));
    // Retain any document after an ambiguous Sheet write for reconciliation.
    return submissionReply_(p || {}, false, validated ? 'We could not confirm your submission. Please retry. If this continues, contact USK Galle with your reference.' : 'Please check your artist ID, title and draft, then submit again.', !validated);
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function submissionReply_(p, ok, message, canEdit) {
  var allowed = (PropertiesService.getScriptProperties().getProperty('ALLOWED_ORIGINS') || 'https://uskgalle.github.io').split(',').map(function (s) { return s.trim(); });
  if (allowed.indexOf(p.returnOrigin) === -1) return HtmlService.createHtmlOutput('Submission unavailable.');
  var result = JSON.stringify({ type: 'blog-submission', requestId: p.requestId, receiptToken: p.receiptToken, ok: ok, message: message, canEdit: canEdit === true }).replace(/</g, '\\u003c');
  var origin = JSON.stringify(p.returnOrigin).replace(/</g, '\\u003c');
  return HtmlService.createHtmlOutput('<!doctype html><html><body><script>window.top.postMessage(' + result + ', ' + origin + ');</script></body></html>')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
