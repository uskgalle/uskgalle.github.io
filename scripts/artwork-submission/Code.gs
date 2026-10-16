/** Deploy this file as a Google Apps Script web app. See README.md. */
// Run manually in the editor to verify configuration and authorize access.
// Reads the destination objects without creating registrations or photos.
function checkArtworkSetup() {
  var config = PropertiesService.getScriptProperties();
  ['SPREADSHEET_ID', 'PHOTO_FOLDER_ID', 'ALLOWED_ORIGINS'].forEach(function (key) {
    if (!config.getProperty(key)) throw new Error('Missing script property: ' + key);
  });
  SpreadsheetApp.openById(config.getProperty('SPREADSHEET_ID')).getName();
  console.log('Spreadsheet access OK');
  DriveApp.getFolderById(config.getProperty('PHOTO_FOLDER_ID')).getName();
  console.log('Photo folder access OK');
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
    if (typeof p.artistId !== 'string' || !/^USKG[1-9][0-9]*$/.test(p.artistId)) throw new Error('Select a registered artist ID.');
    if (typeof p.title !== 'string' || !p.title.trim() || p.title.length > 160 || typeof p.description !== 'string' || p.description.length > 1000) throw new Error('Check title and description.');
    if (typeof p.image !== 'string' || p.image.length > 13981016 || !/^[A-Za-z0-9+/]+={0,2}$/.test(p.image)) throw new Error('Choose an image up to 10 MB.');
    var bytes = Utilities.base64Decode(p.image);
    var u = bytes.map(function (n) { return n & 255; });
    var jpeg = p.imageType === 'image/jpeg' && u[0] === 255 && u[1] === 216 && u[2] === 255;
    var png = p.imageType === 'image/png' && [137,80,78,71,13,10,26,10].every(function (n,i) { return u[i] === n; });
    var webp = p.imageType === 'image/webp' && u[0] === 82 && u[1] === 73 && u[2] === 70 && u[3] === 70 && u[8] === 87 && u[9] === 69 && u[10] === 66 && u[11] === 80;
    if (!bytes.length || bytes.length > 10 * 1024 * 1024 || !(jpeg || png || webp)) throw new Error('Choose a valid JPG, PNG or WebP image.');
    validated = true;
    if (!lock.tryLock(20000)) throw new Error('Registration is busy. Please retry shortly.');
    var book = SpreadsheetApp.openById(config.getProperty('SPREADSHEET_ID'));
    var sheet = book.getSheetByName('Artwork Submissions') || book.insertSheet('Artwork Submissions');
    if (!sheet.getLastRow()) sheet.appendRow(['Reference', 'Received at', 'Artist ID', 'Artwork Title', 'Description', 'Artwork (private)', 'Review status']);
    if (sheet.getLastRow() > 1 && sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(p.requestId).matchEntireCell(true).findNext()) {
      return registrationReply_(p, true, 'Registration already received.');
    }
    // Basic daily cap protects storage. This is not a substitute for CAPTCHA under abuse.
    var day = new Date().toISOString().slice(0, 10);
    var countKey = 'COUNT_' + day;
    var count = Number(config.getProperty(countKey) || 0);
    if (count >= 100) throw new Error('Today’s submission limit has been reached. Please try tomorrow.');
    var folder = DriveApp.getFolderById(config.getProperty('PHOTO_FOLDER_ID'));
    file = folder.createFile(Utilities.newBlob(bytes, p.imageType, p.requestId + (jpeg ? '.jpg' : png ? '.png' : '.webp')));
    // Treat user text as literal text, never as a spreadsheet formula.
    var text = function (value) { return /^[=+\-@\s]/.test(value) ? "'" + value : value; };
    sheet.appendRow([p.requestId, new Date(), text(p.artistId), text(p.title), text(p.description), file.getUrl(), 'Pending']);
    SpreadsheetApp.flush();
    // Counter maintenance must not turn a completed registration into a failure.
    try {
      config.getKeys().filter(function (key) { return key.indexOf('COUNT_') === 0 && key !== countKey; }).forEach(function (key) { config.deleteProperty(key); });
      config.setProperty(countKey, String(count + 1));
    } catch (ignored) {}
    return registrationReply_(p, true, 'Registration received.');
  } catch (error) {
    // Log failures even before photo creation; caught errors otherwise appear
    // as Completed executions with no explanation. Never log the payload.
    console.error('Registration failed', p.requestId || '', String(error));
    // Retain any photo after an ambiguous Sheet write for reconciliation.
    return registrationReply_(p || {}, false, validated ? 'We could not confirm your registration. Please retry. If this continues, contact USK Galle with your reference.' : 'Please check your artist ID, title and image, then submit again.', !validated);
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function registrationReply_(p, ok, message, canEdit) {
  var allowed = (PropertiesService.getScriptProperties().getProperty('ALLOWED_ORIGINS') || 'https://uskgalle.github.io').split(',').map(function (s) { return s.trim(); });
  if (allowed.indexOf(p.returnOrigin) === -1) return HtmlService.createHtmlOutput('Registration unavailable.');
  var result = JSON.stringify({ type: 'artwork-submission', requestId: p.requestId, receiptToken: p.receiptToken, ok: ok, message: message, canEdit: canEdit === true }).replace(/</g, '\\u003c');
  var origin = JSON.stringify(p.returnOrigin).replace(/</g, '\\u003c');
  return HtmlService.createHtmlOutput('<!doctype html><html><body><script>window.top.postMessage(' + result + ', ' + origin + ');</script></body></html>')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
