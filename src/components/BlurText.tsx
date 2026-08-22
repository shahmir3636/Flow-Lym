import React, { useEffect, useMemo, useState } from 'react';

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  onAnimationComplete?: () => void;
  className?: string;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 150,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className = '',
}) => {
  const [started, setStarted] = useState(false);
  const items = useMemo(() => animateBy === 'words' ? text.split(/(\s+)/) : Array.from(text), [text, animateBy]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setStarted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!started || !onAnimationComplete) return;
    const visualItems = items.filter((item) => item.trim().length > 0);
    const duration = Math.max(0, (visualItems.length - 1) * delay) + 720;
    const timer = window.setTimeout(onAnimationComplete, duration);
    return () => window.clearTimeout(timer);
  }, [started, items, delay, onAnimationComplete]);

  const offset = {
    top: 'translate3d(0,-22px,0)',
    bottom: 'translate3d(0,22px,0)',
    left: 'translate3d(-22px,0,0)',
    right: 'translate3d(22px,0,0)',
  }[direction];

  return (
    <span className={`blur-text ${className}`} aria-label={text}>
      {items.map((item, index) => {
        const isWhitespace = /^\s+$/.test(item);
        if (isWhitespace) return <React.Fragment key={`space-${index}`}>{item}</React.Fragment>;
        const visualIndex = items.slice(0, index).filter((part) => part.trim().length > 0).length;
        return (
          <span
            key={`${item}-${index}`}
            className="blur-text__item"
            style={{
              '--blur-delay': `${visualIndex * delay}ms`,
              '--blur-offset': offset,
              animationPlayState: started ? 'running' : 'paused',
            } as React.CSSProperties}
          >
            {item}
          </span>
        );
      })}
    </span>
  );
};

export default BlurText;
