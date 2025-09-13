import React from 'react';
import StatusBar from './shared/StatusBar';
import { CustomerInfo } from '../types';

interface OrderConfirmationPageProps {
  cartCount: number;
  customerInfo: CustomerInfo;
  onShop: () => void;
  onMenuClick: () => void;
}

export default function OrderConfirmationPage({
  cartCount,
  customerInfo,
  onShop,
  onMenuClick
}: OrderConfirmationPageProps) {
  const orderNumber = `LS${Date.now().toString().slice(-8)}`;

  return (
    <div className="bg-[#ffffff] relative size-full">
      {/* Status Bar */}
      <StatusBar />

      {/* Header */}
      <div className="absolute bg-[#ffffff] h-16 left-0 right-0 top-[31px] border-b border-neutral-200">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-[18px] font-medium text-[#1a1a1a]">주문 완료</h1>
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
      <div className="absolute left-0 right-0 top-[95px] bottom-0 flex items-center justify-center">
        <div className="text-center px-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-[24px] font-medium text-[#1a1a1a] mb-2">주문이 완료되었습니다!</h2>
          <p className="text-gray-500 mb-8">
            주문번호: {orderNumber}
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-[16px] font-medium text-[#1a1a1a] mb-4">배송 정보</h3>
            <div className="space-y-2 text-[14px] text-gray-600">
              <p><span className="font-medium">받는 분:</span> {customerInfo.fullName}</p>
              <p><span className="font-medium">주소:</span> {customerInfo.address}</p>
              <p><span className="font-medium">도시:</span> {customerInfo.city}, {customerInfo.state}</p>
              <p><span className="font-medium">우편번호:</span> {customerInfo.zipCode}</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[16px] text-gray-600">
              배송 준비가 완료되면 알림을 보내드립니다.
            </p>
            
            <button
              onClick={onShop}
              className="w-full bg-[#1a1a1a] text-white py-3 px-6 rounded-lg text-[16px] font-medium"
            >
              쇼핑 계속하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}