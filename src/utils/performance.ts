// Performance optimization utilities
export const performanceConfig = {
  // Reduce motion for users who prefer reduced motion
  respectReducedMotion: true,

  // Limit frame rate for animations
  maxFPS: 60,

  // Throttle scroll events
  scrollThrottle: 16, // ~60fps

  // Reduce particle counts on mobile
  isMobile:
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),

  // Performance monitoring
  enablePerformanceMonitoring: process.env.NODE_ENV === "development",
};

// Throttle function for scroll events
export const throttle = <T extends unknown[]>(
  func: (...args: T) => void,
  limit: number
) => {
  let inThrottle: boolean;
  return function (...args: T) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// RAF-based throttle for smoother animations
export const rafThrottle = <T extends unknown[]>(
  func: (...args: T) => void
) => {
  let ticking = false;
  return function (...args: T) {
    if (!ticking) {
      requestAnimationFrame(() => {
        func(...args);
        ticking = false;
      });
      ticking = true;
    }
  };
};

// Check for reduced motion preference
export const prefersReducedMotion = () => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Get optimal particle count based on device
export const getOptimalParticleCount = (base: number) => {
  if (performanceConfig.isMobile) return Math.floor(base * 0.5);
  if (window.devicePixelRatio > 2) return Math.floor(base * 0.7);
  return base;
};

// Performance monitoring
export const performanceMonitor = {
  startTime: 0,

  start() {
    this.startTime = performance.now();
  },

  end(label: string) {
    if (performanceConfig.enablePerformanceMonitoring) {
      const duration = performance.now() - this.startTime;
      console.log(`${label}: ${duration.toFixed(2)}ms`);
    }
  },
};
