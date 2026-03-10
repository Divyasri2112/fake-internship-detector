import React, { useCallback, useState } from 'react';
import { UploadCloud, Image as ImageIcon, CheckCircle, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

export default function UploadSection({ onUpload, isAnalyzing, selectedImage, onReset }) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    
    const previewUrl = URL.createObjectURL(file);
    onUpload(file, previewUrl);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="glass-panel p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ImageIcon className="text-brand-400 w-5 h-5" />
            Upload Poster
          </h2>
          {selectedImage && (
            <button 
              onClick={onReset}
              className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" /> Reset
            </button>
          )}
        </div>

        {!selectedImage ? (
          <label 
            className={clsx(
              "flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 cursor-pointer transition-all duration-300 min-h-[300px]",
              isDragActive ? "border-brand-400 bg-brand-500/10" : "border-slate-600 hover:border-brand-500/50 hover:bg-slate-800/50"
            )}
            onDragOver={(e) => { e.preventDefault(); setIsDragActive(true); }}
            onDragLeave={() => setIsDragActive(false)}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 shadow-inner">
              <UploadCloud className="w-8 h-8 text-brand-400" />
            </div>
            <p className="text-lg font-medium mb-1">Click to upload or drag & drop</p>
            <p className="text-sm text-slate-400">SVG, PNG, JPG or GIF (max. 5MB)</p>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleChange}
            />
          </label>
        ) : (
          <div className="flex-1 flex flex-col min-h-[300px] relative rounded-xl overflow-hidden border border-slate-700 bg-black/40">
            <img 
              src={selectedImage} 
              alt="Uploaded poster" 
              className={clsx(
                "w-full h-full object-contain transition-opacity duration-300",
                isAnalyzing ? "opacity-30" : "opacity-100"
              )}
            />
            
            {isAnalyzing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-sm z-10">
                <div className="w-16 h-16 border-4 border-slate-700 border-t-brand-400 rounded-full animate-spin mb-4"></div>
                <p className="text-lg font-medium text-brand-300 animate-pulse">Analyzing Poster Text...</p>
                <p className="text-sm text-slate-400 mt-2">Running OCR & Heuristics</p>
              </div>
            )}
            
            {!isAnalyzing && (
              <div className="absolute bottom-4 right-4 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1 text-sm backdrop-blur-md">
                <CheckCircle className="w-4 h-4" /> Analyzed
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
