'use client'

import { useState, useEffect } from 'react'
import { Clock3, LockKeyhole, Trophy, Zap } from 'lucide-react'
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { FixedBoard } from "@/components/game/fixed-board";
import { Matrix } from "@/components/game/variable-matrix";
import { useGameSelectionStore } from '@/stores/game-selection-store';
import { fetchMockQuote, QuoteResponse } from '@/lib/api/mock-quote';
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { GameRouterABI } from '@/lib/abi/GameRouter';

const winners = [['0xB7a1...8f32', '+1,842.30', '7,420'], ['MonadFrens', '+1,201.55', '6,133'], ['0xC4d2...9a11', '+982.40', '4,998'], ['ByteBaller', '+721.19', '3,680'], ['DeFiDegen', '+512.44', '2,614'], ['0x9Ae3...71d0', '+441.27', '2,251'], ['GreenCandle', '+331.10', '1,692'], ['MoonWalker', '+287.76', '1,470']]

function LeftRail() {
  return (
    <aside className="left-rail">
      <section className="side-card winners">
        <div className="side-title">
          <span><Trophy size={15} /> TOP WINNERS</span>
          <div className="seg"><b>24H</b><span>7D</span></div>
        </div>
        {winners.map(([name, gain, score], i) => (
          <div className="winner" key={name}>
            <i>{i + 1}</i><span>{name}</span><b>{gain}</b><em>◇ {score}</em>
          </div>
        ))}
      </section>
      <section className="side-card how">
        <div className="side-title">
          <span><Zap size={15} /> HOW IT WORKS</span>
        </div>
        <div className="how-block how-fixed">
          <b>◷ FIXED TIME</b>
          <p><i>1</i> Select duration and a target price lane</p>
          <p><i>2</i> If price reaches your lane before time runs out, you win!</p>
        </div>
        <div className="how-block variable">
          <b>ϟ VARIABLE TIME</b>
          <p><i>1</i> Set your target multiplier range</p>
          <p><i>2</i> Cash out before the line hits zero or a multiplier below your range</p>
        </div>
      </section>
    </aside>
  )
}

import { LightweightFallback } from "@/components/chart/lightweight-fallback";

