'use client';

import React, { MouseEvent } from 'react';
import Link from 'next/link';
import { SidebarProps } from './types';
import { frontendRuleIds, backendRuleIds } from '@/utils/constants/rule';

export const Sidebar: React.FC<SidebarProps> = ({
  rules,
  currentRuleId,
  title = 'Document Heading',
  isOpen,
  onToggle,
  className,
  ...props
}) => {
  // 규칙을 프론트엔드와 백엔드로 필터링
  const frontendRules = rules.filter(rule => frontendRuleIds.includes(rule.id));
  const backendRules = rules.filter(rule => backendRuleIds.includes(rule.id));

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onToggle) onToggle();
  };

  return (
    <div className={`sidebar-wrapper ${className || ''}`} {...props}>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={handleClose}
            aria-hidden="true"
          />
        </>
      )}

      {/* 사이드바 */}
      <div
        className={`
          fixed z-50 inset-y-0 left-0 w-72 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="overflow-y-auto h-full py-5 px-4">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="text-xl font-bold text-primary">
              {title}
            </Link>
          </div>

          {/* 규칙 목록 */}
          {rules && rules.length > 0 && (
            <>
              <div className="mt-5">
                <h3 className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                  FRONTEND
                </h3>
                <div className="mt-2 -mx-3">
                  {frontendRules.map(rule => {
                    const isActive = rule.id === currentRuleId;
                    return (
                      <Link
                        key={rule.id}
                        href={`/rules/${rule.id}`}
                        className={`px-3 py-2 transition-colors duration-200 relative block ${
                          isActive ? 'text-primary' : 'hover:text-slate-900'
                        }`}
                      >
                        <span>{rule.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                  BACKEND
                </h3>
                <div className="mt-2 -mx-3">
                  {backendRules.map(rule => {
                    const isActive = rule.id === currentRuleId;
                    return (
                      <Link
                        key={rule.id}
                        href={`/rules/${rule.id}`}
                        className={`px-3 py-2 transition-colors duration-200 relative block ${
                          isActive ? 'text-primary' : 'hover:text-slate-900'
                        }`}
                      >
                        <span>{rule.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
