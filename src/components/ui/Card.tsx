import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`glass card-hover rounded-xl p-6 animate-fadeIn ${className}`}>
      {children}
    </div>
  );
}