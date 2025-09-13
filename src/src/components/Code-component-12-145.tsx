import React, { useState } from 'react';
import StatusBar from './shared/StatusBar';
import { CustomerInfo } from '../types';

interface CheckoutPageProps {
  cartCount: number;
  customerInfo: CustomerInfo;
  onBack: () => void;
  onMenuClick: () => void;
  onProceedToPayment: (customerData: CustomerInfo) => void;
}

export default function CheckoutPage({
  cartCount,
  customerInfo,
  onBack,
  onMenuClick,
  onProceedToPayment
}: CheckoutPageProps) {
  const [formData, setFormData] = useState<CustomerInfo>(customerInfo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProceedToPayment(formData);
  };

  const handleChange = (field: keyof CustomerInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
          <h1 className="text-[18px] font-medium text-[#1a1a1a]">배송 정보</h1>
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="absolute left-0 right-0 top-[95px] bottom-24 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-[16px] font-medium text-[#1a1a1a] mb-2">이름</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#1a1a1a] focus:outline-none"
              placeholder="이름을 입력하세요"
              required
            />
          </div>

          <div>
            <label className="block text-[16px] font-medium text-[#1a1a1a] mb-2">주소</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#1a1a1a] focus:outline-none"
              placeholder="주소를 입력하세요"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[16px] font-medium text-[#1a1a1a] mb-2">도시</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#1a1a1a] focus:outline-none"
                placeholder="도시"
                required
              />
            </div>
            <div>
              <label className="block text-[16px] font-medium text-[#1a1a1a] mb-2">우편번호</label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleChange('zipCode', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#1a1a1a] focus:outline-none"
                placeholder="우편번호"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[16px] font-medium text-[#1a1a1a] mb-2">주/도</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#1a1a1a] focus:outline-none"
              placeholder="주/도를 입력하세요"
              required
            />
          </div>

          <div>
            <label className="block text-[16px] font-medium text-[#1a1a1a] mb-2">국가</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#1a1a1a] focus:outline-none"
              placeholder="국가"
              required
            />
          </div>
        </div>
      </form>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-6">
        <button
          onClick={handleSubmit}
          className="w-full bg-[#1a1a1a] text-white py-3 rounded-lg font-medium"
        >
          결제하기
        </button>
      </div>
    </div>
  );
}