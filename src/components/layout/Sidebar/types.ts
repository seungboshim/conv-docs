import { HTMLAttributes } from 'react';
import { Rule } from '@/types/rule';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /**
   * 규칙 목록
   */
  rules: Rule[];

  /**
   * 현재 선택된 규칙 ID
   */
  currentRuleId?: string;

  /**
   * 사이드바 제목
   */
  title?: string;

  /**
   * 모바일 환경에서 열린 상태 여부
   */
  isOpen?: boolean;

  /**
   * 모바일 환경에서 사이드바 토글 이벤트 핸들러
   */
  onToggle?: () => void;
}
