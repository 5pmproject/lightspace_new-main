import React, { useState } from 'react';
import StatusBar from './shared/StatusBar';
import svgPaths from "../imports/svg-s5y93igtx2";
import clsx from "clsx";
import { Input } from './ui/input';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Product, 
  FilterOptions, 
  SortOption, 
  BasePageProps, 
  CartNavigationProps 
} from '../types';

interface ProductListPageProps extends BasePageProps, CartNavigationProps {
  products: Product[];
  favorites: Set<number>;
  searchTerm: string;
  sortOption: SortOption;
  filters: FilterOptions;
  onSearchChange: (term: string) => void;
  onSortChange: (option: SortOption) => void;
  onFiltersChange: (filters: FilterOptions) => void;
  onToggleFavorite: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  onProductClick: (product: Product) => void;
  onRoomAnalyzerClick?: () => void;
}

export default function ProductListPage({
  products,
  favorites,
  searchTerm,
  sortOption,
  filters,
  cartCount,
  onSearchChange,
  onSortChange,
  onFiltersChange,
  onToggleFavorite,
  onAddToCart,
  onProductClick,
  onMenuClick,
  onCartClick,
  onRoomAnalyzerClick
}: ProductListPageProps) {
  return (
    <div className="bg-[#ffffff] relative size-full">
      {/* Status Bar */}
      <StatusBar />
      
      {/* Header */}
      <Header 
        cartCount={cartCount}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        sortOption={sortOption}
        onSortChange={onSortChange}
        filters={filters}
        onFiltersChange={onFiltersChange}
        onMenuClick={onMenuClick}
        onCartClick={onCartClick}
      />
      
      {/* Filters */}
      <Filters 
        filters={filters}
        onFiltersChange={onFiltersChange}
        products={products}
      />
      
      {/* AI Room Analyzer Banner */}
      {onRoomAnalyzerClick && (
        <RoomAnalyzerBanner onRoomAnalyzerClick={onRoomAnalyzerClick} />
      )}
      
      {/* Content */}
      <Content 
        products={products}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onAddToCart={onAddToCart}
        onProductClick={onProductClick}
      />
    </div>
  );
}

interface HeaderProps {
  cartCount: number;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onMenuClick: () => void;
  onCartClick: () => void;
}

