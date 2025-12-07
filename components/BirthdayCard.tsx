import React, { forwardRef, useState } from 'react';
import { CardData } from '../types';

interface BirthdayCardProps extends CardData {}

const BirthdayCard = forwardRef<HTMLDivElement, BirthdayCardProps>((props, ref) => {
  const { 
    greeting, mainEvent, name, bestWishes, recipientLine1, recipientLine2,
    cheers, batch, department, imageUrl, backgroundImageUrl
  } = props;

  const [bgError, setBgError] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      ref={ref} 
      className="w-full h-full flex flex-col relative overflow-hidden box-border"
      // Force background color to prevent transparent rendering issues
      style={{ backgroundColor: '#0f172a' }}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>
      </div>

      {/* Layer 2: All Content Wrapper */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-3 sm:gap-6 p-4 sm:p-6" style={{ color: '#FFFFFF' }}>
        
        {/* Top Text Section */}
        <div className="text-center flex flex-col items-center w-full">
          <p className="text-yellow-400 text-xs sm:text-sm tracking-widest uppercase whitespace-nowrap leading-tight">{greeting}</p>
          <h1 className="text-4xl sm:text-5xl font-['Satisfy'] text-white my-1 whitespace-nowrap leading-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{mainEvent}</h1>
          
          {/* Name Box - Clean flat design without complex shadows */}
          <div className="mt-1 sm:mt-2 flex justify-center w-full">
            <div className="bg-blue-500 px-4 py-1.5 sm:px-6 sm:py-2 rounded-lg min-w-[100px] sm:min-w-[120px] flex items-center justify-center border-2 border-blue-400">
              <span className="font-bold text-lg sm:text-2xl text-white uppercase whitespace-nowrap leading-none pt-1">{name}</span>
            </div>
          </div>
        </div>

        {/* Center Image Section */}
        <div className="flex justify-center items-center flex-shrink-0">
          {/* Clean Border Design */}
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full border border-yellow-200">
            <div className="w-32 h-32 sm:w-56 sm:h-56 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center relative">
               {!imgError ? (
                 <img 
                  src={imageUrl} 
                  alt={name} 
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover" 
                  onError={() => setImgError(true)}
                 />
               ) : (
                 <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs">No Image</div>
               )}
            </div>
          </div>
        </div>

        {/* Bottom Text Section */}
        <div className="text-center flex flex-col items-center w-full space-y-1 sm:space-y-2">
          <p className="text-gray-200 text-xs sm:text-sm font-light uppercase tracking-wide whitespace-nowrap">{bestWishes}</p>
          <p className="font-bold text-sm sm:text-lg tracking-wide uppercase whitespace-nowrap leading-tight">{recipientLine1}</p>
          <p className="text-gray-300 text-[10px] sm:text-xs whitespace-nowrap">{recipientLine2}</p>
          <p className="text-yellow-400 text-2xl sm:text-4xl font-['Satisfy'] py-1 whitespace-nowrap leading-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{cheers}</p>
          
          {/* Batch Box - Clean Border Design */}
          <div className="mt-1 flex justify-center w-full">
             <div className="px-3 py-1 sm:px-5 sm:py-1.5 bg-yellow-500 rounded-full whitespace-nowrap min-w-[60px] sm:min-w-[80px] flex items-center justify-center border border-yellow-400">
                <span className="text-black text-xs sm:text-sm font-semibold leading-none pt-[1px]">{batch}</span>
             </div>
          </div>

          <p className="text-gray-400 text-[8px] sm:text-[10px] tracking-widest uppercase mt-2 sm:mt-4 whitespace-nowrap">{department}</p>
        </div>

      </div>
    </div>
  );
});

export default BirthdayCard;
