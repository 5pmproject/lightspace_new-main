import React, { useState } from 'react';
import StatusBar from './shared/StatusBar';
import { Product } from '../types';

interface ProductDetailPageProps {
  product: Product;
  cartCount: number;
  onBack: () => void;
  onAddToCart: (quantity: number) => void;
  onMenuClick: () => void;
  onCartClick: () => void;
}

export default function ProductDetailPage({
  product,
  cartCount,
  onBack,
  onAddToCart,
  onMenuClick,
  onCartClick
}: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = () => {
    onAddToCart(quantity);
  };

  return (
    <div className="bg-[#ffffff] relative size-full">
      {/* Status Bar */}
      <StatusBar />

      {/* Header */}
      <div className="absolute bg-[#ffffff] h-16 left-0 right-0 top-[31px] border-b border-neutral-200 z-10">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute left-5 top-[18px] w-8 h-8 flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Cart Button */}
        <button 
          onClick={onCartClick}
          className="absolute right-5 top-[18px] w-8 h-8 flex items-center justify-center"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5A1.5 1.5 0 1 0 9 22.5A1.5 1.5 0 0 0 9 19.5ZM20 19.5A1.5 1.5 0 1 0 20 22.5A1.5 1.5 0 0 0 20 19.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {cartCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-[#1a1a1a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </div>
          )}
        </button>

        {/* Menu Button */}
        <button 
          onClick={onMenuClick}
          className="absolute right-16 top-[18px] w-8 h-8 flex items-center justify-center"
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

      {/* Product Image */}
      <div className="absolute left-0 right-0 top-[95px] h-[300px]">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${product.images[currentImageIndex]}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>

      {/* Product Info */}
      <div className="absolute left-0 right-0 top-[395px] bottom-0 bg-white rounded-t-3xl">
        <div className="p-6 h-full overflow-y-auto">
          {/* Product Title & Price */}
          <div className="mb-6">
            <h1 className="text-[24px] font-medium text-[#1a1a1a] mb-2">{product.name}</h1>
            <div className="flex items-center justify-between">
              <span className="text-[20px] font-medium text-[#1a1a1a]">{product.price}</span>
              <span className="text-[14px] text-gray-500">{product.brand}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-[16px] text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-[18px] font-medium text-[#1a1a1a] mb-3">주요 특징</h3>
            <div className="flex flex-wrap gap-2">
              {product.features.map((feature, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-[14px]"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-8">
            <h3 className="text-[18px] font-medium text-[#1a1a1a] mb-3">제품 사양</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">소비전력</span>
                <span className="text-[#1a1a1a]">{product.power}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">색온도</span>
                <span className="text-[#1a1a1a]">{product.colorTemperature}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">광속</span>
                <span className="text-[#1a1a1a]">{product.lumens}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">크기</span>
                <span className="text-[#1a1a1a]">{product.dimensions}</span>
              </div>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-20">
            <div className="max-w-[393px] mx-auto flex items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50"
                >
                  <span className="text-[18px]">−</span>
                </button>
                <span className="px-4 py-3 border-x text-[16px] font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50"
                >
                  <span className="text-[18px]">+</span>
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#1a1a1a] text-white py-3 px-6 rounded-lg text-[16px] font-medium"
              >
                장바구니에 담기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}