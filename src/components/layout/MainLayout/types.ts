import type { Rule } from '@/types/rule';
import type { HTMLAttributes, ReactNode } from 'react';

export interface MainLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 레이아웃 내부 콘텐츠
   */
  children: ReactNode;

  /**
   * 규칙 목록
   */
  rules: Rule[];

  /**
   * 현재 선택된 규칙 ID
   */
  currentRuleId?: string;
}