function Chart({ price }: { price: number }) {
  return (
    <div className="mini-chart" style={{ height: 'auto', minHeight: '340px' }}>
      <div className="chart-label mb-2">LIVE PRICE PATH <span>ETH / USD · SHARED FEED</span></div>
      <LightweightFallback price={price} />
    </div>
  )
}

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const { writeContractAsync, data: txHash, isPending: isSubmitting } = useWriteContract();
  const { isLoading: isWaitingTx } = useWaitForTransactionReceipt({ hash: txHash });

  const userBalance = balanceData ? Number.parseFloat(balanceData.formatted).toFixed(2) : '0.00';

  // Zustand Store
  const { mode, setMode, selection, setSelection, locked, setLocked, horizon, setHorizon, wagerAmount, setWagerAmount, reset } = useGameSelectionStore();
  
  // Local Presentation State
  const [price, setPrice] = useState(2805.00);
  const [seconds, setSeconds] = useState(18);
  const [activeColumn, setActiveColumn] = useState(0);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);

  // Sync with Realtime Live Market Data (Binance WebSocket + Coinbase REST)
  useEffect(() => {
    fetch("https://api.exchange.coinbase.com/products/ETH-USD/ticker")
      .then(res => res.json())
      .then(d => {
        if (d && d.price) setPrice(Number.parseFloat(d.price));
      })
      .catch(() => {});

    let ws: WebSocket | null = null;
    try {
      ws = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@ticker");
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data && data.c) {
            setPrice(Number.parseFloat(data.c));
          }
        } catch {}
      };
    } catch {}

    return () => {
      if (ws) ws.close();
    };
  }, []);

  // Visual timers
  useEffect(() => {
    if (mode !== 'variable' || locked) return;
    const timer = setInterval(() => setActiveColumn(c => (c + 1) % 10), 900);
    return () => clearInterval(timer)
  }, [mode, locked])

  useEffect(() => {
    if (!locked) return;
    const timer = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer)
  }, [locked])

  
  const handleSelect = (value: string) => { 
    setSelection(value); 
  }
  
  const handleLockPrediction = async () => {
    if (locked) {
      reset();
      setQuote(null);
      setSeconds(18);
      return;
    }
    
    if (!selection) return;

    setIsLoadingQuote(true);
    try {
      let q: QuoteResponse | null = null;
      try {
        q = await fetchMockQuote(mode, horizon, wagerAmount);
        setQuote(q);
      } catch (e) {
        console.warn("Quote fetch failed, proceeding with direct lock UI mode", e);
      }

      if (q && q.rawQuote && q.signature && isConnected) {
        const value = BigInt(Math.floor(Number.parseFloat(wagerAmount) * 1e18));
        try {
          await writeContractAsync({
            abi: GameRouterABI,
            address: '0x7A2b56788880A123Cde147987823e59b90875b2F',
            functionName: 'acceptQuote',
            args: [
              typeof q.rawQuote === 'string' ? JSON.parse(q.rawQuote) : q.rawQuote,
              q.signature as `0x${string}`
            ],
            value: value
          });
        } catch (err: unknown) {
          console.warn("Wallet execution notice:", err);
        }
      }

      // Always lock the round UI once user clicks LOCK PREDICTION
      setLocked(true);
      if (mode === 'fixed') {
        const horizonSecs = q ? (q.settlementAt - q.startAt) : 60;
        setSeconds(horizonSecs > 0 ? horizonSecs : 60);
      } else {
        setSeconds(18);
      }
    } catch (err) {
      console.error("Lock prediction error:", err);
    } finally {
      setIsLoadingQuote(false);
    }
  }

  const getButtonLabel = () => {
    if (isLoadingQuote) return 'FETCHING QUOTE...';
    if (isSubmitting) return 'CONFIRM IN WALLET...';
    if (isWaitingTx) return 'WAITING FOR TX...';
    if (!isConnected) return 'CONNECT WALLET TO PLAY';
    if (locked) return 'RESET DEMO ROUND';
    return 'LOCK PREDICTION';
  };

  return (
    <main className="terminal-shell flex flex-col min-h-screen">
      <TopBar />

      <div className="terminal-grid">
        <LeftRail />

        <section className="main-stage">
          <div className="mode-tabs">
            <button type="button" className={mode === 'fixed' ? 'active fixed-active' : ''} onClick={() => { setMode('fixed'); reset(); setQuote(null); }}>
              <span className="mode-icon">◷</span>
              <strong>FIXED TIME<small>Round duration is fixed</small></strong>
              <em>STRUCTURED</em>
            </button>
            <button type="button" className={mode === 'variable' ? 'active variable-active' : ''} onClick={() => { setMode('variable'); reset(); setQuote(null); }}>
              <span className="mode-icon">ϟ</span>
              <strong>VARIABLE TIME<small>Time is not fixed · Minimum 10 seconds</small></strong>
              <em>DYNAMIC</em>
            </button>
          </div>

          <div className={`game-columns ${mode === 'fixed' ? 'single-mode fixed-only' : 'single-mode variable-only'}`}>
            {mode === 'fixed' && (
              <section className="game-panel fixed-panel">
                <div className="game-header">
                  <div>
                    <h2><Clock3 size={18} /> FIXED TIME</h2>
                    <p>Round duration is fixed</p>
                  </div>
                  <div className="payout">
                    <span>PAYOUT LADDER</span>
                    {quote?.payoutLadder ? (
                      quote.payoutLadder.map((l) => (
                        <b key={l.place}>{l.place} <i>{l.multiplier.toFixed(2)}x</i></b>
                      ))
                    ) : (
                      <>
                        <b>1st Place <i>10.00x</i></b><b>2nd Place <i>4.00x</i></b><b>3rd Place <i>2.00x</i></b><b>4th – 10th <i>1.20x</i></b>
                      </>
                    )}
                  </div>
                </div>
                <div className="duration">
                  <button type="button" className={horizon === 'PT1M' ? 'active' : ''} onClick={() => setHorizon('PT1M')}>1 MINUTE</button>
                  <button type="button" className={horizon === 'PT5M' ? 'active' : ''} onClick={() => setHorizon('PT5M')}>5 MINUTES</button>
                  <button type="button" className={horizon === 'PT10M' ? 'active' : ''} onClick={() => setHorizon('PT10M')}>10 MINUTES</button>
                </div>
                <FixedBoard price={price} locked={locked} select={handleSelect} />
              </section>
            )}
            {mode === 'variable' && (
              <section className="game-panel variable-panel">
                <div className="variable-head">
                  <div>
                    <h2><Zap size={18} /> VARIABLE TIME</h2>
                    <p>Time is not fixed · Minimum 10 seconds</p>
                  </div>
                  <div>
                    <small>DURATION</small>
                    <strong>00:{String(seconds).padStart(2, '0')}</strong>
                    <em>10s MIN</em>
                  </div>
                </div>
                <div className="matrix-title">MULTIPLIER GRID (Live)</div>
                <Matrix locked={locked} select={handleSelect} activeColumn={activeColumn} price={price} />
                <div className="target-range">
                  <span>YOUR TARGET RANGE</span>
                  <div>
                    <b>1.50x</b><input type="range" min="1" max="5" defaultValue="2.4" /><b>3.50x</b>
                  </div>
                  <p>Payout improves the longer you survive within your range.</p>
                </div>
              </section>
            )}
          </div>

          <Chart price={price} />
        </section>

        <aside className="right-rail">
          <section className="selection-card">
            <span>YOUR SELECTION</span>
            <div className="selection-box">
              <small>TARGET RANGE</small>
              <strong>{selection || 'None'}</strong>
              <button type="button">⌕ Adjust Range</button>
            </div>
            <div className="bet-amount">
              <span>BET AMOUNT <small>BALANCE ◇ {userBalance}</small></span>
              <div>
                {['0.1', '1', '2', '5'].map((amt) => (
                  <button type="button" 
                    key={amt} 
                    className={wagerAmount === amt ? 'selected' : ''} 
                    onClick={() => setWagerAmount(amt)}
                  >
                    {amt}
                  </button>
                ))}
              </div>
              <strong>◇ {wagerAmount} <small>MON</small></strong>
              <em>≈ ${(Number.parseFloat(wagerAmount || '0') * 0.156).toFixed(2)} USD</em>
            </div>
            <div className="estimated">
              <span>ESTIMATED PAYOUT</span>
              <b>{quote ? `${(Number.parseFloat(quote.maxPayout) / 1e18 / Number.parseFloat(wagerAmount)).toFixed(2)}x` : '—'}</b>
              <small>{quote ? `≈ ${Number.parseFloat(quote.maxPayout) / 1e18} MON` : ''}</small>
            </div>
            <button type="button"
              className={`lock-prediction ${locked ? 'is-locked' : ''}`} 
              onClick={handleLockPrediction} 
              disabled={(!selection && !locked) || isLoadingQuote || isSubmitting || isWaitingTx}
            >
              <LockKeyhole size={16} /> 
              {getButtonLabel()}
            </button>
            <p className="lock-note">{locked ? 'Prediction locked. Demo round in progress.' : 'Locks in your bet and starts the round.'}</p>
          </section>
          <section className="stats-card">
            <div><span>WIN RATE (24H)</span><b>62.7%</b></div>
            <div><span>TOTAL BETS (24H)</span><b>18,642</b></div>
          </section>
        </aside>
      </div>

      <Footer />
    </main>
  )
}
