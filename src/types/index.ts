export interface EventDetails {
  id: string;
  name: string;
  bengaliName: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  rituals: string[];
  significance: string;
  dresscode: string;
  photo?: string;
}

export interface RSVPResponse {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  eventId: string;
  attending: boolean;
  guestCount: number;
  dietaryRestrictions: string;
  message: string;
  submittedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'guest';
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: 'engagement' | 'pre-wedding' | 'ceremony' | 'reception';
}

export interface CulturalInfo {
  id: string;
  title: string;
  bengaliTitle: string;
  description: string;
  significance: string;
  traditions: string[];
}