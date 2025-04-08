"use client";

import React, { useState } from 'react';
import { Sidebar } from '../Sidebar';
import { MainLayoutProps } from './types';

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  rules,
  currentRuleId,
  className = '',
  ...props
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  
  return (
    <div className="flex min-h-screen bg-white" {...props}>
      {/* 사이드바 */}
      <Sidebar 
        rules={rules} 
        currentRuleId={currentRuleId} 
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />
      
      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 overflow-auto">
        {/* 모바일 헤더 */}
        <div className="sticky top-0 z-30 flex h-14 items-center bg-white border-b border-gray-200 px-4 lg:hidden">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600 focus:outline-none"
            onClick={toggleSidebar}
            aria-label="메뉴 열기"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="ml-4 text-lg font-medium text-gray-dark">코딩 규칙 문서</h1>
        </div>
        
        {/* 실제 콘텐츠 */}
        <div className={`p-6 lg:px-8 lg:py-10 ${className}`}>
          {children}
        </div>
      </main>
    </div>
  );
};

MainLayout.displayName = 'MainLayout'; 