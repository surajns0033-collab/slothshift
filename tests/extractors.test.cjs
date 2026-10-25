const test = require('node:test');
const assert = require('node:assert/strict');
const { extractText, htmlToText, rtfToText } = require('../electron/extractors.cjs');

test('plain text extraction strips a UTF-8 byte-order mark', async () => {
  assert.equal(await extractText('.txt', Buffer.from('\uFEFFhello')), 'hello');
});
test('HTML extraction removes script/style content and keeps readable text', () => {
  assert.equal(htmlToText('<h1>Invoice</h1><script>steal()</script><p>Due &amp; payable</p>'), 'Invoice\nDue & payable');
});
test('RTF extraction removes formatting controls and retains words', () => {
  const slash = String.fromCharCode(92);
  const text = rtfToText('{'+slash+'rtf1'+slash+'ansi Hello'+slash+'par World}');
  assert.match(text, /Hello/);
  assert.match(text, /World/);
  assert.doesNotMatch(text, /rtf1/);
});
test('unsupported formats fail explicitly instead of pretending to parse', async () => {
  await assert.rejects(() => extractText('.png', Buffer.from('image bytes')), /Unsupported format/);
});
