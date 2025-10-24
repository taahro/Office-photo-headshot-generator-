
import React, { useRef, useCallback } from 'react';

interface ImageUploaderProps {
  onImageUpload: (base64: string, mimeType: string) => void;
  originalImage: string | null;
  originalImageMimeType: string | null;
}

const fileToBase64 = (file: File): Promise<{ base64: string, mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve({ base64, mimeType: file.type });
    };
    reader.onerror = (error) => reject(error);
  });
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, originalImage, originalImageMimeType }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const { base64, mimeType } = await fileToBase64(file);
        onImageUpload(base64, mimeType);
      } catch (error) {
        console.error("Error converting file to base64", error);
        alert("Could not load image. Please try another file.");
      }
    }
  }, [onImageUpload]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      <button
        onClick={handleButtonClick}
        className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
      >
        {originalImage ? 'Change Selfie' : 'Upload Selfie'}
      </button>
      {originalImage && originalImageMimeType && (
        <div className="mt-4 p-2 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400 mb-2 text-center">Your Selfie</p>
          <img 
            src={`data:${originalImageMimeType};base64,${originalImage}`} 
            alt="Uploaded selfie" 
            className="w-full h-auto rounded-md object-cover"
          />
        </div>
      )}
    </div>
  );
};
