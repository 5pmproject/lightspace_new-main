import React from 'react';
import StatusBar from './shared/StatusBar';
import { CartItem } from '../types';

interface BasketPageProps {
  cartItems: CartItem[];
  onBack: () => void;
  onMenuClick: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onGoToCheckout: () => void;
}

export default function BasketPage({
  cartItems,
  onBack,
  onMenuClick,
  onUpdateQuantity,
  onGoToCheckout
}: BasketPageProps) {
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.priceValue * item.quantity), 0);

  return (
    <div className="bg-[#ffffff] relative size-full">
      {/* Status Bar */}
      <StatusBar />

      {/* Header */}
      <div className="absolute bg-[#ffffff] h-16 left-0 right-0 top-[31px] border-b border-neutral-200">
        <button onClick={onBack} className="absolute left-5 top-[18px] w-8 h-8 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-[18px] font-medium text-[#1a1a1a]">장바구니</h1>
        </div>

        <button onClick={onMenuClick} className="absolute right-5 top-[18px] w-8 h-8 flex items-center justify-center">
          <div className="h-1.5 w-[18px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 8">
              <g>
                <line stroke="black" strokeWidth="1.5" x2="18" y1="1.25" y2="1.25" />
                <line stroke="black" strokeWidth="1.5" x2="18" y1="7.25" y2="7.25" />
              </g>
            </svg>
          </div>
        </button>
      </div>

      {/* Content */}
      <div className="absolute left-0 right-0 top-[95px] bottom-24 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-6xl mb-4">🛒</span>
            <h2 className="text-[20px] font-medium text-[#1a1a1a] mb-2">장바구니가 비어있습니다</h2>
            <p className="text-gray-500 mb-6">마음에 드는 조명을 담아보세요</p>
            <button onClick={onBack} className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg">
              쇼핑 계속하기
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white border rounded-lg p-4 flex items-center space-x-4">
                <div 
                  className="w-16 h-16 bg-gray-200 rounded bg-cover bg-center"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="flex-1">
                  <h3 className="font-medium text-[#1a1a1a]">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 border rounded flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 border rounded flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[18px] font-medium">총 금액</span>
            <span className="text-[20px] font-medium text-[#1a1a1a]">
              ₩{totalPrice.toLocaleString()}
            </span>
          </div>
          <button
            onClick={onGoToCheckout}
            className="w-full bg-[#1a1a1a] text-white py-3 rounded-lg font-medium"
          >
            주문하기
          </button>
        </div>
      )}
    </div>
  );
}