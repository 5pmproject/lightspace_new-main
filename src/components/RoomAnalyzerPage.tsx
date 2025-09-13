import React, { useState, useRef } from "react";
import { ArrowLeft, Camera, Upload, Sparkles, Lightbulb, Home, Palette } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface RoomAnalyzerPageProps {
  cartCount: number;
  onBack: () => void;
  onMenuClick: () => void;
  onProductClick: (productId: number) => void;
  products: any[];
}

interface AnalysisResult {
  roomType: string;
  style: string;
  lighting: string;
  recommendations: number[];
  insights: string[];
}

export default function RoomAnalyzerPage({
  cartCount,
  onBack,
  onMenuClick,
  onProductClick,
  products,
}: RoomAnalyzerPageProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        // Reset analysis when new image is uploaded
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeRoom = async () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI analysis result - in real implementation, this would call an AI service
    const mockAnalysis: AnalysisResult = {
      roomType: "Living Room",
      style: "Modern Minimalist",
      lighting: "Ambient lighting needed",
      recommendations: [1, 3, 5], // Product IDs that match the analysis
      insights: [
        "넓은 공간으로 천장 조명과 포인트 조명 조합이 이상적입니다",
        "미니멀한 인테리어에 맞는 깔끔한 디자인의 조명을 추천합니다",
        "따뜻한 색온도(2700K-3000K)로 아늑한 분위기를 연출하세요",
        "높은 천장을 활용해 펜던트 조명으로 공간에 리듬감을 주세요"
      ]
    };
    
    setAnalysisResult(mockAnalysis);
    setIsAnalyzing(false);
  };

  const getRecommendedProducts = () => {
    if (!analysisResult) return [];
    return products.filter(product => 
      analysisResult.recommendations.includes(product.id)
    );
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium">AI 공간 분석</h1>
        <button onClick={onMenuClick} className="p-2">
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <div className="w-full h-0.5 bg-black"></div>
            <div className="w-full h-0.5 bg-black"></div>
            <div className="w-full h-0.5 bg-black"></div>
          </div>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Introduction Section */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center mb-3">
            <Sparkles className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-medium">AI가 분석하는 맞춤 조명</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            공간 사진을 업로드하면 AI가 방의 특성을 분석하여 
            가장 적합한 조명을 추천해드립니다.
          </p>
        </div>

        {/* Upload Section */}
        <div className="p-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {uploadedImage ? (
              <div className="space-y-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded room"
                  className="w-full h-48 object-cover rounded-lg mx-auto"
                />
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    다른 사진 선택
                  </button>
                  <button
                    onClick={analyzeRoom}
                    disabled={isAnalyzing}
                    className="flex items-center px-6 py-2 bg-black text-white rounded-lg text-sm disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        분석 중...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        AI 분석 시작
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <h3 className="font-medium mb-2">공간 사진을 업로드하세요</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    거실, 침실, 주방 등 조명을 설치할 공간의 사진을 올려주세요
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg mx-auto"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    사진 업로드
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="p-4 space-y-6">
            {/* Analysis Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-3 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                분석 결과
              </h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <Home className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                  <div className="font-medium">{analysisResult.roomType}</div>
                </div>
                <div className="text-center">
                  <Palette className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                  <div className="font-medium">{analysisResult.style}</div>
                </div>
                <div className="text-center">
                  <Lightbulb className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                  <div className="font-medium">{analysisResult.lighting}</div>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div>
              <h3 className="font-medium mb-3">💡 AI 조명 컨설팅</h3>
              <div className="space-y-2">
                {analysisResult.insights.map((insight, index) => (
                  <div key={index} className="flex items-start bg-blue-50 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Products */}
            <div>
              <h3 className="font-medium mb-3">✨ 맞춤 추천 조명</h3>
              <div className="space-y-3">
                {getRecommendedProducts().map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onProductClick(product.id)}
                    className="flex items-center bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <ImageWithFallback
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg mr-3"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{product.price}</span>
                        <div className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          <Sparkles className="w-3 h-3 mr-1" />
                          AI 추천
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 text-center">
              <h3 className="font-medium mb-2">더 정확한 추천을 원하시나요?</h3>
              <p className="text-sm text-gray-600 mb-3">
                다양한 각도의 사진과 방의 크기 정보를 추가로 제공해주시면
                더욱 정밀한 조명 컨설팅을 받을 수 있습니다.
              </p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium"
              >
                추가 사진 업로드
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}