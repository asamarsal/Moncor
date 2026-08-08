'use client'

import { useEffect, useMemo, useState } from 'react'
import { Activity, Clock3, LockKeyhole, ShieldCheck, Trophy, Zap } from 'lucide-react'
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

type Mode = 'fixed' | 'variable'
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

function FixedBoard({ price, locked, select }: { price: number; locked: boolean; select: (x: string) => void }) {
  return (
    <div className="fixed-board">
      <div className="board-title">
        <span>RACE BOARD</span>
        <span>ROUND ENDS IN <b>{locked ? '00:28' : '00:42'}</b></span>
      </div>
      {Array.from({ length: 10 }, (_, i) => {
        const p = price + (i - 5) * .00025;
        return (
          <button disabled={locked} onClick={() => select(`Target ${priceText(p)}`)} className={`race-row ${i === 5 ? 'active' : ''}`} key={i}>
            <b>{p.toFixed(3)}</b>
            <span className="race-track">
              <i style={{ width: `${39 + ((i * 13) % 34)}%` }} /><em />
            </span>
            <small>{i === 5 ? '›' : ''}</small>
          </button>
        )
      })}
      <div className="legend">
        <span><i /> You</span><span><i /> Other Players</span><span>▧ Finish Line</span>
      </div>
    </div>
  )
}

function Matrix({ locked, select, activeColumn, price }: { locked: boolean; select: (x: string) => void; activeColumn: number; price: number }) {
  const values = ['1.1x', '1.2x', '1.3x', '1.4x', '1.6x', '1.8x', '2.8x', '3.6x', '5.6x', '8.0x']
  const times = ['0s', '+2s', '+4s', '+6s', '+8s', '+12s', '+14s', '+18s', '+22s', '+26s', '+30s']
  return (
    <div className="matrix">
      <div className="matrix-cursor" style={{ left: `${((activeColumn + 1) / 11) * 100}%` }} aria-hidden="true" />
      <div className="price-marker" style={{ top: `${58 + activeColumn * 3}%` }}>
        <span>{priceText(price)}</span><small>LIVE</small>
      </div>
      <div className="matrix-row matrix-head">
        {times.map((x, i) => <span className={i === activeColumn + 1 ? 'time-active' : ''} key={x}>{x}</span>)}
      </div>
      {Array.from({ length: 9 }, (_, row) => (
        <div className="matrix-row" key={row}>
          <b>{values[row]}</b>
          {Array.from({ length: 10 }, (_, col) => {
            const v = values[(row + col + 2) % values.length];
            const isActive = col === activeColumn || col === (activeColumn + 1) % 10;
            return (
              <button disabled={locked} className={`odds tone-${(row + col) % 5} ${isActive ? 'odds-active' : ''}`} onClick={() => select(`${v} target range`)} key={col}>{v}</button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

function Chart({ price }: { price: number }) {
  return (
    <div className="mini-chart">
      <div className="chart-label">LIVE PRICE PATH <span>MON / USD</span></div>
      <div className="chart-area">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none">
          <polyline points="0,105 30,67 57,70 85,105 115,95 145,112 176,108 205,138 245,118 275,115 306,84 345,90 378,70 410,84 445,62 500,78" fill="none" stroke="var(--violet)" strokeWidth="2" />
        </svg>
        <b>{priceText(price)}</b>
      </div>
    </div>
  )
}

export default function Home() {
  const [mode, setMode] = useState<Mode>('fixed');
  const [price, setPrice] = useState(.15637);
  const [locked, setLocked] = useState(false);
  const [selection, setSelection] = useState('1.50x – 3.50x');
  const [seconds, setSeconds] = useState(18);
  const [activeColumn, setActiveColumn] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setPrice(p => clamp(p + (Math.random() - .48) * .00011, .15012, .15982)), 1400);
    return () => clearInterval(timer)
  }, [])

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

  const change = useMemo(() => ((price - .15637) / .15637) * 100, [price])
  const select = (value: string) => { setSelection(value); setLocked(true); setSeconds(18) }
  const reset = () => { setLocked(false); setSelection('1.50x – 3.50x'); setSeconds(18) }

  return (
    <main className="terminal-shell flex flex-col min-h-screen">
      <TopBar />

      <div className="terminal-grid">
        <LeftRail />

        <section className="main-stage">
          <div className="mode-tabs">
            <button className={mode === 'fixed' ? 'active fixed-active' : ''} onClick={() => { setMode('fixed'); reset() }}>
              <span className="mode-icon">◷</span>
              <strong>FIXED TIME<small>Round duration is fixed</small></strong>
              <em>STRUCTURED</em>
            </button>
            <button className={mode === 'variable' ? 'active variable-active' : ''} onClick={() => { setMode('variable'); reset() }}>
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
                    <b>1st Place <i>10.00x</i></b><b>2nd Place <i>4.00x</i></b><b>3rd Place <i>2.00x</i></b><b>4th – 10th <i>1.20x</i></b>
                  </div>
                </div>
                <div className="duration">
                  <button>1 MINUTE</button><button>5 MINUTES</button><button>10 MINUTES</button>
                </div>
                <FixedBoard price={price} locked={locked} select={select} />
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
                <Matrix locked={locked} select={select} activeColumn={activeColumn} price={price} />
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
          <section className="mode-card">
            <span>GAME MODE</span>
            <b>{mode === 'fixed' ? 'FIXED TIME' : 'VARIABLE TIME'}</b>
            <button onClick={() => { setMode(mode === 'fixed' ? 'variable' : 'fixed'); reset() }}>Change Mode</button>
          </section>
          <section className="selection-card">
            <span>YOUR SELECTION</span>
            <div className="selection-box">
              <small>TARGET RANGE</small>
              <strong>{selection}</strong>
              <button>⌕ Adjust Range</button>
            </div>
            <div className="bet-amount">
              <span>BET AMOUNT <small>BALANCE ◇ 125.80</small></span>
              <div>
                <button>10</button><button>25</button><button className="selected">50</button><button>MAX</button>
              </div>
              <strong>◇ 50 <small>MON</small></strong>
              <em>≈ $7.82 USD</em>
            </div>
            <div className="estimated">
              <span>ESTIMATED PAYOUT</span>
              <b>{locked ? '2.35x' : '—'}</b>
              <small>≈ 117.50 MON ($18.42)</small>
            </div>
            <button className={`lock-prediction ${locked ? 'is-locked' : ''}`} onClick={locked ? reset : undefined} disabled={!locked}>
              <LockKeyhole size={16} /> {locked ? 'RESET DEMO ROUND' : 'LOCK PREDICTION'}
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
