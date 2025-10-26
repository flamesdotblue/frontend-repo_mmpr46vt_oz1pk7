import React, { useCallback, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

export default function ImageUploader({ onSelect }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = useCallback(
    (files) => {
      const file = files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      setPreview(url);
      onSelect({ file, url });
    },
    [onSelect]
  );

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const onRemove = () => {
    setPreview(null);
    onSelect({ file: null, url: null });
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={onDrop}
        className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed p-8 transition-colors ${
          dragActive ? 'border-indigo-500 bg-indigo-500/5' : 'border-border'
        }`}
      >
        {!preview ? (
          <>
            <div className="rounded-full bg-indigo-500/10 p-3 text-indigo-600">
              <Upload className="h-6 w-6" />
            </div>
            <div className="text-center">
              <p className="font-medium">Drop an image here, or click to upload</p>
              <p className="text-sm text-muted-foreground mt-1">PNG, JPG, or JPEG</p>
            </div>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Browse Files
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </>
        ) : (
          <div className="w-full">
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full rounded-xl border object-contain max-h-96 bg-muted"
              />
              <button
                type="button"
                onClick={onRemove}
                className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
