export type AgeRange = '0-6m' | '6-12m' | '1-2y' | '2-4y';

export interface Product {
  id: string;
  name: string;
  category: string;
  ageRange: AgeRange;
  ageLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'Best Seller' | 'New' | '100% Organic' | 'Staff Pick';
  description: string;
  skills: string[]; // for popcorn bouncing chips in quick-view
  material: string;
  colors: string[];
  themeColor: string;
  imageType: 'stacker' | 'sleepsack' | 'rattle' | 'bunny' | 'sorter' | 'mobile' | 'drum' | 'walker';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FlyingItem {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  type: 'teddy' | 'star';
}

export interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    reaction: 'clap' | 'giggle' | 'thumbsup';
    subtext: string;
  }[];
}

export interface GrowthRecord {
  id: string;
  date: string;
  ageMonths: number;
  weightKg: number;
  heightCm: number;
  milestone?: string;
  notes?: string;
}
