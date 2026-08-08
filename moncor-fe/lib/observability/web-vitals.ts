export function reportWebVitals(metric: any) {
  // Console logger for demo/staging observability.
  // In production, this would send metrics to an analytics endpoint (e.g., Datadog or Vercel Analytics).
  
  const body = JSON.stringify(metric);
  
  if (process.env.NODE_ENV === 'production') {
    // navigator.sendBeacon('/api/observability/vitals', body);
  } else {
    // Local debugging representation
    const { name, value, rating } = metric;
    console.log(`[Observability] ${name}: ${Math.round(value)}ms (${rating})`);
  }
}
