
import React from 'react';
import { CardData } from '../types';

interface EditorProps {
  cardData: CardData;
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBackgroundImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
  </svg>
);

const Editor: React.FC<EditorProps> = ({ cardData, onTextChange, onImageChange, onBackgroundImageChange }) => {

  const inputFields = [
    { label: "Greeting Text", name: "greeting", value: cardData.greeting },
    { label: "Main Event", name: "mainEvent", value: cardData.mainEvent },
    { label: "Name", name: "name", value: cardData.name },
    { label: "Wishes Intro", name: "bestWishes", value: cardData.bestWishes },
    { label: "Recipient Line 1", name: "recipientLine1", value: cardData.recipientLine1 },
    { label: "Recipient Line 2", name: "recipientLine2", value: cardData.recipientLine2 },
    { label: "Closing Cheer", name: "cheers", value: cardData.cheers },
    { label: "Batch/Group", name: "batch", value: cardData.batch },
    { label: "Department/Footer", name: "department", value: cardData.department },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg h-full overflow-y-auto">
      <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center border-b border-gray-200 dark:border-gray-700 pb-4">Customize Card</h2>
          
          <div>
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Photo
            </label>
            <label htmlFor="image-upload" className="mt-1 flex justify-center items-center w-full px-6 py-3 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors">
                <PhotoIcon />
                <span className="text-sm text-gray-600 dark:text-gray-400">Replace Profile Photo</span>
            </label>
            <input 
                id="image-upload" 
                name="image-upload" 
                type="file" 
                className="sr-only"
                accept="image/*"
                onChange={onImageChange}
            />
          </div>

          {onBackgroundImageChange && (
            <div>
              <label htmlFor="bg-image-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Background Image
              </label>
              <label htmlFor="bg-image-upload" className="mt-1 flex justify-center items-center w-full px-6 py-3 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors">
                  <PhotoIcon />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Replace Background</span>
              </label>
              <input 
                  id="bg-image-upload" 
                  name="bg-image-upload" 
                  type="file" 
                  className="sr-only"
                  accept="image/*"
                  onChange={onBackgroundImageChange}
              />
            </div>
          )}

          <div className="space-y-4">
            {inputFields.map(field => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  id={field.name}
                  value={field.value}
                  onChange={onTextChange}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default Editor;
