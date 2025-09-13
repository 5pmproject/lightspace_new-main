// lightspace 프로젝트 타입 정의

export interface Product {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  brand: string;
  images: string[];
  isFavorite: boolean;
  description: string;
  location: string;
  features: string[];
  room: string;
  style: string;
  power: string;
  colorTemperature: string;
  lumens: string;
  installationMethod: string;
  voltage: string;
  energyRating: string;
  dimensions: string;
}

export type SortOption = "default" | "a-z" | "price";

export type ViewMode =
  | "list"
  | "detail"
  | "basket"
  | "checkout"
  | "payment"
  | "confirmation"
  | "orderConfirmation"
  | "roomAnalyzer"
  | "newsstand"
  | "about"
  | "profile";

export interface FilterOptions {
  room: string[];
  style: string[];
  priceRange: string | null;
}

export interface CartItem {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  quantity: number;
}

export interface OverlayProduct {
  id: number;
  name: string;
  image: string;
}

export interface CustomerInfo {
  fullName: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
}