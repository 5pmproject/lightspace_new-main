import React from 'react';
import StatusBar from './shared/StatusBar';
import svgPaths from "../imports/svg-s5y93igtx2";
import clsx from "clsx";
import { Input } from './ui/input';

interface Product {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  brand: string;
  images: string[];
  isFavorite: boolean;
  description: string;
  location: string;
  features: string[];
  room: string;
  style: string;
  // Technical specifications
  power: string;
  colorTemperature: string;
  lumens: string;
  installationMethod: string;
  voltage: string;
  energyRating: string;
  dimensions: string;
}

interface FilterOptions {
  room: string[];
  style: string[];
  priceRange: string | null;
}

type SortOption = 'default' | 'a-z' | 'price';

interface ProductListPageProps {
  products: Product[];
  favorites: Set<number>;
  searchTerm: string;
  sortOption: SortOption;
  filters: FilterOptions;
  cartCount: number;
  onSearchChange: (term: string) => void;
  onSortChange: (option: SortOption) => void;
  onFiltersChange: (filters: FilterOptions) => void;
  onToggleFavorite: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  onProductClick: (product: Product) => void;
  onMenuClick: () => void;
  onCartClick: () => void;
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
    <div className="absolute left-0 right-0 top-[400px] bottom-4 overflow-y-auto">
      <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start relative w-full px-6 py-3">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full py-12">
            <p className="text-[16px] text-gray-500 mb-2">조건에 맞는 조명이 없습니다</p>
            <p className="text-[14px] text-gray-400">다른 필터를 시도해보세요</p>
          </div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.has(product.id)}
              onToggleFavorite={() => onToggleFavorite(product.id)}
              onAddToCart={() => onAddToCart(product.id)}
              onClick={() => onProductClick(product)}
            />
          ))
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
    <div className="bg-[#ffffff] relative shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] shrink-0 w-full rounded-[12px]">
      <div className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative w-full">
        {/* Product Image */}
        <div
          className="bg-[#ffffff] relative self-stretch shrink-0 w-[93px] cursor-pointer rounded-l-[12px]"
          style={{
            backgroundImage: `url('${product.images[0]}')${product.images[1] ? `, url('${product.images[1]}')` : ''}`,
            backgroundSize: 'cover'
          }}
          onClick={onClick}
        >
          <div className="absolute border-[px_1px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
        </div>
        
        {/* Product Info */}
        <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0 cursor-pointer" onClick={onClick}>
          <div className="flex flex-col justify-center relative size-full">
            <div className="box-border content-stretch flex flex-col gap-1 items-start justify-center pl-4 pr-8 py-4 relative size-full">
              <div className="relative shrink-0 w-full">
                <div className="box-border content-stretch flex flex-col font-['Inter:Regular',_sans-serif] font-normal gap-2 items-start justify-start leading-[0] not-italic p-0 relative text-left w-full">
                  <div className="css-w9luqw flex flex-col justify-center relative shrink-0 text-[#000000] text-[0px] w-[173px]">
                    <p className="leading-[16px] text-[14px]">
                      {product.name}
                      <br />
                      <span className="text-[#1a1a1a] font-medium">{product.price}</span>
                    </p>
                  </div>
                  <div className="css-415rgs relative shrink-0 text-[#757575] text-[12px] text-nowrap">
                    <p className="block leading-[1.6] whitespace-pre text-[12px]">{product.brand} • {product.room}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute right-2 top-2 size-8"
        >
          <HeartIcon filled={isFavorite} />
        </button>
        
        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="absolute bg-[#1a1a1a] bottom-2 right-2 rounded-lg size-8 flex items-center justify-center"
        >
          <PlusIcon />
        </button>
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
  };

  const hasActiveFilters = filters.room.length > 0 || filters.style.length > 0 || filters.priceRange;

  return (
    <div className="absolute left-0 right-0 top-[201px] h-[119px] bg-[#ffffff] border-b border-neutral-200">
      <div className="px-6 py-4 h-full overflow-y-auto">
        <div className="flex flex-col gap-3">
          {/* Filter Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-medium text-[#1a1a1a]">필터</h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[12px] text-[#757575] underline"
              >
                전체 해제
              </button>
            )}
          </div>

          {/* Room Filter */}
          <div>
            <p className="text-[12px] text-[#757575] mb-2">공간별</p>
            <div className="flex flex-wrap gap-1">
              {roomOptions.map((room) => (
                <button
                  key={room}
                  onClick={() => toggleRoomFilter(room)}
                  className={clsx(
                    "px-2 py-1 rounded-full text-[10px] border transition-colors",
                    filters.room.includes(room)
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : "bg-white text-[#1a1a1a] border-[#e1e1e1]"
                  )}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>

          {/* Style Filter */}
          <div>
            <p className="text-[12px] text-[#757575] mb-2">스타일별</p>
            <div className="flex flex-wrap gap-1">
              {styleOptions.map((style) => (
                <button
                  key={style}
                  onClick={() => toggleStyleFilter(style)}
                  className={clsx(
                    "px-2 py-1 rounded-full text-[10px] border transition-colors",
                    filters.style.includes(style)
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : "bg-white text-[#1a1a1a] border-[#e1e1e1]"
                  )}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <p className="text-[12px] text-[#757575] mb-2">가격대별</p>
            <div className="flex flex-wrap gap-1">
              {priceRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setPriceFilter(range.value)}
                  className={clsx(
                    "px-2 py-1 rounded-full text-[10px] border transition-colors",
                    filters.priceRange === range.value
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : "bg-white text-[#1a1a1a] border-[#e1e1e1]"
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
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
    <div className="absolute left-0 right-0 top-[320px] h-[80px] bg-gradient-to-r from-purple-50 to-blue-50 border-b border-neutral-200">
      <div className="px-6 py-4 h-full flex items-center">
        <button
          onClick={onRoomAnalyzerClick}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg px-4 py-3 flex items-center justify-between shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">AI 공간 분석</p>
              <p className="text-xs opacity-90">사진으로 맞춤 조명 추천받기</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white/20 px-2 py-1 rounded text-xs">
              NEW
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}