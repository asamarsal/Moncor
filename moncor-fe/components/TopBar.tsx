'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, CircleHelp, Settings } from 'lucide-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function TopBar() {
  const pathname = usePathname()

  const [time, setTime] = useState<string>('');

  useEffect(() => {
    setTime(new Date().toUTCString().split(' ')[4] + ' UTC');
    const timer = setInterval(() => {
      setTime(new Date().toUTCString().split(' ')[4] + ' UTC');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      
      <div className="flex items-center gap-4 text-xs font-mono text-[#858b93] mr-4">
        {time}
      </div>

      <div className="top-icons">
        <button type="button" aria-label="Analytics"><BarChart3 size={16} /></button>
        <button type="button" aria-label="Help"><CircleHelp size={16} /></button>
        <button type="button" aria-label="Settings"><Settings size={16} /></button>
      </div>
      
      <ConnectButton />
    </header>
  )
}

