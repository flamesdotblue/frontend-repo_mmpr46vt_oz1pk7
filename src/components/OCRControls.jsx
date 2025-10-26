import React from 'react';
import { PlayCircle } from 'lucide-react';

const languages = [
  { code: 'eng', label: 'English' },
  { code: 'spa', label: 'Spanish' },
  { code: 'fra', label: 'French' },
  { code: 'deu', label: 'German' },
  { code: 'por', label: 'Portuguese' },
  { code: 'ita', label: 'Italian' },
];

export default function OCRControls({ language, setLanguage, canRun, onRun, isProcessing, progress }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div className="flex-1">
        <label className="text-sm text-muted-foreground">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-1 w-full rounded-lg border bg-background px-3 py-2"
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code}>{l.label}</option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label className="text-sm text-muted-foreground">Progress</label>
        <div className="mt-1 h-10 rounded-lg border flex items-center overflow-hidden">
          <div className="h-full bg-indigo-600 transition-all" style={{ width: `${Math.round(progress * 100)}%` }} />
          <div className="absolute w-full text-center text-xs" aria-live="polite">
            {isProcessing ? `${Math.round(progress * 100)}%` : 'Idle'}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onRun}
        disabled={!canRun || isProcessing}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white shadow hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <PlayCircle className="h-5 w-5" />
        {isProcessing ? 'Extracting…' : 'Extract Text'}
      </button>
    </div>
  );
}
