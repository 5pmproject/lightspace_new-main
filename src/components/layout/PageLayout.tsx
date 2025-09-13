import React from 'react';
import StatusBar from '../shared/StatusBar';
import { BasePageProps } from '../../types';

interface PageLayoutProps extends BasePageProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({ 
  children, 
  cartCount, 
  onMenuClick, 
  className = "" 
}: PageLayoutProps) {
  return (
    <div className={`bg-[#ffffff] relative size-full ${className}`}>
      <StatusBar />
      {children}
    </div>
  );
}
