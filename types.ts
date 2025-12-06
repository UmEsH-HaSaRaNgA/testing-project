
export interface Decorations {
  showBalloons: boolean;
  showCake: boolean;
  showStars: boolean;
  showSparkles: boolean;
}

export interface CardData {
  greeting: string;
  mainEvent: string;
  name: string;
  bestWishes: string;
  recipientLine1: string;
  recipientLine2: string;
  cheers: string;
  batch: string;
  department: string;
  imageUrl: string;
  backgroundImageUrl: string;
  decorations: Decorations;
}
