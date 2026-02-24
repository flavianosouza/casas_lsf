declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

function trackEvent(eventName: string, parameters?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;
  if (!window.gtag) return;
  window.gtag('event', eventName, {
    ...parameters,
    send_to: 'G-9HVPSLW5W5',
  });
}

export function trackWhatsAppClick(source: string) {
  trackEvent('whatsapp_click', { event_category: 'conversao', event_label: source, value: 1 });
}

export function trackGerarEstudo(tipologia: string, area: string) {
  trackEvent('gerar_estudo_submit', { event_category: 'conversao', tipologia, area, value: 5 });
}

export function trackExitIntentShown() {
  trackEvent('exit_intent_shown', { event_category: 'engajamento', event_label: 'modal' });
}

export function trackExitIntentConvert() {
  trackEvent('exit_intent_convert', { event_category: 'conversao', value: 3 });
}

export function trackEngagedReader(slug: string) {
  trackEvent('engaged_reader', { event_category: 'engajamento', event_label: slug, value: 2 });
}

export function trackDeepScroll(slug: string) {
  trackEvent('deep_scroll', { event_category: 'engajamento', event_label: slug });
}
