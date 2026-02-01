import { useEffect, useRef } from 'react';

import { createPortal } from 'react-dom';

interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string; // For overriding specific styles if needed
}

export const ModalBase = ({ isOpen, onClose, children, className = '' }: ModalBaseProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Esc key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEsc);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Click outside handler
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#051610]/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={handleOverlayClick}
      ref={overlayRef}
      style={{ 
        position: 'fixed',
        top: 0, 
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(5, 22, 16, 0.8)',
        backdropFilter: 'blur(4px)',
        padding: '24px',
        overflowY: 'auto',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div 
        className={className}
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        {children}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>,
    document.body
  );
};
