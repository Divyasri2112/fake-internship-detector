import React, { useState } from 'react';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import ResultsDashboard from './components/ResultsDashboard';
import Methodology from './components/Methodology';
import { analyzePoster } from './utils/analyzer';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (file, previewUrl) => {
    setSelectedImage(previewUrl);
    setIsAnalyzing(true);
    setResults(null);
    
    try {
      const analysisResult = await analyzePoster(file);
      
      if (analysisResult.success) {
        setResults(analysisResult);
      } else {
        alert(analysisResult.error || "Failed to analyze image.");
        resetAnalysis();
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred during analysis.");
      resetAnalysis();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setResults(null);
    setSelectedImage(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10 flex flex-col gap-10">
        <Hero />
        
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <UploadSection 
            onUpload={handleImageUpload} 
            isAnalyzing={isAnalyzing}
            selectedImage={selectedImage}
            onReset={resetAnalysis}
          />
          <ResultsDashboard 
            results={results} 
            isAnalyzing={isAnalyzing}
          />
        </main>

        <Methodology />
      </div>
    </div>
  );
}

export default App;
