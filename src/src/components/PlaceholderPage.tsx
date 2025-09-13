import React from 'react';
import StatusBar from './shared/StatusBar';

interface PlaceholderPageProps {
  title: string;
  cartCount: number;
  onBack: () => void;
  onMenuClick: () => void;
}

export default function PlaceholderPage({ title, cartCount, onBack, onMenuClick }: PlaceholderPageProps) {
  return (
    <div className="bg-[#ffffff] relative size-full">
      {/* Status Bar */}
      <StatusBar />

      {/* Header */}
      <div className="absolute bg-[#ffffff] h-16 left-0 right-0 top-[31px] border-b border-neutral-200">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute left-5 top-[18px] w-8 h-8 flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Title */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-[18px] font-medium text-[#1a1a1a]">{title}</h1>
        </div>

        {/* Menu Button */}
        <button 
          onClick={onMenuClick}
          className="absolute right-5 top-[18px] w-8 h-8 flex items-center justify-center"
        >
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
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">🚧</span>
          </div>
          <h2 className="text-[20px] font-medium text-[#1a1a1a] mb-2">{title}</h2>
          <p className="text-[16px] text-gray-500 mb-6">
            이 페이지는 현재 개발 중입니다.
          </p>
          <button
            onClick={onBack}
            className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg text-[16px] font-medium"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}