export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  image?: string;
  images?: string[]; // Add this for carousel support
  ingredients?: string[];
  isAvailable: boolean;
  isVisible: boolean;
  isFeatured: boolean;
  isPearsonFamous: boolean;
  allergens?: string[];
  dietaryInfo?: {
    isVegetarian?: boolean;
    isVegan?: boolean;
    isGlutenFree?: boolean;
  };
}

export type MenuCategory = {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
};
