import { useState, useEffect } from 'react';

interface ScrollTriggerOptions {
  threshold?: number;
  disableHysteresis?: boolean;
  target?: Window | HTMLElement;
}

export function useScrollTrigger(options: ScrollTriggerOptions = {}) {
  const { threshold = 100, disableHysteresis = false, target } = options;
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const scrollTarget = target || window;
    
    const handleScroll = () => {
      const currentScroll = 
        target instanceof HTMLElement 
          ? target.scrollTop 
          : scrollTarget.scrollY;

      if (!disableHysteresis && triggered) {
        if (currentScroll < threshold) {
          setTriggered(false);
        }
      } else {
        if (currentScroll > threshold) {
          setTriggered(true);
        } else {
          setTriggered(false);
        }
      }
    };

    scrollTarget.addEventListener('scroll', handleScroll);
    return () => scrollTarget.removeEventListener('scroll', handleScroll);
  }, [target, threshold, disableHysteresis, triggered]);

  return triggered;
}