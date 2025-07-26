import { useState, useCallback, useRef } from 'react';

interface PullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  resistance?: number;
}

export function usePullToRefresh({ onRefresh, threshold = 80, resistance = 2.5 }: PullToRefreshOptions) {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  
  const startY = useRef(0);
  const currentY = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY > 0) return;
    startY.current = e.touches[0].clientY;
    setIsPulling(true);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling || window.scrollY > 0) return;
    
    currentY.current = e.touches[0].clientY;
    const distance = currentY.current - startY.current;
    
    if (distance > 0) {
      e.preventDefault();
      const adjustedDistance = Math.min(distance / resistance, threshold * 1.5);
      setPullDistance(adjustedDistance);
    }
  }, [isPulling, resistance, threshold]);

  const onTouchEnd = useCallback(async () => {
    if (!isPulling) return;
    
    setIsPulling(false);
    
    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setTimeout(() => {
          setIsRefreshing(false);
          setPullDistance(0);
        }, 1000);
      }
    } else {
      setPullDistance(0);
    }
  }, [isPulling, pullDistance, threshold, onRefresh]);

  const resetPull = useCallback(() => {
    setIsPulling(false);
    setIsRefreshing(false);
    setPullDistance(0);
  }, []);

  return {
    isPulling,
    isRefreshing,
    pullDistance,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    resetPull,
    showIndicator: pullDistance > 0 || isRefreshing
  };
}
