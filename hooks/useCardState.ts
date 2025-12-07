
import React, { useState, useCallback, useEffect } from 'react';
import { CardData } from '../types';

const initialCardData: CardData = {
  greeting: 'HAPPY',
  mainEvent: 'Birthday',
  name: 'ABDULLAH',
  bestWishes: 'BEST WISHES TO',
  recipientLine1: 'OUR BATCH MATE ABDULLAH',
  recipientLine2: 'To have a wonderful life ahead',
  cheers: 'Cheers on Your Day',
  batch: '24/25 BATCH',
  department: 'DEPARTMENT OF MULTIMEDIA AND WEB TECHNOLOGY',
  imageUrl: 'https://raw.githubusercontent.com/UmEsH-HaSaRaNgA/birthday-card-creator/main/public/user.jpg', // Fixed: Use reliable placeholder
  backgroundImageUrl: 'https://raw.githubusercontent.com/UmEsH-HaSaRaNgA/birthday-card-creator/main/public/my-background.jpg',
  decorations: {
    showBalloons: true,
    showCake: true,
    showStars: true,
    showSparkles: true,
  },
};

export const useCardState = () => {
  const [cardData, setCardData] = useState<CardData>(initialCardData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(null);

  // Handle Profile Image Upload
  useEffect(() => {
    let objectUrl: string | null = null;
    if (imageFile) {
      objectUrl = URL.createObjectURL(imageFile);
      setCardData(prevData => ({ ...prevData, imageUrl: objectUrl! }));
    }
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [imageFile]);

  // Handle Background Image Upload
  useEffect(() => {
    let objectUrl: string | null = null;
    if (backgroundImageFile) {
      objectUrl = URL.createObjectURL(backgroundImageFile);
      setCardData(prevData => ({ ...prevData, backgroundImageUrl: objectUrl! }));
    }
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [backgroundImageFile]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  }, []);

  const handleBackgroundImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBackgroundImageFile(e.target.files[0]);
    }
  }, []);

  return { cardData, handleTextChange, handleImageChange, handleBackgroundImageChange };
};
