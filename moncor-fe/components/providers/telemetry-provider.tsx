'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { reportWebVitals } from '@/lib/observability/web-vitals';

export function TelemetryProvider({ children }: { children: React.ReactNode }) {
  useReportWebVitals((metric) => {
    reportWebVitals(metric);
  });

  return <>{children}</>;
}