function Header({ cartCount, searchTerm, onSearchChange, sortOption, onSortChange, filters, onFiltersChange, onMenuClick, onCartClick }: HeaderProps) {
  return (
    <div className="absolute bg-[#ffffff] h-[201px] left-0 right-0 top-0">
      <div className="absolute border-[0px_0px_1px] border-neutral-200 border-solid inset-0 pointer-events-none shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]" />
      
      {/* Mobile Nav */}
      <div className="absolute bg-[#ffffff] h-16 left-0 overflow-clip right-0 top-[31px]">
        <div className="absolute bg-[#ffffff] h-[66px] left-0 top-0 w-[393px]" />
        <div
          className="absolute css-v5bt0j flex flex-col font-['Newsreader:Medium',_sans-serif] font-medium justify-center leading-[0] text-[#1a1a1a] text-[24px] text-center text-nowrap top-9 tracking-[-0.24px] translate-x-[-50%] translate-y-[-50%]"
          style={{ left: "calc(50% - 0.5px)" }}
        >
          <p className="adjustLetterSpacing block leading-none whitespace-pre text-[24px]">lightspace</p>
        </div>
        
        {/* Cart Icon */}
        <button 
          onClick={onCartClick}
          className="absolute right-5 rounded-2xl size-8 top-[18px] cursor-pointer"
        >
          <div className="size-8">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g>
                <path d={svgPaths.p2003cd00} fill="var(--fill-0, black)" />
              </g>
            </svg>
          </div>
          {cartCount > 0 && (
            <div className="absolute bg-[#1a1a1a] left-[17px] rounded-lg size-4 top-[-1px]">
              <div className="flex flex-col items-center justify-center relative size-full">
                <div className="box-border content-stretch flex flex-col gap-2 items-center justify-center px-0.5 py-px relative size-4">
                  <div className="css-78fix6 flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-center text-nowrap tracking-[-0.12px]">
                    <p className="adjustLetterSpacing block leading-none whitespace-pre">{cartCount}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </button>
        
        {/* Menu Icon */}
        <button 
          onClick={onMenuClick}
          className="absolute left-5 rounded-2xl size-8 top-[18px] flex items-center justify-center"
        >
          <div className="h-1.5 w-[18px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 8">
              <g>
                <line stroke="var(--stroke-0, black)" strokeWidth="1.5" x2="18" y1="1.25" y2="1.25" />
                <line stroke="var(--stroke-0, black)" strokeWidth="1.5" x2="18" y1="7.25" y2="7.25" />
              </g>
            </svg>
          </div>
        </button>
      </div>
      
      {/* Sub Nav */}
      <div className="absolute left-6 right-4 top-[103px]">
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative w-full">
          {/* Breadcrumb and Search */}
          <div className="relative shrink-0 w-full">
            <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative w-full">
              <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                <div className="box-border content-stretch flex flex-row font-['Newsreader:Regular',_sans-serif] font-normal gap-0.5 items-start justify-start leading-[0] p-0 relative text-[24px] text-left text-nowrap tracking-[-0.48px] w-full">
                  <div className="css-eomsl1 flex flex-col justify-center relative shrink-0 text-[#757575]">
                    <p className="adjustLetterSpacing block leading-[32px] text-nowrap whitespace-pre text-[24px]">모든 공간</p>
                  </div>
                  <div className="css-eomsl1 flex flex-col justify-center relative shrink-0 text-[#757575]">
                    <p className="adjustLetterSpacing block leading-[32px] text-nowrap whitespace-pre text-[24px]">/</p>
                  </div>
                  <div className="css-ip39ex flex flex-col justify-center relative shrink-0 text-[#000000]">
                    <p className="adjustLetterSpacing block leading-[32px] text-nowrap whitespace-pre text-[24px]">조명</p>
                  </div>
                </div>
              </div>
              <div className="size-8 relative shrink-0">
                <Input
                  placeholder="조명 검색..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="absolute right-0 top-0 w-8 h-8 p-0 border-0 bg-transparent text-transparent placeholder:text-transparent focus:w-[200px] focus:text-black focus:placeholder:text-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border focus:border-gray-200 focus:rounded-md focus:px-3"
                />
                <svg className="absolute inset-0 size-8 pointer-events-none" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g>
                    <path d={svgPaths.p14ffce80} fill="var(--fill-0, black)" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Sort Options */}
          <div className="relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative">
              <button
                onClick={() => onSortChange('default')}
                className={clsx(
                  "relative rounded-xl shrink-0",
                  sortOption === 'default' ? "bg-[#1a1a1a]" : "border border-[#e1e1e1] border-solid"
                )}
              >
                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-4 py-2 relative">
                  <div className={clsx(
                    "css-79j43w flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap tracking-[-0.14px]",
                    sortOption === 'default' ? "text-[#ffffff]" : "text-[#000000]"
                  )}>
                    <p className="adjustLetterSpacing block leading-[1.3] whitespace-pre">Featured</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => onSortChange('a-z')}
                className={clsx(
                  "relative rounded-xl shrink-0",
                  sortOption === 'a-z' ? "bg-[#1a1a1a]" : "border border-[#e1e1e1] border-solid"
                )}
              >
                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-4 py-2 relative">
                  <div className={clsx(
                    "css-k6fayy flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap tracking-[-0.14px]",
                    sortOption === 'a-z' ? "text-[#ffffff]" : "text-[#000000]"
                  )}>
                    <p className="adjustLetterSpacing block leading-[1.3] whitespace-pre">A-Z</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => onSortChange('price')}
                className={clsx(
                  "relative rounded-xl shrink-0",
                  sortOption === 'price' ? "bg-[#1a1a1a]" : "border border-[#e1e1e1] border-solid"
                )}
              >
                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-4 py-2 relative">
                  <div className={clsx(
                    "css-k6fayy flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap tracking-[-0.14px]",
                    sortOption === 'price' ? "text-[#ffffff]" : "text-[#000000]"
                  )}>
                    <p className="adjustLetterSpacing block leading-[1.3] whitespace-pre">₩ → ₩₩</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ContentProps {
  products: Product[];
  favorites: Set<number>;
  onToggleFavorite: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  onProductClick: (product: Product) => void;
}

function Content({ products, favorites, onToggleFavorite, onAddToCart, onProductClick }: ContentProps) {
  return (
    <div className="absolute left-0 right-0 top-[351px] bottom-4 overflow-y-auto">
      <div className="px-4 py-4">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">조건에 맞는 조명이 없습니다</h3>
            <p className="text-sm text-gray-500 text-center">다른 필터나 검색어를 시도해보세요</p>
          </div>
        ) : (
          <>
            {/* Product Count */}
            <div className="flex items-center justify-between mb-4 px-2">
              <p className="text-sm text-gray-600">
                총 <span className="font-semibold text-purple-600">{products.length}</span>개의 조명
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>💡 전문가 추천</span>
                <span>⚡ 빠른 배송</span>
              </div>
            </div>
            
            {/* Enhanced Product Grid */}
            <div className="grid grid-cols-1 gap-4">
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className="animate-in slide-in-from-bottom-4 duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard
                    product={product}
                    isFavorite={favorites.has(product.id)}
                    onToggleFavorite={() => onToggleFavorite(product.id)}
                    onAddToCart={() => onAddToCart(product.id)}
                    onClick={() => onProductClick(product)}
                  />
                </div>
              ))}
            </div>
            
            {/* Load More Hint */}
            {products.length > 5 && (
              <div className="text-center py-6">
                <p className="text-xs text-gray-400">더 많은 조명을 보려면 스크롤하세요 ↓</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAddToCart: () => void;
  onClick: () => void;
}

function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart, onClick }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden backdrop-blur-sm">
      <div className="flex flex-row p-4 gap-4 relative">
        {/* Enhanced Product Image */}
        <div className="relative w-20 h-20 flex-shrink-0" onClick={onClick}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          
          {/* Product Badge */}
          {product.style && (
            <div className="absolute -top-1 -left-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
              {product.style.split(' ')[0]}
            </div>
          )}
        </div>
        
        {/* Enhanced Product Info */}
        <div className="flex-1 flex flex-col justify-between py-1" onClick={onClick}>
          <div className="space-y-2">
            {/* Product Name */}
            <h3 className="font-semibold text-[15px] leading-[20px] text-gray-900 line-clamp-2 group-hover:text-purple-700 transition-colors">
              {product.name}
            </h3>
            
            {/* Brand and Room Info */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-[13px] leading-[16px] text-purple-600 font-semibold">{product.brand}</p>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {product.room}
                </span>
              </div>
              
              {/* Technical Specs */}
              <div className="flex items-center gap-2 text-[10px] text-gray-400">
                <span>💡 {product.power}</span>
                <span>🔆 {product.lumens}</span>
                <span>⚡ {product.energyRating}</span>
              </div>
            </div>
          </div>
          
          {/* Price */}
          <div className="mt-3 flex items-center justify-between">
            <p className="font-bold text-[16px] leading-[20px] text-gray-900">
              {product.price}
            </p>
            {product.priceValue < 70000 && (
              <span className="text-[8px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full font-bold">
                특가
              </span>
            )}
          </div>
        </div>
        
        {/* Premium Action Buttons */}
        <div className="flex flex-col items-end justify-between py-1">
          {/* Enhanced Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-110 hover:border-red-200 transition-all duration-200 shadow-sm group/heart"
          >
            <HeartIcon filled={isFavorite} />
          </button>
          
          {/* Enhanced Add to Cart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-lg group/btn"
          >
            <PlusIcon />
          </button>
          
          {/* Rating Display */}
          <div className="flex items-center gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-2 h-2 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <div className="size-8">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g>
          {filled ? (
            <>
              <path
                d={svgPaths.p297cea80}
                fill="var(--fill-0, #FF8577)"
                fillOpacity="0.98"
              />
              <path
                d={svgPaths.p3bfbe380}
                fill="var(--fill-0, #FF8577)"
                fillOpacity="0.98"
              />
            </>
          ) : (
            <>
              <path
                d={svgPaths.p1177b300}
                stroke="var(--stroke-0, black)"
              />
              <path
                d={svgPaths.p1d24580}
                fill="var(--fill-0, #FF8577)"
                fillOpacity="0.98"
              />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}

function PlusIcon() {
  return (
    <div className="size-8">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g>
          <path d={svgPaths.p367b3d00} fill="var(--fill-0, white)" />
        </g>
      </svg>
    </div>
  );
}

interface FiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  products: Product[];
}

function Filters({ filters, onFiltersChange, products }: FiltersProps) {
  const [showStyleFilters, setShowStyleFilters] = useState(false);
  const [showPriceFilters, setShowPriceFilters] = useState(false);

  // Get unique room and style options from products
  const roomOptions = [...new Set(products.map(p => p.room))].sort();
  const styleOptions = [...new Set(products.map(p => p.style))].sort();
  
  const priceRanges = [
    { value: "under-50k", label: "5만원 미만" },
    { value: "50k-100k", label: "5만원-10만원" },
    { value: "100k-200k", label: "10만원-20만원" },
    { value: "over-200k", label: "20만원 이상" },
  ];

  const toggleRoomFilter = (room: string) => {
    const newRooms = filters.room.includes(room)
      ? filters.room.filter(r => r !== room)
      : [...filters.room, room];
    onFiltersChange({ ...filters, room: newRooms });
  };

  const toggleStyleFilter = (style: string) => {
    const newStyles = filters.style.includes(style)
      ? filters.style.filter(s => s !== style)
      : [...filters.style, style];
    onFiltersChange({ ...filters, style: newStyles });
  };

  const setPriceFilter = (priceRange: string) => {
    const newPriceRange = filters.priceRange === priceRange ? null : priceRange;
    onFiltersChange({ ...filters, priceRange: newPriceRange });
  };

  const clearAllFilters = () => {
    onFiltersChange({ room: [], style: [], priceRange: null });
    setShowStyleFilters(false);
    setShowPriceFilters(false);
  };

  const hasActiveFilters = filters.room.length > 0 || filters.style.length > 0 || filters.priceRange;
  
  // 컴팩트한 높이 계산
  const baseHeight = 70; // 기본 헤더 + 공간별 필터
  const expandedHeight = showStyleFilters ? 35 : 0;
  const priceHeight = showPriceFilters ? 35 : 0;
  const totalHeight = Math.min(baseHeight + expandedHeight + priceHeight, 140);

  return (
    <div 
      className="absolute left-0 right-0 top-[201px] bg-[#ffffff] border-b border-neutral-200 transition-all duration-300"
      style={{ height: `${totalHeight}px` }}
    >
      <div className="px-6 py-2 h-full overflow-y-auto">
        <div className="flex flex-col gap-1.5">
          {/* Filter Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-medium text-[#1a1a1a]">필터</h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-[#757575] underline"
              >
                전체 해제
              </button>
            )}
          </div>

          {/* Room Filter - 항상 표시 */}
          <div>
            <p className="text-[11px] text-[#757575] mb-1">공간별</p>
            <div className="flex flex-wrap gap-1">
              {roomOptions.map((room) => (
                <button
                  key={room}
                  onClick={() => toggleRoomFilter(room)}
                  className={clsx(
                    "px-2 py-1 rounded-full text-[9px] border transition-colors",
                    filters.room.includes(room)
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : "bg-white text-[#1a1a1a] border-gray-200 hover:border-gray-400"
                  )}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>

          {/* Expandable Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowStyleFilters(!showStyleFilters)}
              className={clsx(
                "flex items-center gap-1 px-2 py-1 rounded-full text-[9px] border transition-colors",
                showStyleFilters || filters.style.length > 0
                  ? "bg-[#f5f5f5] border-gray-300"
                  : "bg-white border-gray-200 hover:border-gray-400"
              )}
            >
              <span>스타일별</span>
              {filters.style.length > 0 && (
                <span className="bg-[#1a1a1a] text-white text-[8px] px-1 rounded-full min-w-[14px] h-[14px] flex items-center justify-center">
                  {filters.style.length}
                </span>
              )}
              {showStyleFilters ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
            </button>
            
            <button
              onClick={() => setShowPriceFilters(!showPriceFilters)}
              className={clsx(
                "flex items-center gap-1 px-2 py-1 rounded-full text-[9px] border transition-colors",
                showPriceFilters || filters.priceRange
                  ? "bg-[#f5f5f5] border-gray-300"
                  : "bg-white border-gray-200 hover:border-gray-400"
              )}
            >
              <span>가격대별</span>
              {filters.priceRange && (
                <span className="bg-[#1a1a1a] text-white text-[8px] px-1 rounded-full min-w-[14px] h-[14px] flex items-center justify-center">
                  1
                </span>
              )}
              {showPriceFilters ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
            </button>
          </div>

          {/* Style Filter - 조건부 표시 */}
          {showStyleFilters && (
            <div className="animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-wrap gap-1">
                {styleOptions.map((style) => (
                  <button
                    key={style}
                    onClick={() => toggleStyleFilter(style)}
                    className={clsx(
                      "px-2 py-1 rounded-full text-[9px] border transition-colors",
                      filters.style.includes(style)
                        ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                        : "bg-white text-[#1a1a1a] border-gray-200 hover:border-gray-400"
                    )}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Filter - 조건부 표시 */}
          {showPriceFilters && (
            <div className="animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-wrap gap-1">
                {priceRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setPriceFilter(range.value)}
                    className={clsx(
                      "px-2 py-1 rounded-full text-[9px] border transition-colors",
                      filters.priceRange === range.value
                        ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                        : "bg-white text-[#1a1a1a] border-gray-200 hover:border-gray-400"
                    )}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface RoomAnalyzerBannerProps {
  onRoomAnalyzerClick: () => void;
}

function RoomAnalyzerBanner({ onRoomAnalyzerClick }: RoomAnalyzerBannerProps) {
  return (
    <div className="absolute left-0 right-0 top-[281px] h-[70px] bg-gradient-to-r from-purple-50 to-blue-50 border-b border-neutral-200">
      <div className="px-6 py-2 h-full flex items-center">
        <button
          onClick={onRoomAnalyzerClick}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg px-3 py-2 flex items-center justify-between shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs font-medium">AI 공간 분석</p>
              <p className="text-[10px] opacity-90">사진으로 맞춤 조명 추천받기</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white/20 px-1.5 py-0.5 rounded text-[9px]">
              NEW
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}