import { Product, ViewMode, CustomerInfo } from '../types';

interface UseNavigationProps {
  setViewMode: (mode: ViewMode) => void;
  setSelectedProduct: (product: Product | null) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  clearCart: () => void;
  resetCustomerInfo: () => void;
}

export const useNavigation = ({
  setViewMode,
  setSelectedProduct,
  setCustomerInfo,
  clearCart,
  resetCustomerInfo,
}: UseNavigationProps) => {
  
  // Product navigation
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedProduct(null);
  };

  // Cart navigation
  const handleCartClick = () => {
    setViewMode("basket");
  };

  const handleBackFromBasket = () => {
    setViewMode("list");
  };

  // Checkout flow navigation
  const handleGoToCheckout = () => {
    setViewMode("checkout");
  };

  const handleBackFromCheckout = () => {
    setViewMode("basket");
  };

  const handleProceedToPayment = (customerData: CustomerInfo) => {
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
    clearCart();
  };

  const handleShopFromOrderConfirmation = () => {
    setViewMode("list");
    setSelectedProduct(null);
    resetCustomerInfo();
  };

  // Menu navigation
  const handleMenuNavigation = (screen: string) => {
    setViewMode(screen as ViewMode);
    setSelectedProduct(null);
  };

  // Room analyzer navigation
  const handleRoomAnalyzerClick = () => {
    setViewMode("roomAnalyzer");
  };

  return {
    handleProductClick,
    handleBackToList,
    handleCartClick,
    handleBackFromBasket,
    handleGoToCheckout,
    handleBackFromCheckout,
    handleProceedToPayment,
    handleBackFromPayment,
    handleProceedToConfirmation,
    handleBackFromConfirmation,
    handleCompletePurchase,
    handleShopFromOrderConfirmation,
    handleMenuNavigation,
    handleRoomAnalyzerClick,
  };
};
