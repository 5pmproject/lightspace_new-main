import React from 'react';

// SVG 경로 imports
import svgPaths from "../../imports/svg-s5y93igtx2";
import svgPaths2 from "../../imports/svg-42raqsyfh4";
import svgPaths3 from "../../imports/svg-ved004mhkj";
import svgPaths4 from "../../imports/svg-toln6of0ig";
import svgPaths5 from "../../imports/svg-v7ovcq1vez";
import svgPaths6 from "../../imports/svg-x4vilrsbuo";

interface IconProps {
  className?: string;
  size?: number;
}

// 공통 아이콘 컴포넌트들
export function BackIcon({ className, size = 24 }: IconProps) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
    >
      <path d={svgPaths2} />
    </svg>
  );
}

export function MenuIcon({ className, size = 24 }: IconProps) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
    >
      <path d={svgPaths} />
    </svg>
  );
}

export function CartIcon({ className, size = 24 }: IconProps) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
    >
      <path d={svgPaths3} />
    </svg>
  );
}

export function CheckIcon({ className, size = 24 }: IconProps) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
    >
      <path d={svgPaths4} />
    </svg>
  );
}

export function HeartIcon({ className, size = 24 }: IconProps) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
    >
      <path d={svgPaths5} />
    </svg>
  );
}

export function SearchIcon({ className, size = 24 }: IconProps) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
    >
      <path d={svgPaths6} />
    </svg>
  );
}
