
import React, { useState } from 'react';
import { HEADSHOT_STYLES } from './constants';
import { generateHeadshot } from './services/geminiService';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { HeadshotDisplay } from './components/HeadshotDisplay';
import { LoadingIndicator } from './components/LoadingIndicator';
import type { HeadshotStyle } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalImageMimeType, setOriginalImageMimeType] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyleId, setSelectedStyleId] = useState<string>(HEADSHOT_STYLES[0].id);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (base64: string, mimeType: string) => {
    setOriginalImage(base64);
    setOriginalImageMimeType(mimeType);
    setGeneratedImage(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!originalImage || !originalImageMimeType) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    const selectedStyle = HEADSHOT_STYLES.find(s => s.id === selectedStyleId);
    if (!selectedStyle) {
        setError('Invalid style selected.');
        setIsLoading(false);
        return;
    }

    // Combine style prompt with custom prompt
    const finalPrompt = `${selectedStyle.prompt}. ${customPrompt}`.trim();

    try {
      const result = await generateHeadshot(originalImage, originalImageMimeType, finalPrompt);
      setGeneratedImage(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            AI Headshot Photographer
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Transform your selfie into a professional headshot in seconds.
          </p>
        </header>

        <main className="flex flex-col lg:flex-row gap-8">
          {/* Controls Panel */}
          <div className="lg:w-1/3 xl:w-1/4 space-y-6 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <div>
              <h2 className="text-lg font-semibold text-gray-200 mb-3">1. Upload Your Selfie</h2>
              <ImageUploader onImageUpload={handleImageUpload} originalImage={originalImage} originalImageMimeType={originalImageMimeType} />
            </div>

            {originalImage && (
              <>
                <StyleSelector 
                  styles={HEADSHOT_STYLES}
                  selectedStyleId={selectedStyleId}
                  onStyleChange={setSelectedStyleId}
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-200 mb-3">3. Add Edits (Optional)</h2>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g., 'Add a retro filter', 'Remove the person in the background'"
                    className="w-full h-24 p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-200 placeholder-gray-500"
                  />
                </div>
                
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
                >
                  {isLoading ? (
                     <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                     </>
                  ) : 'Generate Headshot'}
                </button>
              </>
            )}
             {error && (
                <div className="mt-4 p-3 bg-red-900/50 border border-red-500 text-red-300 rounded-lg text-sm">
                    <strong>Error:</strong> {error}
                </div>
            )}
          </div>

          {/* Display Area */}
          <div className="lg:w-2/3 xl:w-3/4 flex-grow relative">
            {isLoading && <LoadingIndicator message="Generating your headshot..." />}
            {!originalImage && (
                <div className="h-full flex items-center justify-center bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-700">
                    <div className="text-center text-gray-500">
                        <p className="text-xl">Upload a selfie to get started</p>
                        <p>Your generated headshot will appear here.</p>
                    </div>
                </div>
            )}
            {(originalImage && !generatedImage && !isLoading) && (
                <div className="h-full flex items-center justify-center bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-700">
                    <div className="text-center text-gray-500">
                        <p className="text-xl">Ready to generate?</p>
                        <p>Click "Generate Headshot" to see the magic happen.</p>
                    </div>
                </div>
            )}
            {generatedImage && <HeadshotDisplay originalImage={originalImage} originalImageMimeType={originalImageMimeType} generatedImage={generatedImage} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
