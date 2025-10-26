import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import OCRControls from './components/OCRControls';
import OCRResult from './components/OCRResult';
import Tesseract from 'tesseract.js';

export default function App() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [language, setLanguage] = useState('eng');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const onSelect = ({ file, url }) => {
    setFile(file);
    setImageUrl(url);
    setText('');
    setError('');
    setProgress(0);
  };

  const runOCR = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError('');
    setText('');
    setProgress(0);

    try {
      const result = await Tesseract.recognize(file, language, {
        logger: (m) => {
          if (m.status === 'recognizing text' && m.progress) {
            setProgress(m.progress);
          }
        },
      });
      setText(result.data.text || '');
      setProgress(1);
    } catch (e) {
      console.error(e);
      setError('Something went wrong while extracting text.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />

      <main className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 gap-6">
          <section className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">1. Upload Image</h2>
            <ImageUploader onSelect={onSelect} />
          </section>

          <section className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">2. Configure & Run</h2>
            <OCRControls
              language={language}
              setLanguage={setLanguage}
              canRun={Boolean(file)}
              onRun={runOCR}
              isProcessing={isProcessing}
              progress={progress}
            />
            {error && (
              <p className="mt-3 text-sm text-red-600">{error}</p>
            )}
          </section>

          <section className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">3. Result</h2>
            <OCRResult text={text} />
          </section>

          {imageUrl && (
            <section className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Preview</h2>
              <img src={imageUrl} alt="Selected" className="max-h-[500px] w-full rounded-lg object-contain bg-muted" />
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
