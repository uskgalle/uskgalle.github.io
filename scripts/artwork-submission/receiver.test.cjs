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

const payload = () => ({requestId: '11111111-1111-4111-8111-111111111111', receiptToken: '22222222-2222-4222-8222-222222222222', returnOrigin:'https://uskgalle.github.io', artistId:'USKG1', title:'=Artwork', description:'', imageType:'image/jpeg', image:Buffer.from([255,216,255,224,0,0,255,217]).toString('base64')});
test('saves one artwork and row, neutralizes formulas and deduplicates retries',()=>{const a=receiver();assert.match(a.post(payload()), /"ok":true/);assert.match(a.post(payload()), /"ok":true/);assert.equal(a.rows.length,2);assert.equal(a.files.length,1);assert.equal(a.rows[1][3], "'=Artwork");});
test('rejects malformed artist IDs and invalid images',()=>{for(const patch of [{artistId:'unknown'},{image:'eA=='},{title:''},{imageType:'text/html'}]){const a=receiver();assert.match(a.post({...payload(),...patch}),/"ok":false/);assert.equal(a.files.length,0);}});
test('sheet failure cannot acknowledge success',()=>{const a=receiver({failAppend:true});assert.match(a.post(payload()), /"ok":false/);assert.equal(a.locked(),false);});

test('accepts a well-formed artist ID without a configured roster',()=>{const a=receiver();assert.match(a.post({...payload(),artistId:'USKG999'}), /"ok":true/);assert.equal(a.rows[1][2],'USKG999');});
