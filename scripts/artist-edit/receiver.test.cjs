const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');

function receiver({ failAppend = false } = {}) {
  const rows = [], files = [], props = new Map([
    ['SPREADSHEET_ID', 'sheet'], ['PHOTO_FOLDER_ID', 'folder'],
    ['ALLOWED_ORIGINS', 'https://uskgalle.github.io'],
  ]);
  let locked = false;
  const context = {
    console, Date, JSON,
    LockService: { getScriptLock: () => ({ tryLock: () => (locked = true), hasLock: () => locked, releaseLock: () => { locked = false; } }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: k => props.get(k), setProperty: (k, v) => props.set(k, v), getKeys: () => [...props.keys()], deleteProperty: k => props.delete(k) }) },
    SpreadsheetApp: {
      openById: () => ({ getSheetByName: () => sheet }), flush() {},
    },
    DriveApp: { getFolderById: () => ({ createFile: blob => {
      const file = { blob, getUrl: () => 'https://drive.google.com/private-photo' };
      files.push(file); return file;
    } }) },
    Utilities: { base64Decode: s => [...Buffer.from(s, 'base64')], newBlob: (bytes, type, name) => ({ bytes, type, name }) },
    HtmlService: { XFrameOptionsMode: { ALLOWALL: 1 }, createHtmlOutput: html => ({ html, setXFrameOptionsMode() { return this; } }) },
  };
  const sheet = {
    getLastRow: () => rows.length,
    appendRow: row => { if (failAppend && rows.length) throw Error('Sheet write failed'); rows.push(row); },
    getRange: () => ({ createTextFinder: id => ({ matchEntireCell: () => ({ findNext: () => rows.slice(1).some(row => row[0] === id) }) }) }),
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(__dirname + '/Code.gs', 'utf8'), context);
  return { rows, files, post: payload => context.doPost({ parameter: { payload: JSON.stringify(payload) } }).html, locked: () => locked };
}

const payload = () => ({
  requestId: '11111111-1111-4111-8111-111111111111', receiptToken: '22222222-2222-4222-8222-222222222222',
  artistId: 'USKG1', artistSlug: 'yasith-arangala', role: '', returnOrigin: 'https://uskgalle.github.io', name: '=IMPORTXML("x")', email: 'artist@example.com',
  country: 'LK', bio: 'My sketching journey', instagram: '', link2: 'https://example.com', link3: '', link4: '', website: '',
  photo: Buffer.from([255, 216, 255, 224, 0, 0, 255, 217]).toString('base64'),
});

test('stores all details and photo, escapes formulas, and acknowledges only once', () => {
  const app = receiver();
  assert.match(app.post(payload()), /"ok":true/);
  assert.equal(app.rows.length, 2);
  assert.equal(app.files.length, 1);
  assert.equal(app.rows[1][2], '\'=IMPORTXML("x")');
  assert.equal(app.rows[1][8], '');
  assert.equal(app.rows[1][10], 'https://drive.google.com/private-photo');
  assert.match(app.post(payload()), /"ok":true/);
  assert.equal(app.rows.length, 2);
  assert.equal(app.files.length, 1);
  assert.equal(app.locked(), false);
});

test('invalid images, links and spam never create a row or file', () => {
  for (const patch of [{ photo: 'eA==' }, { link2: 'javascript:alert(1)' }, { website: 'spam' }, { name: '' }]) {
    const app = receiver();
    assert.match(app.post({ ...payload(), ...patch }), /"ok":false/);
    assert.equal(app.files.length, 0);
    assert.equal(app.rows.length, 0);
  }
});

test('sheet write failure never acknowledges success and releases the lock', () => {
  const app = receiver({ failAppend: true });
  assert.match(app.post(payload()), /"ok":false/);
  assert.equal(app.rows.length, 1);
  assert.equal(app.locked(), false);
});

test('unapproved origins cannot receive an acknowledgement', () => {
  const app = receiver();
  assert.equal(app.post({ ...payload(), returnOrigin: 'https://attacker.example' }), 'Registration unavailable.');
  assert.equal(app.files.length, 0);
});

 test('text-only edit keeps the current photo and records artist identity', () => {
  const app = receiver();
  assert.match(app.post({ ...payload(), photo: '' }), /"ok":true/);
  assert.equal(app.files.length, 0);
  assert.equal(app.rows[1][10], 'Keep existing photo');
  assert.equal(app.rows[1][12], 'USKG1');
 });
 test('invalid artist identity cannot create a request', () => {
  const app = receiver();
  assert.match(app.post({ ...payload(), artistId: '' }), /"ok":false/);
  assert.equal(app.rows.length, 0);
 });
