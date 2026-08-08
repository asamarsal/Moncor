'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, CircleHelp, Settings, WalletCards } from 'lucide-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function TopBar() {
  const pathname = usePathname()

  return (
    <header className="topbar">
      <Link href="/" className="brand hover:opacity-80 transition-opacity">
        <span className="brand-wave">⌁</span>
        <strong>Moncor</strong>
      </Link>
      
      <nav className="flex items-center gap-8 ml-4 mr-auto text-sm font-semibold text-[#858b93]">
        <Link href="/play" className={`hover:text-white transition-colors ${pathname === '/play' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : ''}`}>Play</Link>
        <Link href="/activity" className={`hover:text-white transition-colors ${pathname === '/activity' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : ''}`}>Activity</Link>
        <Link href="/howitworks" className={`hover:text-white transition-colors ${pathname === '/howitworks' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : ''}`}>How it works</Link>
      </nav>
      
      <div className="top-icons">
        <button aria-label="Analytics"><BarChart3 size={16} /></button>
        <button aria-label="Help"><CircleHelp size={16} /></button>
        <button aria-label="Settings"><Settings size={16} /></button>
      </div>
      
      <ConnectButton />
    </header>
  )
}

