import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 종류를 지정합니다.
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'link';
  
  /**
   * 버튼 크기를 지정합니다.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * 로딩 상태 여부
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * 비활성화 상태 여부
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 너비를 꽉 채울지 여부
   * @default false
   */
  isFullWidth?: boolean;
} 