type Listener = (price: number) => void;

class MockMarketDataService {
  private price = 0.15637;
  private listeners: Set<Listener> = new Set();
  private timer: ReturnType<typeof setInterval> | null = null;

  private clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

  start() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.price = this.clamp(this.price + (Math.random() - 0.48) * 0.00011, 0.15012, 0.15982);
      this.listeners.forEach((l) => l(this.price));
    }, 1400);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    listener(this.price); // send initial
    return () => this.listeners.delete(listener);
  }

  getCurrentPrice() {
    return this.price;
  }
}

export const mockMarketData = new MockMarketDataService();
// Start simulation
if (typeof window !== 'undefined') {
  mockMarketData.start();
}
