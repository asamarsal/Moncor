export interface QuoteResponse {
  quoteId: string;
  wagerAmount: string; // minor units as string
  maxPayout: string;
  fee: string;
  issuedAt: number;
  expiresAt: number;
  startAt: number;
  settlementAt: number;
  payoutLadder?: Array<{ place: string, multiplier: number }>;
}

export const fetchMockQuote = async (mode: string, horizon: string | number, amount: string): Promise<QuoteResponse> => {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 800));

  const now = Math.floor(Date.now() / 1000);
  const horizonSeconds = typeof horizon === 'string' 
    ? parseInt(horizon.replace('PT', '').replace('M', '')) * 60 
    : horizon;

  return {
    quoteId: `mock-quote-${Math.random().toString(36).slice(2, 9)}`,
    wagerAmount: (parseFloat(amount) * 1e18).toString(),
    maxPayout: mode === 'fixed' ? (parseFloat(amount) * 10 * 1e18).toString() : (parseFloat(amount) * 5 * 1e18).toString(),
    fee: "0",
    issuedAt: now,
    expiresAt: now + 30, // 30 seconds to lock
    startAt: now + 5, // starts in 5s
    settlementAt: now + 5 + horizonSeconds,
    payoutLadder: mode === 'fixed' ? [
      { place: '1st', multiplier: 10.0 },
      { place: '2nd', multiplier: 4.0 },
      { place: '3rd', multiplier: 2.0 },
      { place: '4th - 10th', multiplier: 1.2 }
    ] : undefined
  };
};
