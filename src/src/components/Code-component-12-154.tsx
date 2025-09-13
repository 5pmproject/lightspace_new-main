import React from 'react';
import StatusBar from './shared/StatusBar';
import { CartItem } from '../types';

interface ConfirmationPageProps {
  cartItems: CartItem[];
  cartCount: number;
  onBack: () => void;
  onMenuClick: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onCompletePurchase: () => void;
}

export default function ConfirmationPage({
  cartItems,
  cartCount,
  onBack,
  onMenuClick,
  onUpdateQuantity,
  onCompletePurchase
}: ConfirmationPageProps) {
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
          <h1 className="text-[18px] font-medium text-[#1a1a1a]">주문 확인</h1>
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
        <div className="p-6">
          <h2 className="text-[18px] font-medium text-[#1a1a1a] mb-4">주문 상품</h2>
          
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-16 h-16 bg-gray-200 rounded bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-[#1a1a1a]">{item.name}</h3>
                    <p className="text-gray-500">{item.price} × {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₩{(item.priceValue * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">배송비</span>
              <span>무료</span>
            </div>
            <div className="flex justify-between items-center text-[18px] font-medium">
              <span>총 결제금액</span>
              <span className="text-[#1a1a1a]">₩{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-6">
        <button
          onClick={onCompletePurchase}
          className="w-full bg-[#1a1a1a] text-white py-3 rounded-lg font-medium"
        >
          주문 완료하기
        </button>
      </div>
    </div>
  );
}