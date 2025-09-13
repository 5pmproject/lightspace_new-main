import { useState, useMemo, useCallback } from 'react';
import { 
  Product, 
  CartItem, 
  OverlayProduct, 
  CustomerInfo, 
  FilterOptions, 
  SortOption, 
  ViewMode,
  AppState 
} from '../types';
import { PRODUCTS } from '../data/products';

const initialCustomerInfo: CustomerInfo = {
  fullName: "",
  address: "",
  city: "",
  country: "",
  state: "",
  zipCode: "",
};

const initialFilters: FilterOptions = {
  room: [],
  style: [],
  priceRange: null,
};

export const useAppState = () => {
  // 상태 정의
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(initialCustomerInfo);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayProduct, setOverlayProduct] = useState<OverlayProduct | null>(null);
  const [overlayQuantity, setOverlayQuantity] = useState(1);

  // 계산된 값들
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = PRODUCTS.filter((product) => {
      // Search filter
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      // Room filter
      const matchesRoom = filters.room.length === 0 || 
        filters.room.includes(product.room);
      
      // Style filter  
      const matchesStyle = filters.style.length === 0 || 
        filters.style.includes(product.style);
      
      // Price range filter
      let matchesPrice = true;
      if (filters.priceRange) {
        switch (filters.priceRange) {
          case "under-50k":
            matchesPrice = product.priceValue < 50000;
            break;
          case "50k-100k":
            matchesPrice = product.priceValue >= 50000 && product.priceValue < 100000;
            break;
          case "100k-200k":
            matchesPrice = product.priceValue >= 100000 && product.priceValue < 200000;
            break;
          case "over-200k":
            matchesPrice = product.priceValue >= 200000;
            break;
        }
      }
      
      return matchesSearch && matchesRoom && matchesStyle && matchesPrice;
    });

    switch (sortOption) {
      case "a-z":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "price":
        return filtered.sort((a, b) => a.priceValue - b.priceValue);
      default:
        return filtered;
    }
  }, [searchTerm, sortOption, filters]);

  // 액션 함수들 (메모이제이션)
  const toggleFavorite = useCallback((productId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  }, [favorites]);

  const showAddToCartOverlay = (product: Product, quantity = 1) => {
    setOverlayProduct({
      id: product.id,
      name: product.name,
      image: product.images[0],
    });
    setOverlayQuantity(quantity);
    setShowOverlay(true);

    // Hide overlay after 1 second
    setTimeout(() => {
      setShowOverlay(false);
    }, 1000);
  };

  const addToCart = (productId?: number, quantityToAdd = 1) => {
    let targetProduct;

    if (productId) {
      targetProduct = PRODUCTS.find((p) => p.id === productId);
    } else if (selectedProduct) {
      targetProduct = selectedProduct;
    }

    if (!targetProduct) return;

    // Show overlay
    showAddToCartOverlay(targetProduct, quantityToAdd);

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === targetProduct.id,
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === targetProduct.id
            ? {
                ...item,
                quantity: item.quantity + quantityToAdd,
              }
            : item,
        );
      } else {
        return [
          ...prevItems,
          {
            id: targetProduct.id,
            name: targetProduct.name,
            price: targetProduct.price,
            priceValue: targetProduct.priceValue,
            image: targetProduct.images[0],
            quantity: quantityToAdd,
          },
        ];
      }
    });
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId),
      );
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const resetCustomerInfo = () => {
    setCustomerInfo(initialCustomerInfo);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    // 상태
    state: {
      cartItems,
      favorites,
      searchTerm,
      sortOption,
      filters,
      isNavOpen,
      viewMode,
      selectedProduct,
      customerInfo,
      showOverlay,
      overlayProduct,
      overlayQuantity,
      cartCount,
      filteredAndSortedProducts,
    },
    // 액션
    actions: {
      setCartItems,
      setFavorites,
      setSearchTerm,
      setSortOption,
      setFilters,
      setIsNavOpen,
      setViewMode,
      setSelectedProduct,
      setCustomerInfo,
      setShowOverlay,
      setOverlayProduct,
      setOverlayQuantity,
      toggleFavorite,
      addToCart,
      updateCartItemQuantity,
      resetCustomerInfo,
      clearCart,
    },
  };
};
