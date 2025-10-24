
import React from 'react';

interface HeadshotDisplayProps {
  originalImage: string | null;
  originalImageMimeType: string | null;
  generatedImage: string | null;
}

const ImageCard: React.FC<{ title: string; imageSrc: string | null; isPlaceholder?: boolean }> = ({ title, imageSrc, isPlaceholder = false }) => (
  <div className="w-full md:w-1/2 p-2">
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
      <h3 className="text-center font-semibold py-2 bg-gray-700 text-gray-300">{title}</h3>
      <div className="flex-grow flex items-center justify-center p-4 min-h-[200px] sm:min-h-[300px] md:min-h-[400px]">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="max-w-full max-h-full object-contain rounded-md"
          />
        ) : (
          <div className={`w-full h-full rounded-md flex items-center justify-center ${isPlaceholder ? 'bg-gray-700/50' : ''}`}>
            {isPlaceholder && <p className="text-gray-500">Your professional headshot will appear here.</p>}
          </div>
        )}
      </div>
    </div>
  </div>
);


export const HeadshotDisplay: React.FC<HeadshotDisplayProps> = ({ originalImage, originalImageMimeType, generatedImage }) => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4">
      {originalImage && originalImageMimeType && <ImageCard title="Original" imageSrc={`data:${originalImageMimeType};base64,${originalImage}`} />}
      <ImageCard title="Generated Headshot" imageSrc={generatedImage ? `data:image/png;base64,${generatedImage}` : null} isPlaceholder={!!originalImage} />
    </div>
  );
};
