import React, { useState, useMemo } from "react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

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

// lightspace lighting products data
const PRODUCTS = [
  {
    id: 1,
    name: "Luna Pendant Light",
    price: "₩89,000",
    priceValue: 89000,
    brand: "Lumina Design",
    images: [
      "https://images.unsplash.com/photo-1728451151815-0038b7211c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwZW5kYW50JTIwbGlnaHQlMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU3NTc0NTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Elegant pendant light with a modern spherical design. Creates warm, ambient lighting perfect for dining areas and kitchen islands.",
    location: "Designed in Seoul, crafted with premium materials",
    features: ["Dimmer Compatible", "LED", "Minimalist"],
    room: "Dining Room",
    style: "Modern Minimalist",
    // Technical specifications
    power: "12W",
    colorTemperature: "2700K",
    lumens: "800lm",
    installationMethod: "Ceiling Mount",
    voltage: "220V",
    energyRating: "A++",
    dimensions: "Ø25cm × H30cm",
  },
  {
    id: 2,
    name: "Zen Table Lamp",
    price: "₩65,000",
    priceValue: 65000,
    brand: "Harmony Studio",
    images: [
      "https://images.unsplash.com/photo-1627941927080-f1da52f4a40a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0YWJsZSUyMGxhbXAlMjBtaW5pbWFsaXN0JTIwZGVzaWdufGVufDF8fHx8MTc1NzU3NDU4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Minimalist table lamp with clean lines and soft illumination. Perfect for bedside reading or accent lighting in living spaces.",
    location: "Handcrafted by Korean artisans",
    features: ["Touch Control", "Wireless Charging", "Modern"],
    room: "Bedroom",
    style: "Minimalist",
    // Technical specifications
    power: "8W",
    colorTemperature: "3000K",
    lumens: "450lm",
    installationMethod: "Table/Desk Placement",
    voltage: "5V USB-C",
    energyRating: "A+",
    dimensions: "W18cm × D18cm × H35cm",
  },
  {
    id: 3,
    name: "Aurora Floor Lamp",
    price: "₩125,000",
    priceValue: 125000,
    brand: "Nordic Light",
    images: [
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9vciUyMGxhbXAlMjBjb250ZW1wb3JhcnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc1NzU3NDU4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Contemporary floor lamp with adjustable height and brightness. Creates dramatic lighting effects and serves as a statement piece.",
    location: "Imported from Denmark, premium quality",
    features: ["Height Adjustable", "Smart Control", "Contemporary"],
    room: "Living Room",
    style: "Contemporary",
    // Technical specifications
    power: "18W",
    colorTemperature: "2700K-6500K",
    lumens: "1200lm",
    installationMethod: "Floor Standing",
    voltage: "220V",
    energyRating: "A++",
    dimensions: "W30cm × D30cm × H120-180cm",
  },
  {
    id: 4,
    name: "Crystal Chandelier",
    price: "₩450,000",
    priceValue: 450000,
    brand: "Elegant Living",
    images: [
      "https://images.unsplash.com/photo-1719242086474-426087b8e0d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFuZGVsaWVyJTIwZWxlZ2FudCUyMGRpbmluZyUyMHJvb218ZW58MXx8fHwxNzU3NTc0NTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Luxurious crystal chandelier that adds elegance and sophistication to any dining room or entryway. Creates stunning light reflections.",
    location: "Premium Czech crystal with gold accents",
    features: ["Crystal Elements", "Luxury", "Statement Piece"],
    room: "Dining Room",
    style: "Luxury Classic",
    // Technical specifications
    power: "60W (6 × 10W)",
    colorTemperature: "2700K",
    lumens: "3000lm",
    installationMethod: "Ceiling Mount (Professional Required)",
    voltage: "220V",
    energyRating: "A+",
    dimensions: "Ø80cm × H100cm",
  },
  {
    id: 5,
    name: "Modern Wall Sconce",
    price: "₩78,000",
    priceValue: 78000,
    brand: "Urban Lights",
    images: [
      "https://images.unsplash.com/photo-1717860477853-9538cf52833c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsJTIwc2NvbmNlJTIwbW9kZXJuJTIwYmVkcm9vbXxlbnwxfHx8fDE3NTc1NzQ1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Sleek wall-mounted sconce with geometric design. Provides excellent ambient lighting and saves space in modern bedrooms.",
    location: "Made with sustainable materials",
    features: ["Wall Mount", "Energy Efficient", "Space Saving"],
    room: "Bedroom",
    style: "Modern",
    // Technical specifications
    power: "6W",
    colorTemperature: "3000K",
    lumens: "300lm",
    installationMethod: "Wall Mount (Hardwired)",
    voltage: "220V",
    energyRating: "A++",
    dimensions: "W15cm × D8cm × H20cm",
  },
  {
    id: 6,
    name: "Kitchen Ceiling Light",
    price: "₩95,000",
    priceValue: 95000,
    brand: "Chef's Choice",
    images: [
      "https://images.unsplash.com/photo-1714425341725-b7d9825f6e83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWlsaW5nJTIwbGlnaHQlMjBtaW5pbWFsaXN0JTIwa2l0Y2hlbnxlbnwxfHx8fDE3NTc1NzQ1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Bright, even ceiling light designed for kitchen workspaces. Provides excellent task lighting for cooking and food preparation.",
    location: "Professional-grade kitchen lighting",
    features: ["High Brightness", "Even Distribution", "Kitchen Grade"],
    room: "Kitchen",
    style: "Functional Modern",
    // Technical specifications
    power: "24W",
    colorTemperature: "4000K",
    lumens: "2000lm",
    installationMethod: "Ceiling Mount (Flush)",
    voltage: "220V",
    energyRating: "A++",
    dimensions: "Ø40cm × H8cm",
  },
  {
    id: 7,
    name: "Ambient String Lights",
    price: "₩35,000",
    priceValue: 35000,
    brand: "Cozy Home",
    images: [
      "https://images.unsplash.com/photo-1752038248971-0f4fb779d965?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJpbmclMjBsaWdodHMlMjB3YXJtJTIwYW1iaWVudHxlbnwxfHx8fDE3NTc1NzQ1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Warm, cozy string lights perfect for creating romantic ambiance. Ideal for bedrooms, patios, or special occasions.",
    location: "Weather-resistant for indoor/outdoor use",
    features: ["Warm Light", "Flexible", "Ambient"],
    room: "Any Room",
    style: "Cozy Romantic",
    // Technical specifications
    power: "15W (50 LEDs)",
    colorTemperature: "2200K",
    lumens: "500lm total",
    installationMethod: "Plug-in / Battery",
    voltage: "12V Low Voltage",
    energyRating: "A+",
    dimensions: "5m Length",
  },
  {
    id: 8,
    name: "Smart LED Bulb Set",
    price: "₩55,000",
    priceValue: 55000,
    brand: "TechLight",
    images: [
      "https://images.unsplash.com/photo-1617032641876-a09861d5ef7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGJ1bGIlMjBMRUQlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NzU3NDU5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Smart WiFi-enabled LED bulbs with color-changing capabilities. Control brightness and color from your smartphone for perfect ambiance.",
    location: "Compatible with all smart home systems",
    features: ["Smart Control", "Color Changing", "Energy Efficient"],
    room: "Any Room",
    style: "Smart Tech",
    // Technical specifications
    power: "9W (Set of 4)",
    colorTemperature: "1600K-6500K + RGB",
    lumens: "806lm each",
    installationMethod: "Standard E27 Socket",
    voltage: "220V",
    energyRating: "A++",
    dimensions: "Ø6cm × H11cm each",
  },
  {
    id: 9,
    name: "Executive Desk Lamp",
    price: "₩72,000",
    priceValue: 72000,
    brand: "WorkSpace Pro",
    images: [
      "https://images.unsplash.com/photo-1711346105293-c4eb5a8a4007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNrJTIwbGFtcCUyMG9mZmljZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTc1NzQ1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Professional desk lamp with adjustable arm and focused lighting. Perfect for home offices and workspaces requiring precision lighting.",
    location: "Ergonomically designed for productivity",
    features: ["Adjustable Arm", "Focus Light", "Professional"],
    room: "Home Office",
    style: "Professional",
    // Technical specifications
    power: "14W",
    colorTemperature: "3000K-6000K",
    lumens: "1000lm",
    installationMethod: "Desktop Base",
    voltage: "5V USB-C",
    energyRating: "A++",
    dimensions: "Base Ø20cm × Arm reach 60cm",
  },
];

type SortOption = "default" | "a-z" | "price";
type ViewMode =
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

interface FilterOptions {
  room: string[];
  style: string[];
  priceRange: string | null;
}

interface CartItem {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  quantity: number;
}

interface OverlayProduct {
  id: number;
  name: string;
  image: string;
}

interface CustomerInfo {
  fullName: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
}

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
    (typeof PRODUCTS)[0] | null
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
    product: (typeof PRODUCTS)[0],
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
    product: (typeof PRODUCTS)[0],
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