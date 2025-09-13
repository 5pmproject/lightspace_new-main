import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
}

export default function Menu({ isOpen, onClose, onNavigate }: MenuProps) {
  const handleNavigation = (screen: string) => {
    onNavigate(screen);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 400,
              mass: 0.8
            }}
            className="absolute left-0 top-0 bottom-0 w-[280px] bg-[#426b1f] z-50 overflow-hidden"
          >
            {/* Background Illustration */}
            <MaskGroup />
            
            {/* Menu Items */}
            <MenuItems onNavigate={handleNavigation} />
            
            {/* Close Button */}
            <CloseButton onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MaskGroup() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Simple decorative background */}
      <div className="absolute right-0 top-0 opacity-10">
        <svg width="200" height="300" viewBox="0 0 200 300" fill="none">
          <circle cx="150" cy="50" r="30" fill="rgba(255,255,255,0.2)" />
          <circle cx="180" cy="120" r="20" fill="rgba(255,255,255,0.15)" />
          <circle cx="160" cy="200" r="25" fill="rgba(255,255,255,0.1)" />
          <path d="M120 80 Q160 120 140 160 Q120 200 100 160 Q80 120 120 80Z" fill="rgba(255,255,255,0.05)" />
        </svg>
      </div>
    </div>
  );
}

function MenuItems({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const menuItems = [
    { id: 'list', label: '홈', icon: '🏠' },
    { id: 'roomAnalyzer', label: 'AI 공간 분석', icon: '🤖' },
    { id: 'newsstand', label: '뉴스', icon: '📰' },
    { id: 'about', label: '회사 소개', icon: '🏢' },
    { id: 'profile', label: '내 프로필', icon: '👤' },
  ];

  return (
    <div className="px-6 py-20">
      {/* Logo/Title */}
      <div className="mb-12">
        <h2 className="text-white text-[28px] font-['Newsreader:Medium',_sans-serif] font-medium tracking-[-0.28px]">
          lightspace
        </h2>
        <p className="text-white/70 text-[14px] mt-2">
          조명으로 공간을 완성하세요
        </p>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="w-full text-left px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center space-x-3"
          >
            <span className="text-[20px]">{item.icon}</span>
            <span className="text-[16px] font-['Inter:Regular',_sans-serif]">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="absolute top-6 left-6 w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}