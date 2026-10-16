const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');

// Exercise the actual browser submission code with Google's iframe response.
const source = fs.readFileSync(__dirname + '/../../src/app/register/RegisterClient.js', 'utf8');
const send = source.slice(source.indexOf('function sendRegistration('), source.indexOf('export default function'));
function submission() {
  const listeners = new Map();
  let timeout, removed = 0;
  const context = {
    ENDPOINT: 'https://script.google.com/macros/s/test/exec',
    crypto: { randomUUID: () => 'frame-id' },
    setTimeout: callback => { timeout = callback; return 1; },
    clearTimeout() {},
    window: {
      addEventListener: (type, callback) => listeners.set(type, callback),
      removeEventListener: type => listeners.delete(type),
    },
    document: {
      createElement: () => ({ append() {}, submit() {}, remove() { removed++; } }),
      body: { append() {} },
    },
  };
  vm.createContext(context);
  vm.runInContext(send, context);
  const payload = { requestId: 'request', receiptToken: 'secret-receipt' };
  const result = context.sendRegistration(payload);
  return {
    result,
    message(origin, patch = {}) {
      listeners.get('message')?.({ origin, data: { type: 'artist-registration', ...payload, ok: true, ...patch } });
    },
    listening: () => listeners.has('message'),
    removed: () => removed,
    timeout: () => timeout(),
  };
}

test('Google sandbox and direct origins confirm a stored registration and clean up', async () => {
  for (const origin of [
    'https://n-example-0lu-script.googleusercontent.com',
    'https://script.googleusercontent.com',
    'https://example.script.googleusercontent.com',
    'https://script.google.com',
  ]) {
    const app = submission();
    app.message(origin);
    assert.equal((await app.result).ok, true);
    assert.equal(app.listening(), false);
    assert.equal(app.removed(), 2);
  }
});

test('untrusted origins and mismatched receipts cannot confirm registration', async () => {
  const app = submission();
  for (const origin of ['https://attacker.example', 'https://n-script.googleusercontent.com.attacker.example', 'http://n-script.googleusercontent.com']) {
    app.message(origin);
    assert.equal(app.listening(), true);
  }
  app.message('https://n-script.googleusercontent.com', { receiptToken: 'wrong' });
  app.message('https://n-script.googleusercontent.com', { requestId: 'wrong' });
  assert.equal(app.listening(), true);
  const rejection = assert.rejects(app.result, /could not confirm/);
  app.timeout();
  await rejection;
});

test('receiver failure is displayed instead of success or timeout', async () => {
  const app = submission();
  const rejection = assert.rejects(app.result, error => error.message === 'Check your details' && error.canEdit === true);
  app.message('https://n-script.googleusercontent.com', { ok: false, canEdit: true, message: 'Check your details' });
  await rejection;
  assert.equal(app.listening(), false);
});
