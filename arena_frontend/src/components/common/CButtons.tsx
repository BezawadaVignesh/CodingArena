import { styled } from '@mui/material';
import React from 'react';

interface CartoonButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> ;
  className?: string;
  customStyles?: any;
}

const CButton = styled('button')(() => ({
    '&:hover': {
      filter: 'brightness(102%)',
    },
    '&:hover::before': {
      opacity: 0.1,
    },
    '&:active': {
      transform: 'translateY(2px)',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'white',
      opacity: 0,
      transition: 'opacity 0.15s ease',
      borderRadius: '12px',
    }
}))

function CartoonButton({ children, variant = 'primary', onClick, disabled = false, className = '', customStyles }: CartoonButtonProps) {
  const getVariantStyles = (variant: string) => {
    const variants: any = {
      primary: {
        background: disabled 
        ? 'linear-gradient(to bottom, #CBD5E1, #94A3B8)'
        : 'linear-gradient(rgb(84 146 223), rgb(31 82 194))',
        color: 'white',
        boxShadow: disabled
        ? 'none'
        : '0 4px 14px rgba(37, 99, 235, 0.3)',
      },
      secondary: {
        background: disabled
        ? 'linear-gradient(to bottom, #E2E8F0, #CBD5E1)'
        : 'linear-gradient(rgb(230 241 236), rgb(203 198 198))',
        color: '#374151',
        boxShadow: disabled
        ? 'none'
        : '0 4px 14px rgba(156, 163, 175, 0.3)',
      },
      success: {
        background: disabled
          ? 'linear-gradient(to bottom, #A7F3D0, #6EE7B7)':
          'linear-gradient(rgb(10 230 18), rgb(7 135 18))',
        color: 'white',
        boxShadow: disabled
        ? 'none'
        : '0 4px 14px rgba(5, 150, 105, 0.3)',
      },
      danger: {
        background: disabled
        ? 'linear-gradient(to bottom, #FCA5A5, #F87171)'
        : 'linear-gradient(to bottom, #F87171, #DC2626)',
        color: 'white',
        boxShadow: disabled
        ? 'none'
        : '0 4px 14px rgba(220, 38, 38, 0.3)',
      }
    };
    return variants[variant];
  };

  const baseStyles: React.CSSProperties = {
    position: 'relative',
    padding: '12px 24px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontFamily: "JETBRAINS MONO",
    transform: 'translateY(0)',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    overflow: 'hidden',
    userSelect: 'none',
    ...getVariantStyles(variant)
  };

  const hoverStyles: React.CSSProperties = {
    
  };

  const pseudoElementStyles: React.CSSProperties = {
    
  };

  const iconContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    position: 'relative',
  };

  return (
    <CButton
      onClick={onClick}
      disabled={disabled}
      style={{
        
        ...baseStyles,
        ...hoverStyles,
        ...pseudoElementStyles,
        ...customStyles,
      }}
      className={className}
      onMouseEnter={(e) => {
        const button = e.currentTarget;
        button.style.transform = 'scale(1.02) translateY(0px)';
      }}
      onMouseDown={(e) => {
        const button = e.currentTarget;
        button.style.transform = 'scale(0.95) translateY(2px)';
      }}
      onMouseUp={(e) => {
        const button = e.currentTarget;
        button.style.transform = 'scale(1) translateY(0px)';
      }}
      onMouseLeave={(e) => {
        const button = e.currentTarget;
        button.style.transform = 'scale(1) translateY(0)';
      }}
    >
      <span style={iconContainerStyles}>
        {/* {Icon && <Icon style={{ width: '20px', height: '20px' }} />} */}
        {children}
      </span>
    </CButton>
  );
}

export default CartoonButton;