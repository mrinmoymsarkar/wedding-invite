import { useLanguage } from '../contexts/LanguageContext';
import { getEventsForLanguage, EVENTS_CONFIG } from '../config/events-config';

// Hook for components that need language-aware events
export function useWeddingEvents() {
  const { language } = useLanguage();
  return getEventsForLanguage(language);
}

// Static English export for non-React contexts (PDF generation etc.)
export const weddingEvents = EVENTS_CONFIG;
