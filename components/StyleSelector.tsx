
import React from 'react';
import type { HeadshotStyle } from '../types';

interface StyleSelectorProps {
  styles: HeadshotStyle[];
  selectedStyleId: string;
  onStyleChange: (id: string) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyleId, onStyleChange }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-200 mb-3">2. Choose a Style</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {styles.map((style) => (
          <div
            key={style.id}
            onClick={() => onStyleChange(style.id)}
            className={`cursor-pointer rounded-lg border-2 p-2 transition-all duration-200 ${
              selectedStyleId === style.id ? 'border-indigo-500 bg-indigo-900/50' : 'border-gray-600 hover:border-indigo-500'
            }`}
          >
            <img src={style.thumbnail} alt={style.name} className="w-full h-20 object-cover rounded-md mb-2" />
            <p className="text-xs text-center text-gray-300">{style.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
