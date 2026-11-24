import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * MobileContainer
 * Mobile-first container that fills the entire mobile viewport edge-to-edge
 * across all mobile devices (360px - 430px+), and centers on desktop screens.
 */
export const MobileContainer: React.FC<MobileContainerProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className="min-h-[100dvh] w-full bg-cream-soft/60 flex justify-center items-start py-0 sm:py-6 sm:px-4">
      <main 
        className={`w-full max-w-full sm:max-w-[430px] min-h-[100dvh] bg-ivory text-brown relative overflow-hidden transition-all duration-300 ${className}`}
      >
        {children}
      </main>
    </div>
  );
};

export default MobileContainer;
