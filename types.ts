
export type Language = 'en' | 'ar';

export interface Service {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: string;
  basePrice: number;
}

export interface Order {
  id: string;
  userId: string;
  serviceId: string;
  specs: {
    size: string;
    quantity: number;
    material: string;
  };
  price: number;
  status: 'Pending' | 'Processing' | 'Printing' | 'Ready' | 'Completed';
  createdAt: string;
  fileName?: string;
  fileSize?: string;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface TranslationMap {
  [key: string]: {
    en: string;
    ar: string;
  };
}
