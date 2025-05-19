import React from 'react';

interface MotionProps {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

// Simple motion component that adds basic animations
export const motion = {
  div: ({ 
    initial, 
    animate, 
    exit, 
    transition, 
    whileHover, 
    whileTap,
    children,
    className = '',
    style = {},
    onClick
  }: MotionProps) => {
    // Create a style object that includes transitions
    const animationStyle: React.CSSProperties = {
      ...style,
      transition: `transform ${transition?.duration || 0.3}s, opacity ${transition?.duration || 0.3}s`,
    };
    
    // Handle hover effect
    const [isHovered, setIsHovered] = React.useState(false);
    if (isHovered && whileHover) {
      if (whileHover.y) animationStyle.transform = `translateY(${whileHover.y}px)`;
      if (whileHover.scale) animationStyle.transform = `${animationStyle.transform || ''} scale(${whileHover.scale})`;
    }

    // Apply initial animation on mount
    React.useEffect(() => {
      if (initial && animate) {
        const el = document.getElementById(uniqueId);
        if (el) {
          // Set initial styles
          Object.entries(initial).forEach(([key, value]) => {
            if (key === 'opacity') el.style.opacity = String(value);
            if (key === 'y') el.style.transform = `translateY(${value}px)`;
          });

          // Apply animation after a small delay
          setTimeout(() => {
            Object.entries(animate).forEach(([key, value]) => {
              if (key === 'opacity') el.style.opacity = String(value);
              if (key === 'y') el.style.transform = `translateY(${value}px)`;
            });
          }, 10);
        }
      }
    }, []);

    // Generate a unique ID for the element
    const uniqueId = React.useMemo(() => `motion-${Math.random().toString(36).substr(2, 9)}`, []);

    return (
      <div 
        id={uniqueId}
        className={className}
        style={animationStyle}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
    );
  },
  h1: (props: MotionProps) => {
    return <h1 className={props.className} style={props.style} onClick={props.onClick}>{props.children}</h1>;
  },
  p: (props: MotionProps) => {
    return <p className={props.className} style={props.style} onClick={props.onClick}>{props.children}</p>;
  },
  button: (props: MotionProps) => {
    return <button className={props.className} style={props.style} onClick={props.onClick}>{props.children}</button>;
  },
  a: (props: MotionProps) => {
    return <a className={props.className} style={props.style} onClick={props.onClick}>{props.children}</a>;
  },
};