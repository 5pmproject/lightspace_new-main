import React from 'react';
import StatusBar from './shared/StatusBar';

interface PaymentPageProps {
  cartCount: number;
  onBack: () => void;
  onMenuClick: () => void;
  onProceedToConfirmation: () => void;
}

export default function PaymentPage({
  cartCount,
  onBack,
  onMenuClick,
  onProceedToConfirmation
}: PaymentPageProps) {
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
          <h1 className="text-[18px] font-medium text-[#1a1a1a]">결제</h1>
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
        <div className="p-6 space-y-6">
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">💳</span>
            <h2 className="text-[20px] font-medium text-[#1a1a1a] mb-2">결제 방법 선택</h2>
            <p className="text-gray-500 mb-8">안전하고 간편한 결제를 진행하세요</p>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4 cursor-pointer hover:border-[#1a1a1a] transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💳</span>
                  <span className="text-[16px] font-medium">신용카드</span>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 cursor-pointer hover:border-[#1a1a1a] transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📱</span>
                  <span className="text-[16px] font-medium">카카오페이</span>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 cursor-pointer hover:border-[#1a1a1a] transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🏦</span>
                  <span className="text-[16px] font-medium">계좌이체</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-6">
        <button
          onClick={onProceedToConfirmation}
          className="w-full bg-[#1a1a1a] text-white py-3 rounded-lg font-medium"
        >
          주문 확인하기
        </button>
      </div>
    </div>
  );
}