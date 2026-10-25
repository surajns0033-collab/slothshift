const test = require('node:test');
const assert = require('node:assert/strict');
const { zipStore, crc32 } = require('../zip-store.cjs');

test('CRC-32 matches the standard check value for hello', () => {
  assert.equal(crc32(new TextEncoder().encode('hello')), 0x3610a686);
});
test('ZIP writer creates local header, central directory, and end record', () => {
  const bytes = zipStore([{ name: 'folder/hello.txt', data: 'hello' }]);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  assert.equal(view.getUint32(0, true), 0x04034b50);
  const nameLength = view.getUint16(26, true);
  const bodyStart = 30 + nameLength;
  assert.equal(new TextDecoder().decode(bytes.slice(30, bodyStart)), 'folder/hello.txt');
  assert.equal(new TextDecoder().decode(bytes.slice(bodyStart, bodyStart + 5)), 'hello');
  let centralAt = -1, endAt = -1;
  for (let i = bodyStart + 5; i <= bytes.length - 4; i++) {
    const signature = view.getUint32(i, true);
    if (signature === 0x02014b50) centralAt = i;
    if (signature === 0x06054b50) endAt = i;
  }
  assert.ok(centralAt > 0);
  assert.ok(endAt > centralAt);
});
