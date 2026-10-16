/** Deploy this file as a Google Apps Script web app. See README.md. */
// Run manually in the editor to verify configuration and authorize access.
// Reads the destination objects without creating registrations or photos.
function checkEditSetup() {
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
    if (!e || !e.parameter || !e.parameter.payload || e.parameter.payload.length > 3000000) throw new Error('Invalid submission.');
    p = JSON.parse(e.parameter.payload);
    var config = PropertiesService.getScriptProperties();
    var origins = (config.getProperty('ALLOWED_ORIGINS') || 'https://uskgalle.github.io').split(',').map(function (s) { return s.trim(); });
    if (origins.indexOf(p.returnOrigin) === -1) throw new Error('Origin not enabled: ' + String(p.returnOrigin).slice(0, 200));
    if (!/^[a-f0-9-]{36}$/.test(p.requestId) || !/^[a-f0-9-]{36}$/.test(p.receiptToken)) throw new Error('Invalid submission reference.');
    if (p.website) throw new Error('Submission could not be accepted.');
    ['name', 'email', 'country', 'bio'].forEach(function (key) {
      if (typeof p[key] !== 'string' || !p[key].trim()) throw new Error('Please complete all required fields.');
    });
    if (p.name.length > 120 || p.email.length > 254 || p.bio.length > 2000 || !/^[A-Z]{2}$/.test(p.country) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) throw new Error('Please check your artist details.');
    ['instagram', 'link2', 'link3', 'link4'].forEach(function (key) {
      if (typeof p[key] !== 'string' || p[key].length > 500 || (p[key] && !/^https?:\/\/[^\s]+$/i.test(p[key]))) throw new Error('Please use complete http or https links.');
    });
    if (typeof p.artistId !== 'string' || !/^[A-Za-z0-9_-]{1,80}$/.test(p.artistId) || typeof p.artistSlug !== 'string' || !/^[a-z0-9-]{1,120}$/.test(p.artistSlug)) throw new Error('Invalid artist reference.');
    if (p.photo) {
    if (typeof p.photo !== 'string' || p.photo.length > 2800000 || !/^[A-Za-z0-9+/]+={0,2}$/.test(p.photo)) throw new Error('Please choose a smaller profile picture.');
    var bytes = Utilities.base64Decode(p.photo);
    if (bytes.length < 4 || (bytes[0] & 255) !== 255 || (bytes[1] & 255) !== 216 || (bytes[2] & 255) !== 255) throw new Error('Please upload a valid photo.');
    }
    validated = true;
    if (!lock.tryLock(20000)) throw new Error('Registration is busy. Please retry shortly.');
    var book = SpreadsheetApp.openById(config.getProperty('SPREADSHEET_ID'));
    var sheet = book.getSheetByName('Change Requests') || book.insertSheet('Change Requests');
    if (!sheet.getLastRow()) sheet.appendRow(['Reference', 'Received at', 'Name', 'Email (private)', 'Country', 'Bio', 'Instagram', 'Link 2', 'Link 3', 'Link 4', 'Photo (private)', 'Review status', 'Artist ID', 'Artist slug']);
    if (sheet.getLastRow() > 1 && sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(p.requestId).matchEntireCell(true).findNext()) {
      return registrationReply_(p, true, 'Registration already received.');
    }
    // Basic daily cap protects storage. This is not a substitute for CAPTCHA under abuse.
    var day = new Date().toISOString().slice(0, 10);
    var countKey = 'COUNT_' + day;
    var count = Number(config.getProperty(countKey) || 0);
    if (count >= 100) throw new Error('Today’s submission limit has been reached. Please try tomorrow.');
    var folder = DriveApp.getFolderById(config.getProperty('PHOTO_FOLDER_ID'));
    if (p.photo) file = folder.createFile(Utilities.newBlob(bytes, 'image/jpeg', p.requestId + '.jpg'));
    // Treat user text as literal text, never as a spreadsheet formula.
    var text = function (value) { return /^[=+\-@\s]/.test(value) ? "'" + value : value; };
    sheet.appendRow([p.requestId, new Date(), text(p.name), text(p.email), p.country, text(p.bio), text(p.instagram), text(p.link2), text(p.link3), text(p.link4), file ? file.getUrl() : 'Keep existing photo', 'Pending', text(p.artistId), text(p.artistSlug)]);
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
    return registrationReply_(p || {}, false, validated ? 'We could not confirm your registration. Please retry. If this continues, contact USK Galle with your reference.' : 'Please check your required details, full http/https links and photo, then submit again.', !validated);
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function registrationReply_(p, ok, message, canEdit) {
  var allowed = (PropertiesService.getScriptProperties().getProperty('ALLOWED_ORIGINS') || 'https://uskgalle.github.io').split(',').map(function (s) { return s.trim(); });
  if (allowed.indexOf(p.returnOrigin) === -1) return HtmlService.createHtmlOutput('Registration unavailable.');
  var result = JSON.stringify({ type: 'artist-registration', requestId: p.requestId, receiptToken: p.receiptToken, ok: ok, message: message, canEdit: canEdit === true }).replace(/</g, '\\u003c');
  var origin = JSON.stringify(p.returnOrigin).replace(/</g, '\\u003c');
  return HtmlService.createHtmlOutput('<!doctype html><html><body><script>window.top.postMessage(' + result + ', ' + origin + ');</script></body></html>')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
