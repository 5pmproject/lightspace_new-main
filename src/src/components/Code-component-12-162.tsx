import React, { useState } from 'react';
import StatusBar from './shared/StatusBar';
import { Product } from '../types';

interface RoomAnalyzerPageProps {
  cartCount: number;
  onBack: () => void;
  onMenuClick: () => void;
  onProductClick: (product: Product) => void;
  products: Product[];
}

export default function RoomAnalyzerPage({
  cartCount,
  onBack,
  onMenuClick,
  onProductClick,
  products
}: RoomAnalyzerPageProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        analyzeRoom();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeRoom = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      // Get random 3 products as recommendations
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setRecommendations(shuffled.slice(0, 3));
      setIsAnalyzing(false);
    }, 2000);
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
          <h1 className="text-[18px] font-medium text-[#1a1a1a]">AI 공간 분석</h1>
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
      <div className="absolute left-0 right-0 top-[95px] bottom-0 overflow-y-auto">
        <div className="p-6">
          {!uploadedImage ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h2 className="text-[20px] font-medium text-[#1a1a1a] mb-2">AI 공간 분석</h2>
              <p className="text-gray-500 mb-8">
                공간 사진을 업로드하면 AI가 분석하여<br/>
                맞춤형 조명을 추천해드립니다
              </p>
              
              <label className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg cursor-pointer font-medium">
                사진 업로드하기
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              
              <div className="mt-8 text-left bg-gray-50 rounded-lg p-6">
                <h3 className="text-[16px] font-medium text-[#1a1a1a] mb-3">💡 분석 팁</h3>
                <ul className="text-[14px] text-gray-600 space-y-2">
                  <li>• 조명을 설치할 공간 전체가 보이도록 촬영하세요</li>
                  <li>• 자연광이 있는 낮 시간대에 촬영하면 더 정확해요</li>
                  <li>• 가구와 인테리어가 잘 보이는 각도로 촬영하세요</li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              {/* Uploaded Image */}
              <div className="mb-6">
                <h3 className="text-[16px] font-medium text-[#1a1a1a] mb-3">업로드된 공간</h3>
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded room"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        <p>AI가 공간을 분석중...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h3 className="text-[16px] font-medium text-[#1a1a1a]">AI 추천 조명</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {recommendations.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => onProductClick(product)}
                        className="border rounded-lg p-4 cursor-pointer hover:border-purple-300 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div 
                            className="w-16 h-16 bg-gray-200 rounded bg-cover bg-center"
                            style={{ backgroundImage: `url('${product.images[0]}')` }}
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-[#1a1a1a]">{product.name}</h4>
                            <p className="text-gray-500 text-sm">{product.brand}</p>
                            <p className="text-[#1a1a1a] font-medium">{product.price}</p>
                          </div>
                          <div className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                            추천
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setRecommendations([]);
                    }}
                    className="w-full mt-6 border border-gray-300 text-gray-600 py-3 rounded-lg"
                  >
                    다른 공간 분석하기
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}