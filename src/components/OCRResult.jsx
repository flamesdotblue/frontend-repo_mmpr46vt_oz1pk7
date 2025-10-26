import React from 'react';
import { Copy, Download } from 'lucide-react';

export default function OCRResult({ text }) {
  const hasText = (text || '').trim().length > 0;

  const copyToClipboard = async () => {
    if (!hasText) return;
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard');
    } catch (e) {
      console.error(e);
    }
  };

  const downloadTxt = () => {
    if (!hasText) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-text.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Extracted Text</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            disabled={!hasText}
            className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-muted disabled:opacity-50"
          >
            <Copy className="h-4 w-4" /> Copy
          </button>
          <button
            onClick={downloadTxt}
            disabled={!hasText}
            className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-muted disabled:opacity-50"
          >
            <Download className="h-4 w-4" /> Download
          </button>
        </div>
      </div>
      <textarea
        value={text}
        readOnly
        placeholder="Your extracted text will appear here..."
        className="min-h-[200px] w-full rounded-lg border bg-background p-3 font-mono text-sm"
      />
    </div>
  );
}
