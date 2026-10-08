/**
 * Meta (Facebook) Pixel Event Tracking Utility
 * Pixel ID: 2301665553904251
 */

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export const trackPixelEvent = (
  eventName: string,
  params: Record<string, any> = {},
  isCustom = false
) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (isCustom) {
      window.fbq('trackCustom', eventName, params);
    } else {
      window.fbq('track', eventName, params);
    }
  }
  // Debug log in development/console
  console.log(`[Meta Pixel Event] ${isCustom ? 'trackCustom' : 'track'}: ${eventName}`, params);
};
