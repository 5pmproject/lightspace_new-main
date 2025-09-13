import React, { useState, useMemo } from "react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { PRODUCTS } from "./data/products";
import {
  SortOption,
  ViewMode,
  FilterOptions,
  CartItem,
  OverlayProduct,
  CustomerInfo,
  Product
} from "./types";

// Import all page components
import ProductListPage from "./components/ProductListPage";
import ProductDetailPage from "./components/ProductDetailPage";
import BasketPage from "./components/BasketPage";
import CheckoutPage from "./components/CheckoutPage";
import PaymentPage from "./components/PaymentPage";
import ConfirmationPage from "./components/ConfirmationPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";
import PlaceholderPage from "./components/PlaceholderPage";
import RoomAnalyzerPage from "./components/RoomAnalyzerPage";
import AddToCartOverlay from "./components/AddToCartOverlay";
import Menu from "./components/Menu";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(
    new Set(),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] =
    useState<SortOption>("default");
  const [filters, setFilters] = useState<FilterOptions>({
    room: [],
    style: [],
    priceRange: null,
  });
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedProduct, setSelectedProduct] = useState<
    Product | null
  >(null);

  // Customer information from checkout
  const [customerInfo, setCustomerInfo] =
    useState<CustomerInfo>({
      fullName: "",
      address: "",
      city: "",
      country: "",
      state: "",
      zipCode: "",
    });

  // Add to cart overlay state
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayProduct, setOverlayProduct] =
    useState<OverlayProduct | null>(null);
  const [overlayQuantity, setOverlayQuantity] = useState(1);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

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
        return filtered.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
      case "price":
        return filtered.sort(
          (a, b) => a.priceValue - b.priceValue,
        );
      default:
        return filtered;
    }
  }, [searchTerm, sortOption, filters]);

  const toggleFavorite = (productId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const showAddToCartOverlay = (
    product: Product,
    quantity = 1,
  ) => {
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

  const updateCartItemQuantity = (
    productId: number,
    quantity: number,
  ) => {
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

  // Navigation handlers
  const handleProductClick = (
    product: Product,
  ) => {
    setSelectedProduct(product);
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedProduct(null);
  };

  const handleCartClick = () => {
    setViewMode("basket");
  };

  const handleBackFromBasket = () => {
    setViewMode("list");
  };

  const handleGoToCheckout = () => {
    setViewMode("checkout");
  };

  const handleBackFromCheckout = () => {
    setViewMode("basket");
  };

  const handleProceedToPayment = (
    customerData: CustomerInfo,
  ) => {
    setCustomerInfo(customerData);
    setViewMode("payment");
  };

  const handleBackFromPayment = () => {
    setViewMode("checkout");
  };

  const handleProceedToConfirmation = () => {
    setViewMode("confirmation");
  };

  const handleBackFromConfirmation = () => {
    setViewMode("payment");
  };

  const handleCompletePurchase = () => {
    // Show order confirmation and clear cart
    setViewMode("orderConfirmation");
    setCartItems([]);
  };

  const handleShopFromOrderConfirmation = () => {
    setViewMode("list");
    setSelectedProduct(null);
    // Reset customer info for new order
    setCustomerInfo({
      fullName: "",
      address: "",
      city: "",
      country: "",
      state: "",
      zipCode: "",
    });
  };

  const handleMenuNavigation = (screen: string) => {
    setViewMode(screen as ViewMode);
    setSelectedProduct(null);
  };

  // Render current view based on viewMode
  const renderCurrentView = () => {
    switch (viewMode) {
      case "list":
        return (
          <ProductListPage
            products={filteredAndSortedProducts}
            favorites={favorites}
            searchTerm={searchTerm}
            sortOption={sortOption}
            filters={filters}
            cartCount={cartCount}
            onSearchChange={setSearchTerm}
            onSortChange={setSortOption}
            onFiltersChange={setFilters}
            onToggleFavorite={toggleFavorite}
            onAddToCart={(productId) => addToCart(productId, 1)}
            onProductClick={handleProductClick}
            onMenuClick={() => setIsNavOpen(true)}
            onCartClick={handleCartClick}
            onRoomAnalyzerClick={() => setViewMode("roomAnalyzer")}
          />
        );

      case "detail":
        return selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            cartCount={cartCount}
            onBack={handleBackToList}
            onAddToCart={(quantity) =>
              addToCart(undefined, quantity)
            }
            onMenuClick={() => setIsNavOpen(true)}
            onCartClick={handleCartClick}
          />
        ) : null;

      case "basket":
        return (
          <BasketPage
            cartItems={cartItems}
            onBack={handleBackFromBasket}
            onMenuClick={() => setIsNavOpen(true)}
            onUpdateQuantity={updateCartItemQuantity}
            onGoToCheckout={handleGoToCheckout}
          />
        );

      case "checkout":
        return (
          <CheckoutPage
            cartCount={cartCount}
            customerInfo={customerInfo}
            onBack={handleBackFromCheckout}
            onMenuClick={() => setIsNavOpen(true)}
            onProceedToPayment={handleProceedToPayment}
          />
        );

      case "payment":
        return (
          <PaymentPage
            cartCount={cartCount}
            onBack={handleBackFromPayment}
            onMenuClick={() => setIsNavOpen(true)}
            onProceedToConfirmation={
              handleProceedToConfirmation
            }
          />
        );

      case "confirmation":
        return (
          <ConfirmationPage
            cartItems={cartItems}
            cartCount={cartCount}
            onBack={handleBackFromConfirmation}
            onMenuClick={() => setIsNavOpen(true)}
            onUpdateQuantity={updateCartItemQuantity}
            onCompletePurchase={handleCompletePurchase}
          />
        );

      case "orderConfirmation":
        return (
          <OrderConfirmationPage
            cartCount={0} // Cart is cleared after purchase
            customerInfo={customerInfo}
            onShop={handleShopFromOrderConfirmation}
            onMenuClick={() => setIsNavOpen(true)}
          />
        );

      case "roomAnalyzer":
        return (
          <RoomAnalyzerPage
            cartCount={cartCount}
            onBack={handleBackToList}
            onMenuClick={() => setIsNavOpen(true)}
            onProductClick={handleProductClick}
            products={PRODUCTS}
          />
        );

      case "newsstand":
      case "about":
      case "profile":
        return (
          <PlaceholderPage
            title={
              viewMode === "newsstand"
                ? "뉴스"
                : viewMode === "about"
                  ? "회사 소개"
                  : "내 프로필"
            }
            onBack={handleBackToList}
            onMenuClick={() => setIsNavOpen(true)}
            cartCount={cartCount}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* iPhone 16 Container */}
      <div className="w-[393px] h-[852px] bg-[#ffffff] relative overflow-hidden rounded-[40px] shadow-2xl border-8 border-black">
        {renderCurrentView()}

        {/* Add to Cart Overlay */}
        <AddToCartOverlay
          isVisible={showOverlay}
          product={overlayProduct}
          quantity={overlayQuantity}
        />

        {/* Custom Menu */}
        <Menu
          isOpen={isNavOpen}
          onClose={() => setIsNavOpen(false)}
          onNavigate={handleMenuNavigation}
        />
      </div>
    </div>
  );
}