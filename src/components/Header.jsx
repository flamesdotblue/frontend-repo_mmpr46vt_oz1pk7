import React from 'react';
import { Image as ImageIcon, FileText } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full py-8">
      <div className="max-w-5xl mx-auto px-4 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600">
          <ImageIcon className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Image to Text</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <FileText className="h-4 w-4" /> Extract text from images using OCR in your browser.
          </p>
        </div>
      </div>
    </header>
  );
}
