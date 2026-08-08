'use client'

import { useState, useEffect } from 'react'
import { Clock3, LockKeyhole, Trophy, Zap } from 'lucide-react'
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { FixedBoard } from "@/components/game/fixed-board";
import { Matrix } from "@/components/game/variable-matrix";
import { useGameSelectionStore } from '@/stores/game-selection-store';
import { mockMarketData } from '@/lib/market-data/mock-service';
import { fetchMockQuote, QuoteResponse } from '@/lib/api/mock-quote';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { GameRouterABI } from '@/lib/abi/GameRouter';

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))
const priceText = (n: number) => n.toFixed(5)

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

function Chart() {
  return (
    <div className="mini-chart" style={{ height: 'auto', minHeight: '340px' }}>
      <div className="chart-label mb-2">LIVE PRICE PATH <span>MON / USD</span></div>
      <LightweightFallback />
    </div>
  )
}

export default function Home() {
  const { isConnected } = useAccount();
  const { writeContract, data: txHash, isPending: isSubmitting } = useWriteContract();
  const { isLoading: isWaitingTx } = useWaitForTransactionReceipt({ hash: txHash });

  // Zustand Store
  const { mode, setMode, selection, setSelection, locked, setLocked, horizon, wagerAmount, setWagerAmount, reset } = useGameSelectionStore();
  
  // Local Presentation State
  const [price, setPrice] = useState(.15637);
  const [seconds, setSeconds] = useState(18);
  const [activeColumn, setActiveColumn] = useState(0);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);

  // Sync with Mock Market Data
  useEffect(() => {
    const unsubscribe = mockMarketData.subscribe((newPrice) => {
      setPrice(newPrice);
    });
    return () => { unsubscribe(); };
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
    if (!isConnected) {
      alert("Please connect your wallet first.");
      return;
    }

    setIsLoadingQuote(true);
    try {
      const q = await fetchMockQuote(mode, horizon, wagerAmount);
      setQuote(q);
      
      if (q.rawQuote && q.signature) {
        // Parse wager amount safely
        const value = BigInt(Number.parseFloat(wagerAmount) * 1e18);

        writeContract({
          abi: GameRouterABI,
          address: '0x0000000000000000000000000000000000000000', // DUMMY OR TESTNET ADDRESS
          functionName: 'acceptQuote',
          args: [
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (typeof q.rawQuote === 'string' ? JSON.parse(q.rawQuote) : q.rawQuote) as any,
            q.signature as `0x${string}`
          ],
          value: value
        }, {
          onSuccess: () => {
            setLocked(true);
            if (mode === 'fixed') {
              const horizonSecs = q.settlementAt - q.startAt;
              setSeconds(horizonSecs);
            } else {
              setSeconds(18); // Default for variable demo
            }
          },
          onError: (err) => {
            console.error("Wallet rejected or failed", err);
            alert("Transaction failed: " + err.message);
          }
        });
      } else {
        // Fallback for mock missing rawQuote
        setLocked(true);
        if (mode === 'fixed') {
          const horizonSecs = q.settlementAt - q.startAt;
          setSeconds(horizonSecs);
        } else {
          setSeconds(18);
        }
      }
    } catch (err) {
      console.error(err);
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
                  <button type="button">1 MINUTE</button><button type="button">5 MINUTES</button><button type="button">10 MINUTES</button>
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

          <Chart />
        </section>

        <aside className="right-rail">
          <section className="mode-card">
            <span>GAME MODE</span>
            <b>{mode === 'fixed' ? 'FIXED TIME' : 'VARIABLE TIME'}</b>
            <button type="button" onClick={() => { setMode(mode === 'fixed' ? 'variable' : 'fixed'); reset(); setQuote(null); }}>Change Mode</button>
          </section>
          <section className="selection-card">
            <span>YOUR SELECTION</span>
            <div className="selection-box">
              <small>TARGET RANGE</small>
              <strong>{selection || 'None'}</strong>
              <button type="button">⌕ Adjust Range</button>
            </div>
            <div className="bet-amount">
              <span>BET AMOUNT <small>BALANCE ◇ 125.80</small></span>
              <div>
                {['10', '25', '50', 'MAX'].map((amt) => (
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
