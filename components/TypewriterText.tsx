import React, { useEffect, useState, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 15, onComplete, className = "" }) => {
  const [displayedText, setDisplayedText] = useState('');
  const onCompleteRef = useRef(onComplete);

  // Keep ref updated to avoid restarting effect when onComplete function identity changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    
    const timer = setInterval(() => {
      // Use substring logic which is more robust than appending to previous state
      if (i < text.length) {
        i++;
        setDisplayedText(text.substring(0, i));
      } else {
        clearInterval(timer);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <div className={className}>
      {displayedText}
    </div>
  );
};