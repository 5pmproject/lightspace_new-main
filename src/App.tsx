import React from "react";
import { useAppState } from "./hooks/useAppState";
import { useNavigation } from "./hooks/useNavigation";

// Import page components
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

import { PRODUCTS } from "./data/products";

export default function App() {
  const { state, actions } = useAppState();
  
  const navigation = useNavigation({
    setViewMode: actions.setViewMode,
    setSelectedProduct: actions.setSelectedProduct,
    setCustomerInfo: actions.setCustomerInfo,
    clearCart: actions.clearCart,
    resetCustomerInfo: actions.resetCustomerInfo,
  });

  // Render current view based on viewMode
  const renderCurrentView = () => {
    switch (state.viewMode) {
      case "list":
        return (
          <ProductListPage
            products={state.filteredAndSortedProducts}
            favorites={state.favorites}
            searchTerm={state.searchTerm}
            sortOption={state.sortOption}
            filters={state.filters}
            cartCount={state.cartCount}
            onSearchChange={actions.setSearchTerm}
            onSortChange={actions.setSortOption}
            onFiltersChange={actions.setFilters}
            onToggleFavorite={actions.toggleFavorite}
            onAddToCart={(productId) => actions.addToCart(productId, 1)}
            onProductClick={navigation.handleProductClick}
            onMenuClick={() => actions.setIsNavOpen(true)}
            onCartClick={navigation.handleCartClick}
            onRoomAnalyzerClick={navigation.handleRoomAnalyzerClick}
          />
        );

      case "detail":
        return state.selectedProduct ? (
          <ProductDetailPage
            product={state.selectedProduct}
            cartCount={state.cartCount}
            onBack={navigation.handleBackToList}
            onAddToCart={(quantity) => actions.addToCart(undefined, quantity)}
            onMenuClick={() => actions.setIsNavOpen(true)}
            onCartClick={navigation.handleCartClick}
          />
        ) : null;

      case "basket":
        return (
          <BasketPage
            cartItems={state.cartItems}
            onBack={navigation.handleBackFromBasket}
            onMenuClick={() => actions.setIsNavOpen(true)}
            onUpdateQuantity={actions.updateCartItemQuantity}
            onGoToCheckout={navigation.handleGoToCheckout}
          />
        );

      case "checkout":
        return (
          <CheckoutPage
            cartCount={state.cartCount}
            customerInfo={state.customerInfo}
            onBack={navigation.handleBackFromCheckout}
            onMenuClick={() => actions.setIsNavOpen(true)}
            onProceedToPayment={navigation.handleProceedToPayment}
          />
        );

      case "payment":
        return (
          <PaymentPage
            cartCount={state.cartCount}
            onBack={navigation.handleBackFromPayment}
            onMenuClick={() => actions.setIsNavOpen(true)}
            onProceedToConfirmation={navigation.handleProceedToConfirmation}
          />
        );

      case "confirmation":
        return (
          <ConfirmationPage
            cartItems={state.cartItems}
            cartCount={state.cartCount}
            onBack={navigation.handleBackFromConfirmation}
            onMenuClick={() => actions.setIsNavOpen(true)}
            onUpdateQuantity={actions.updateCartItemQuantity}
            onCompletePurchase={navigation.handleCompletePurchase}
          />
        );

      case "orderConfirmation":
        return (
          <OrderConfirmationPage
            cartCount={0} // Cart is cleared after purchase
            customerInfo={state.customerInfo}
            onShop={navigation.handleShopFromOrderConfirmation}
            onMenuClick={() => actions.setIsNavOpen(true)}
          />
        );

      case "roomAnalyzer":
        return (
          <RoomAnalyzerPage
            cartCount={state.cartCount}
            onBack={navigation.handleBackToList}
            onMenuClick={() => actions.setIsNavOpen(true)}
            onProductClick={navigation.handleProductClick}
            products={PRODUCTS}
          />
        );

      case "newsstand":
      case "about":
      case "profile":
        return (
          <PlaceholderPage
            title={
              state.viewMode === "newsstand"
                ? "뉴스"
                : state.viewMode === "about"
                  ? "회사 소개"
                  : "내 프로필"
            }
            onBack={navigation.handleBackToList}
            onMenuClick={() => actions.setIsNavOpen(true)}
            cartCount={state.cartCount}
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
          isVisible={state.showOverlay}
          product={state.overlayProduct}
          quantity={state.overlayQuantity}
        />

        {/* Custom Menu */}
        <Menu
          isOpen={state.isNavOpen}
          onClose={() => actions.setIsNavOpen(false)}
          onNavigate={navigation.handleMenuNavigation}
        />
      </div>
    </div>
  );
}