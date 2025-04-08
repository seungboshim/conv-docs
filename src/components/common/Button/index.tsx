"use client";

import React from 'react';
import { ButtonProps } from './types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      isLoading = false,
      disabled = false,
      isFullWidth = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyle = 'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50';
    
    const variantStyles = {
      default: 'bg-bg-light text-gray-dark hover:bg-gray-200 border border-gray-300',
      primary: 'bg-primary text-white hover:bg-primary/90',
      secondary: 'bg-gray-dark text-white hover:bg-gray-dark/90',
      outline: 'bg-transparent border border-primary text-primary hover:bg-primary/10',
      link: 'bg-transparent text-primary hover:underline p-0',
    };
    
    const sizeStyles = {
      sm: 'text-sm px-2 py-1',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    };
    
    const widthStyle = isFullWidth ? 'w-full' : '';
    const loadingStyle = isLoading ? 'opacity-70 cursor-not-allowed' : '';
    const disabledStyle = disabled ? 'opacity-60 cursor-not-allowed' : '';
    
    const buttonClass = `
      ${baseStyle}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${widthStyle}
      ${loadingStyle}
      ${disabledStyle}
      ${className}
    `.trim().replace(/\s+/g, ' ');
    
    return (
      <button
        ref={ref}
        className={buttonClass}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {children}
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button'; 