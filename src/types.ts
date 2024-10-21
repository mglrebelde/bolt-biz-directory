import { Timestamp } from 'firebase/firestore';

export interface Business {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  address: string;
  contactInfo: {
    phone: string;
    email: string;
  };
  website: string;
  operatingHours: {
    [key: string]: string;
  };
  photos: string[];
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  rating: number;
  latitude: number;
  longitude: number;
  ownerId?: string;
  isSponsored: boolean;
  isFeatured: boolean;
  promotionEndDate?: Timestamp;
  aimag?: string;
  soum?: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export interface Review {
  id: string;
  businessId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Timestamp;
}

export interface PromotionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isSponsored: boolean;
  isFeatured: boolean;
}