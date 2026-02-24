'use client';

import { useEffect, useRef } from 'react';
import { trackEngagedReader, trackDeepScroll } from '@/lib/analytics';

export default function ArticleTracker({ slug }: { slug: string }) {
  const engagedRef = useRef(false);
  const scrollRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!engagedRef.current) {
        engagedRef.current = true;
        trackEngagedReader(slug);
      }
    }, 120000); // 2 minutos

    const handleScroll = () => {
      if (scrollRef.current) return;
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (pct >= 75) {
        scrollRef.current = true;
        trackDeepScroll(slug);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [slug]);

  return null;
}
