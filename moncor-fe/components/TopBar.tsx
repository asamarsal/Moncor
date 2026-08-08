'use client'

import { BarChart3, CircleHelp, Settings, WalletCards } from 'lucide-react'

function Sparkline({ points }: { points: number[] }) {
  const path = points.map((point, index) => `${(index / (points.length - 1)) * 100},${100 - point * 78}`).join(' ')
  return (
    <svg className="sparkline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="MON price movement">
      <polyline points={path} fill="none" stroke="var(--neon)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  )
}

export default function TopBar() {
  const price = 0.15638
  const change = 0.01

  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-wave">⌁</span>
        <strong>Moncor</strong>
      </div>
      
      <button className="chain-pill">
        <span>◆</span> Monad
      </button>
      
      <div className="pair">
        MONAD <span>/ USD</span>
      </div>
      
      <div className="hero-price">
        ${price.toFixed(5)}
      </div>
      
      <div className="change">
        <span>24H CHANGE</span>
        <b className={change >= 0 ? 'green' : 'red'}>+{change.toFixed(2)}%</b>
      </div>
      
      <Sparkline points={[.4,.46,.43,.57,.52,.68,.72,.85]} />
      
      <div className="top-metrics">
        <Metric label="24H HIGH" value="$0.15902" />
        <Metric label="24H LOW" value="$0.15012" />
        <Metric label="24H VOL" value="$18.42M" />
        <Metric label="PLAYERS" value="2,643" />
      </div>
      
      <div className="top-icons">
        <button aria-label="Analytics"><BarChart3 size={16} /></button>
        <button aria-label="Help"><CircleHelp size={16} /></button>
        <button aria-label="Settings"><Settings size={16} /></button>
      </div>
      
      <button className="wallet">
        <WalletCards size={16} /> Connect Wallet
      </button>
    </header>
  )
}
