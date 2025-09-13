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

// Hook과 상태 관리를 위한 타입들
export interface AppState {
  cartItems: CartItem[];
  favorites: Set<number>;
  searchTerm: string;
  sortOption: SortOption;
  filters: FilterOptions;
  isNavOpen: boolean;
  viewMode: ViewMode;
  selectedProduct: Product | null;
  customerInfo: CustomerInfo;
  showOverlay: boolean;
  overlayProduct: OverlayProduct | null;
  overlayQuantity: number;
}

// 이벤트 핸들러 타입들
export interface AppHandlers {
  toggleFavorite: (productId: number) => void;
  addToCart: (productId?: number, quantity?: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  handleProductClick: (product: Product) => void;
  handleBackToList: () => void;
  handleCartClick: () => void;
  handleGoToCheckout: () => void;
  handleProceedToPayment: (customerData: CustomerInfo) => void;
  handleCompletePurchase: () => void;
  handleMenuNavigation: (screen: string) => void;
}
