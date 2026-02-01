import React from 'react';
import '../../styles/components.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'icon';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const variantClass = `btn-${variant}`;
  return (
    <button className={`btn ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
