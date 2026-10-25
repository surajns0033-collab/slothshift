const EXTENSIONS = new Set(['.txt','.md','.csv','.json','.log','.pdf','.docx','.xlsx','.eml','.html','.htm','.rtf']);

function decodeHtmlEntities(text) {
  return String(text).replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>').replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Math.min(0x10ffff, Number(n))))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(Math.min(0x10ffff, parseInt(n, 16))));
}
function htmlToText(html) {
  return decodeHtmlEntities(String(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<(br|\/p|\/div|\/li|\/tr|\/h[1-6])\b[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' '))
    .replace(/[ \t]+/g, ' ').replace(/\n[ \t]+/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}
function rtfToText(rtf) {
  return String(rtf)
    .replace(/\\'[0-9a-f]{2}/gi, match => String.fromCharCode(parseInt(match.slice(2), 16)))
    .replace(/\\par[d]? ?/g, '\n')
    .replace(/\\tab ?/g, '\t')
    .replace(/\\u(-?\d+)\??/g, (_, n) => String.fromCharCode((Number(n) + 65536) % 65536))
    .replace(/\\[a-zA-Z]+-?\d* ?/g, '')
    .replace(/[{}]/g, '').replace(/\n{3,}/g, '\n\n').trim();
}
function cellText(value) {
  if (value == null) return '';
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'object') {
    if (Array.isArray(value.richText)) return value.richText.map(part => part.text || '').join('');
    if (value.text) return String(value.text);
    if (value.result != null) return String(value.result);
    if (value.hyperlink) return String(value.text || value.hyperlink);
    return JSON.stringify(value);
  }
  return String(value);
}
async function extractText(extension, buffer) {
  const ext = String(extension || '').toLowerCase();
  if (!EXTENSIONS.has(ext)) throw new Error('Unsupported format: ' + ext);
  if (['.txt','.md','.csv','.json','.log'].includes(ext)) return buffer.toString('utf8').replace(/^\uFEFF/, '');
  if (['.html','.htm'].includes(ext)) return htmlToText(buffer.toString('utf8'));
  if (ext === '.rtf') return rtfToText(buffer.toString('utf8'));
  if (ext === '.docx') {
    const mammoth = require('mammoth');
    return (await mammoth.extractRawText({ buffer })).value || '';
  }
  if (ext === '.xlsx') {
    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const output = [];
    let charCount = 0;
    for (const sheet of workbook.worksheets) {
      output.push('# Sheet: ' + sheet.name);
      sheet.eachRow({ includeEmpty: false }, row => {
        if (charCount >= 50000) return;
        const line = row.values.slice(1).map(cellText).join(' | ');
        output.push(line);
        charCount += line.length;
      });
      if (charCount >= 50000) break;
    }
    return output.join('\n').slice(0, 50000);
  }
  if (ext === '.eml') {
    const { simpleParser } = require('mailparser');
    const email = await simpleParser(buffer);
    const body = email.text || htmlToText(email.html || '');
    return ['Subject: ' + (email.subject || ''), 'From: ' + (email.from?.text || ''), 'To: ' + (email.to?.text || ''), 'Date: ' + (email.date ? email.date.toISOString() : ''), '', body].join('\n').trim();
  }
  if (ext === '.pdf') {
    const { PDFParse } = require('pdf-parse');
    const parser = new PDFParse({ data: buffer });
    try {
      const result = await parser.getText();
      return String(result.text || '').slice(0, 50000);
    } finally {
      await parser.destroy();
    }
  }
  throw new Error('No extractor is configured for ' + ext);
}
module.exports = { extractText, htmlToText, rtfToText, EXTENSIONS };
