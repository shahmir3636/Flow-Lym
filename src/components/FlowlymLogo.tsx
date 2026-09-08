import React from 'react';

interface FlowlymLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'mark-only' | 'full';
  theme?: 'dark' | 'light' | 'auto';
  showWordmark?: boolean;
}

export const FlowlymLogo: React.FC<FlowlymLogoProps> = ({
  className = '',
  size = 32,
  variant = 'full',
  theme = 'auto',
  showWordmark = true
}) => {
  const markSize = typeof size === 'number' ? size : size;
  const markClass = theme === 'dark' ? 'shrink-0 object-contain brightness-0 invert' : 'shrink-0 object-contain';

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/assets/flowlym-logo.png"
        alt="FLOWLYM"
        width={markSize}
        height={markSize}
        className={markClass}
      />
      {showWordmark && variant === 'full' && (
        <span className={`font-bold text-[15px] sm:text-base tracking-[-0.03em] ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
          FLOWLYM
        </span>
      )}
    </div>
  );
};
