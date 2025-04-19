import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevated?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  elevated = false,
  onClick,
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };
  
  const elevationStyles = elevated 
    ? 'shadow-lg hover:shadow-xl transition-shadow duration-300' 
    : 'shadow hover:shadow-md transition-shadow duration-300';
  
  return (
    <div 
      className={`
        bg-white rounded-lg ${paddingStyles[padding]} ${elevationStyles} ${className}
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};