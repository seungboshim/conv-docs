"use client";

import React from 'react';
import Link from 'next/link';
import { SidebarProps } from './types';

export const Sidebar: React.FC<SidebarProps> = ({
  rules,
  currentRuleId,
  title = '코딩 규칙 문서',
  isOpen = true,
  onToggle,
  className = '',
  ...props
}) => {
  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
      
      {/* 사이드바 */}
      <nav
        className={`
          fixed top-0 left-0 bottom-0 
          z-50 w-64 bg-white
          transform transition-transform duration-300 ease-in-out
          border-r border-gray-200
          overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:static lg:z-0
          ${className}
        `}
        {...props}
      >
        <div className="px-4 py-6">
          <h1 className="text-xl font-bold text-gray-dark mb-8">{title}</h1>
          
          <div className="space-y-1">
            <Link
              href="/"
              className={`
                block px-3 py-2 rounded-md text-base font-medium
                ${!currentRuleId ? 'bg-primary text-white' : 'text-gray-dark hover:bg-bg-light'}
              `}
            >
              홈
            </Link>
            
            <h2 className="text-xs font-semibold text-gray-light uppercase tracking-wider mt-6 mb-2 px-3">
              규칙 문서
            </h2>
            
            {rules.map((rule) => (
              <Link
                key={rule.id}
                href={`/rules/${rule.id}`}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium
                  ${currentRuleId === rule.id 
                    ? 'bg-primary text-white' 
                    : 'text-gray-dark hover:bg-bg-light'}
                `}
              >
                {rule.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

Sidebar.displayName = 'Sidebar'; 