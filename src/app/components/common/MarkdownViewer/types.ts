import { HTMLAttributes } from 'react';

export interface MarkdownViewerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 마크다운 콘텐츠 (문자열)
   */
  content: string;
  
  /**
   * 추가 클래스명
   */
  className?: string;
} 