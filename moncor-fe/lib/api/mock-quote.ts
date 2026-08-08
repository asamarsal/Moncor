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
  rawQuote?: string;
  signature?: string;
}

export const fetchMockQuote = async (mode: string, horizon: string | number, amount: string): Promise<QuoteResponse> => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/quotes?mode=${mode}&horizon=${horizon}&amount=${amount}`);
    if (!res.ok) {
      throw new Error("Failed to fetch quote from backend");
    }
    return await res.json();
  } catch (err) {
    console.error("Backend fetch failed", err);
    throw err;
  }
};
