
import React, { forwardRef, useState } from 'react';
import { CardData } from '../types';

interface BirthdayCardProps extends CardData {}

const BirthdayCard = forwardRef<HTMLDivElement, BirthdayCardProps>((props, ref) => {
  const { 
    greeting, mainEvent, name, bestWishes, recipientLine1, recipientLine2,
    cheers, batch, department, imageUrl, backgroundImageUrl
  } = props;

  const [bgError, setBgError] = useState(false);

  return (
    <div 
      ref={ref} 
      className="w-full h-full flex flex-col relative overflow-hidden bg-transparent"
      style={{ 
        textShadow: '0 2px 4px rgba(0,0,0,0.8)', // Strong text shadow for visibility
        fontVariant: 'normal',
        letterSpacing: 'normal' 
      }} 
    >
      {/* Layer 1: Background Image */}
      <div className="absolute inset-0 z-0">
        {!bgError ? (
          <img 
            src={backgroundImageUrl} 
            alt="Card Background" 
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
            onError={() => setBgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-slate-900"></div> 
        )}
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>
      </div>

      {/* Layer 2: All Content Wrapper */}
      {/* Removed drop-shadow classes as they break html2canvas text rendering */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-8" style={{ color: '#FFFFFF' }}>
        
        {/* Top Text Section */}
        <div className="text-center pt-4">
          <p className="text-yellow-400 text-sm tracking-widest uppercase">{greeting}</p>
          <h1 className="text-5xl font-['Satisfy'] text-white my-2">{mainEvent}</h1>
          <p className="inline-block bg-blue-500 px-6 py-2 rounded-lg shadow-lg font-bold text-2xl text-white my-2 uppercase">{name}</p>
        </div>

        {/* Center Image Section */}
        <div className="flex justify-center items-center my-4">
          <div className="p-2 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-2xl">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden bg-gray-200">
               <img 
                src={imageUrl} 
                alt={name} 
                crossOrigin="anonymous"
                className="w-full h-full object-cover" 
               />
            </div>
          </div>
        </div>

        {/* Bottom Text Section */}
        <div className="text-center space-y-2 pb-4">
          <p className="text-gray-200 text-sm font-light uppercase tracking-wide">{bestWishes}</p>
          <p className="font-bold text-lg tracking-wide uppercase">{recipientLine1}</p>
          <p className="text-gray-300 text-xs">{recipientLine2}</p>
          <p className="text-yellow-400 text-4xl font-['Satisfy'] py-1">{cheers}</p>
          <div className="inline-block px-5 py-1 bg-yellow-500 rounded-full text-black text-sm font-semibold shadow-md" style={{ textShadow: 'none' }}>
            {batch}
          </div>
          <p className="text-gray-400 text-[10px] tracking-widest uppercase mt-4">{department}</p>
        </div>

      </div>
    </div>
  );
});

export default BirthdayCard;
