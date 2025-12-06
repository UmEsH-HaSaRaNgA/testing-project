
import React, { useRef, useState } from 'react';
import BirthdayCard from './components/BirthdayCard';
import Editor from './components/Editor';
import { useCardState } from './hooks/useCardState';

// Define html2canvas type, as we are loading it from CDN
declare const html2canvas: any;

const DownloadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const LoadingIcon: React.FC = () => (
  <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);


export default function App() {
  const { cardData, handleTextChange, handleImageChange, handleBackgroundImageChange } = useCardState();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) {
      console.error("Card element not found");
      return;
    }

    setIsDownloading(true);

    try {
      // 1. Wait for fonts to be ready
      await document.fonts.ready;

      // 2. Pre-process images to DataURLs to bypass CORS issues in html2canvas
      // This is the most reliable way to ensure remote images (like github backgrounds) render.
      const images = Array.from(cardRef.current.querySelectorAll('img')) as HTMLImageElement[];
      const originalSrcs = images.map(img => img.src);

      // Helper to fetch and convert to base64
      const getBase64Image = async (url: string) => {
        try {
           const response = await fetch(url, { mode: 'cors' });
           const blob = await response.blob();
           return new Promise<string>((resolve, reject) => {
             const reader = new FileReader();
             reader.onloadend = () => resolve(reader.result as string);
             reader.onerror = reject;
             reader.readAsDataURL(blob);
           });
        } catch (e) {
          console.warn("Failed to load image via fetch, keeping original:", url);
          return url; // Fallback to original if fetch fails (e.g. strict CORS)
        }
      };

      // Swap sources
      await Promise.all(images.map(async (img) => {
        // Only attempt to proxy if it's not already a data URL or blob
        if (img.src.startsWith('http')) {
            const newSrc = await getBase64Image(img.src);
            img.src = newSrc;
        }
      }));

      // Small delay to allow React/DOM to update with new sources
      await new Promise(resolve => setTimeout(resolve, 200));

      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        scale: 2, // for better resolution
        backgroundColor: null,
      });

      // 3. Restore original image sources immediately
      images.forEach((img, i) => {
        img.src = originalSrcs[i];
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `birthday-card-${cardData.name.toLowerCase().replace(/ /g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("There was an error generating the download. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">
            Birthday Card Generator
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Customize your heartfelt wishes and download the perfect card.
          </p>
        </header>

        <div className="flex justify-center mb-8">
            <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-all duration-300 ease-in-out ${isDownloading ? 'opacity-75 cursor-not-allowed' : 'transform hover:scale-105'}`}
            >
                {isDownloading ? (
                  <>
                    <LoadingIcon />
                    Generating...
                  </>
                ) : (
                  <>
                    <DownloadIcon />
                    Download Card
                  </>
                )}
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Editor 
              cardData={cardData} 
              onTextChange={handleTextChange} 
              onImageChange={handleImageChange}
              onBackgroundImageChange={handleBackgroundImageChange}
            />
          </div>
          <div className="lg:col-span-2 flex items-center justify-center">
             <div className="w-full max-w-lg aspect-[3/4] shadow-2xl rounded-lg overflow-hidden bg-transparent">
                <BirthdayCard ref={cardRef} {...cardData} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}