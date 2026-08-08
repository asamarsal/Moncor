'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { Zap, ShieldCheck, Trophy, LockKeyhole, Target, CircleDollarSign, Flag, Clock, Layers, Box, Flame, BarChart3 } from 'lucide-react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const fullText = "A Prediction Market\nBuilt for Speed.";
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#hero-title',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        let i = 0;
        setTypedText('');
        const timer = setInterval(() => {
          setTypedText(fullText.substring(0, i + 1));
          i++;
          if (i >= fullText.length) {
            clearInterval(timer);
          }
        }, 50);
      }
    });

    // Subtle GSAP Hover effects for cards
    gsap.utils.toArray('.feature-card').forEach((card: any) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -5, scale: 1.02, duration: 0.3, ease: 'power2.out', borderColor: '#a9ff24', boxShadow: '0 10px 30px rgba(169, 255, 36, 0.1)' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out', borderColor: '#1a2026', boxShadow: 'none' });
      });
    });
  }, { scope: container });

  const titleLines = typedText.split('\n');

  return (
    <main ref={container} className="min-h-screen bg-[#05080b] flex flex-col font-sans">
      <TopBar />
      
      <div className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-12 flex flex-col gap-6">
        
        {/* HERO SECTION */}
        <section className="flex flex-col lg:flex-row gap-12 items-center mb-8">
          <div className="flex-1">
            <h1 id="hero-title" className="text-5xl lg:text-[64px] font-bold text-white leading-[1.1] tracking-tight mb-6 min-h-[150px]">
              {titleLines[0]}
              {titleLines.length > 1 && <br/>}
              {titleLines.length > 1 && <span className="text-[#a9ff24]">{titleLines[1]}</span>}
            </h1>
            <p className="text-[#a0a6ad] text-lg max-w-xl mb-10 leading-relaxed">
              MonCor lets users predict crypto price outcomes through game-like interfaces, blending fixed-time lane racing and variable-time exact-second prediction.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link href="/play" className="btn-premium-primary px-8 py-4 rounded-lg font-bold flex items-center gap-2">
                🚀 Launch App <span className="ml-2">→</span>
              </Link>
              <Link href="/howitworks" className="btn-premium-secondary px-8 py-4 rounded-lg font-semibold flex items-center gap-2">
                Explore Game Modes <span className="ml-2 text-[#858b93]">{'>'}</span>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#858b93]">
              <div className="flex items-center gap-2 bg-[#0c1116] border border-[#1a2026] px-4 py-2.5 rounded-full">
                <Box size={14} className="text-[#b27aff]" /> Built on Monad
              </div>
              <div className="flex items-center gap-2 bg-[#0c1116] border border-[#1a2026] px-4 py-2.5 rounded-full">
                <Zap size={14} className="text-[#a9ff24]" /> Sub-Second Finality
              </div>
              <div className="flex items-center gap-2 bg-[#0c1116] border border-[#1a2026] px-4 py-2.5 rounded-full">
                <LockKeyhole size={14} className="text-white" /> On-Chain Settlement
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative w-full flex justify-center lg:justify-end">
            {/* MOCKUPS */}
            <div className="relative w-full max-w-[600px] aspect-[4/3]">
              {/* Variable Time Mockup */}
              <div className="absolute top-0 right-0 w-[80%] bg-[#090d12] border border-[#1a2026] rounded-xl p-4 shadow-2xl z-10 feature-card">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="text-[#b27aff] bg-[#b27aff]/10 p-1.5 rounded-md"><Zap size={14} /></div>
                    <div>
                      <div className="text-white text-xs font-bold">VARIABLE TIME</div>
                      <div className="text-[#858b93] text-[9px]">Predict the exact second</div>
                    </div>
                  </div>
                  <div className="border border-[#2a2938] px-2 py-1 rounded text-[9px] text-[#858b93]">DYNAMIC</div>
                </div>
                <div className="mb-2">
                  <div className="text-[#858b93] text-[9px]">EXACT SETTLEMENT TIME</div>
                  <div className="text-white text-lg font-bold flex items-center gap-2">
                    <Clock size={16} className="text-[#b27aff]" /> 00:00:40
                  </div>
                </div>
                <div className="h-[120px] w-full border-t border-b border-[#1a2026] relative mt-4">
                  <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <polyline points="0,30 10,25 20,28 30,15 40,20 50,22 60,10 70,12 80,5 90,8 100,2" fill="none" stroke="#b27aff" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <circle cx="30" cy="15" r="1.5" fill="#b27aff" />
                    <circle cx="60" cy="10" r="1.5" fill="#b27aff" />
                    <circle cx="80" cy="5" r="1.5" fill="#b27aff" />
                  </svg>
                  <div className="absolute top-[10%] left-[30%] text-[8px] bg-[#b27aff]/20 text-[#b27aff] px-1 rounded">1.11x</div>
                  <div className="absolute top-[5%] left-[60%] text-[8px] bg-[#b27aff]/20 text-[#b27aff] px-1 rounded">1.41x</div>
                  <div className="absolute top-[-5%] left-[80%] text-[8px] bg-[#b27aff] text-white px-1 rounded shadow-[0_0_10px_#b27aff]">2.38x</div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-1 text-[9px] text-[#858b93]"><span className="w-1.5 h-1.5 rounded-full bg-[#b27aff]"></span> Live Odds</div>
                  <div className="text-[9px] text-[#858b93] flex items-center gap-1">Auto-scroll <span className="w-6 h-3 bg-[#b27aff] rounded-full inline-block relative"><span className="w-2.5 h-2.5 bg-white rounded-full absolute right-0.5 top-[1px]"></span></span></div>
                </div>
              </div>

              {/* Fixed Time Mockup */}
              <div className="absolute bottom-4 left-0 w-[70%] bg-[#090d12] border border-[#1a2026] rounded-xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-20 feature-card">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="text-[#a9ff24] bg-[#a9ff24]/10 p-1.5 rounded-md"><Target size={14} /></div>
                    <div>
                      <div className="text-white text-xs font-bold">FIXED TIME</div>
                      <div className="text-[#858b93] text-[9px]">Race lanes to finish wins</div>
                    </div>
                  </div>
                  <div className="border border-[#2a2938] px-2 py-1 rounded text-[9px] text-[#858b93]">STRUCTURED</div>
                </div>
                <div className="text-[#858b93] text-[9px] mb-1">ROUND STARTS IN</div>
                <div className="text-[#a9ff24] text-sm font-bold mb-3">00:18</div>
                
                <div className="flex flex-col gap-1.5 mb-2">
                  {[0.152, 0.153, 0.154, 0.155].map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px]">
                      <span className="text-[#a9ff24] w-8">{p}</span>
                      <div className="flex-1 h-3 bg-[#11161b] relative rounded overflow-hidden">
                        <div className="absolute top-0 bottom-0 left-0 bg-[#e5e7eb]" style={{width: `${40 + i*10}%`}}></div>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-[10px] bg-[#a9ff24]/10 -mx-2 px-2 py-1 border border-[#a9ff24]/30 rounded">
                    <span className="text-[#a9ff24] w-8 font-bold">0.156</span>
                    <div className="flex-1 h-3 bg-[#11161b] relative rounded overflow-hidden">
                      <div className="absolute top-0 bottom-0 left-0 bg-[#a9ff24] shadow-[0_0_10px_#a9ff24]" style={{width: `85%`}}></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4 border-t border-[#1a2026] pt-3">
                  <div className="flex items-center gap-1 text-[9px] text-[#858b93]"><span className="w-1.5 h-1.5 rounded-full bg-[#a9ff24]"></span> Live Round</div>
                  <div className="text-[9px] text-[#858b93]">Provably Fair <ShieldCheck size={10} className="inline text-[#a9ff24]" /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MIDDLE 3 COLUMNS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-2">
          
          {/* What is MonCor */}
          <div className="bg-[#090d12] border border-[#1a2026] rounded-xl p-6 feature-card">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#1a2026] text-[#a0a6ad] text-xs font-bold px-2 py-0.5 rounded">1</span>
              <h3 className="text-white font-bold tracking-widest text-sm">WHAT IS MONCOR?</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 border border-[#1a2026] bg-[#05080b] rounded-lg p-4">
                <div className="flex justify-between items-center mb-4 border-b border-[#1a2026] pb-2">
                  <span className="text-xs font-bold text-white">MON / USD</span>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">$0.15637</div>
                    <div className="text-[9px] text-[#a9ff24]">+3.42%</div>
                  </div>
                </div>
                <div className="text-[9px] text-[#858b93] mb-3 uppercase font-bold">Game Modes</div>
                <div className="flex items-start gap-2 mb-3">
                  <Target size={14} className="text-[#a9ff24] mt-0.5" />
                  <div>
                    <div className="text-[#a9ff24] text-[10px] font-bold">Fixed Time</div>
                    <div className="text-[#858b93] text-[9px]">Lane racing to target</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Zap size={14} className="text-[#b27aff] mt-0.5" />
                  <div>
                    <div className="text-[#b27aff] text-[10px] font-bold">Variable Time</div>
                    <div className="text-[#858b93] text-[9px]">Exact second prediction</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-[#a0a6ad] text-sm mb-4 leading-relaxed">
                  MonCor is a Web3 prediction market where speed meets strategy.
                </p>
                <p className="text-[#858b93] text-xs leading-relaxed">
                  Choose your game mode, analyze real-time data, place your bet, and outpace the market.
                </p>
              </div>
            </div>
          </div>

          {/* How MonCor Works */}
          <div className="bg-[#090d12] border border-[#1a2026] rounded-xl p-6 feature-card">
            <div className="flex items-center gap-3 mb-8">
              <span className="bg-[#1a2026] text-[#a9ff24] text-xs font-bold px-2 py-0.5 rounded">2</span>
              <h3 className="text-white font-bold tracking-widest text-sm">HOW MONCOR WORKS</h3>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full border border-[#a9ff24] flex items-center justify-center text-[#a9ff24] bg-[#a9ff24]/5">
                <Target size={20} />
              </div>
              <div className="text-[#2a2938]">→</div>
              <div className="w-12 h-12 rounded-full border border-[#1a2026] flex items-center justify-center text-white bg-[#0c1116]">
                <Zap size={20} />
              </div>
              <div className="text-[#2a2938]">→</div>
              <div className="w-12 h-12 rounded-full border border-[#1a2026] flex items-center justify-center text-[#a9ff24] bg-[#a9ff24]/5">
                <CircleDollarSign size={20} />
              </div>
              <div className="text-[#2a2938]">→</div>
              <div className="w-12 h-12 rounded-full border border-[#1a2026] flex items-center justify-center text-white bg-[#0c1116]">
                <Flag size={20} />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center items-start">
              <div>
                <div className="text-white text-[10px] font-bold mb-1">1. Choose Mode</div>
                <div className="text-[#858b93] text-[9px] leading-tight">Pick Fixed Time or Variable Time prediction.</div>
              </div>
              <div>
                <div className="text-white text-[10px] font-bold mb-1">2. Analyze & Predict</div>
                <div className="text-[#858b93] text-[9px] leading-tight">Use live data and odds to spot your edge.</div>
              </div>
              <div>
                <div className="text-white text-[10px] font-bold mb-1">3. Place Your Bet</div>
                <div className="text-[#858b93] text-[9px] leading-tight">Stake MON and lock in your target or lane.</div>
              </div>
              <div>
                <div className="text-white text-[10px] font-bold mb-1">4. Win & Settle</div>
                <div className="text-[#858b93] text-[9px] leading-tight">If you're right, settlement is instant and on-chain.</div>
              </div>
            </div>
          </div>

          {/* Why Monad */}
          <div className="bg-[#090d12] border border-[#1a2026] rounded-xl p-6 feature-card">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#1a2026] text-[#a0a6ad] text-xs font-bold px-2 py-0.5 rounded">3</span>
              <h3 className="text-white font-bold tracking-widest text-sm">WHY MONAD?</h3>
            </div>
            <p className="text-[#a0a6ad] text-xs mb-6 border-b border-[#1a2026] pb-4">
              MonCor is purpose-built on Monad for unmatched performance and UX.
            </p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
              <div className="flex items-start gap-2">
                <div className="bg-[#11161b] p-1.5 rounded text-[#b27aff]"><Clock size={14} /></div>
                <div>
                  <div className="text-white text-[10px] font-bold">Low Latency</div>
                  <div className="text-[#858b93] text-[9px] leading-tight">Sub-second block times for real-time games.</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-[#11161b] p-1.5 rounded text-[#a9ff24]"><CircleDollarSign size={14} /></div>
                <div>
                  <div className="text-white text-[10px] font-bold">Cheap Transactions</div>
                  <div className="text-[#858b93] text-[9px] leading-tight">Minimal fees mean more bets, more fun.</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-[#11161b] p-1.5 rounded text-[#b27aff]"><Zap size={14} /></div>
                <div>
                  <div className="text-white text-[10px] font-bold">Instant Finality</div>
                  <div className="text-[#858b93] text-[9px] leading-tight">Fast, deterministic settlement on-chain.</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-[#11161b] p-1.5 rounded text-[#b27aff]"><Layers size={14} /></div>
                <div>
                  <div className="text-white text-[10px] font-bold">Developer Friendly</div>
                  <div className="text-[#858b93] text-[9px] leading-tight">EVM Compatible. Built for scale.</div>
                </div>
              </div>
            </div>
          </div>
          
        </section>

        {/* INSIDE THE PRODUCT */}
        <section className="bg-[#090d12] border border-[#1a2026] rounded-xl p-6 mb-2 feature-card">
          <h3 className="text-white font-bold tracking-widest text-sm mb-6 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a9ff24]"></span> INSIDE THE PRODUCT
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="flex gap-4">
              <div className="w-[120px] h-[80px] border border-[#2a2938] bg-[#05080b] rounded flex flex-col p-1.5 text-[8px] font-mono shrink-0">
                <div className="text-[#858b93] mb-1">ODDS (LIVE)</div>
                <div className="flex justify-between text-white"><span>+10s</span><span>+30s</span><span>+50s</span></div>
                <div className="flex justify-between text-[#858b93]"><span>1.20x</span><span>1.72x</span><span>3.02x</span></div>
                <div className="flex justify-between text-[#858b93]"><span>1.05x</span><span>1.08x</span><span>1.10x</span></div>
                <div className="flex justify-between text-[#b27aff]"><span>1.11x</span><span>1.41x</span><span className="bg-[#b27aff]/20 px-1 rounded">2.38x</span></div>
              </div>
              <div>
                <h4 className="text-white text-xs font-bold mb-1">LIVE ODDS MATRIX</h4>
                <p className="text-[#858b93] text-[10px] leading-relaxed">
                  Real-time odds move with the market. Spot value, track momentum, time your entry.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-[120px] h-[80px] border border-[#2a2938] bg-[#05080b] rounded flex flex-col p-1.5 justify-center gap-1 shrink-0">
                <div className="flex items-center gap-1"><span className="text-[#a9ff24] text-[8px] w-6">0.153</span><div className="h-2 bg-[#1a2026] flex-1 rounded"><div className="h-full bg-white w-[60%] rounded"></div></div></div>
                <div className="flex items-center gap-1"><span className="text-[#a9ff24] text-[8px] w-6">0.154</span><div className="h-2 bg-[#1a2026] flex-1 rounded"><div className="h-full bg-white w-[40%] rounded"></div></div></div>
                <div className="flex items-center gap-1 bg-[#a9ff24]/10 -mx-1 px-1 py-0.5 rounded border border-[#a9ff24]/30"><span className="text-[#a9ff24] text-[8px] w-6 font-bold">0.156</span><div className="h-2 bg-[#1a2026] flex-1 rounded"><div className="h-full bg-[#a9ff24] shadow-[0_0_5px_#a9ff24] w-[80%] rounded"></div></div></div>
              </div>
              <div>
                <h4 className="text-white text-xs font-bold mb-1">PIANO TILE RACE</h4>
                <p className="text-[#858b93] text-[10px] leading-relaxed">
                  Race lanes in Fixed Time mode. Be the first (or closest) to cross the finish.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-[120px] h-[80px] border border-[#2a2938] bg-[#05080b] rounded flex items-center justify-center shrink-0">
                <div className="relative">
                  <Box size={32} className="text-[#b27aff]" />
                  <div className="absolute inset-0 border border-[#b27aff]/30 rounded-lg scale-125 rotate-12"></div>
                  <div className="absolute inset-0 border border-[#b27aff]/30 rounded-lg scale-125 -rotate-12"></div>
                </div>
              </div>
              <div>
                <h4 className="text-white text-xs font-bold mb-1">ON-CHAIN SETTLEMENT</h4>
                <p className="text-[#858b93] text-[10px] leading-relaxed">
                  All bets are settled transparently on-chain. Provably fair. Always verifiable.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* STATS BAR */}
        <section className="bg-[#090d12] border border-[#1a2026] rounded-xl flex flex-wrap divide-x divide-[#1a2026] mb-2 feature-card">
          <div className="flex-1 min-w-[150px] p-4 flex items-center gap-4">
            <div className="text-[#a9ff24]"><Zap size={24} /></div>
            <div>
              <div className="text-[#858b93] text-[9px] font-bold uppercase tracking-wider mb-1">Active Players</div>
              <div className="flex items-end gap-2">
                <span className="text-white text-xl font-bold">2,643</span>
                <span className="text-[#a9ff24] text-[10px] font-bold mb-1">+18.7% <span className="text-[#5e656d] font-normal">24H</span></span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[150px] p-4 flex items-center gap-4">
            <div className="text-[#b27aff]"><CircleDollarSign size={24} /></div>
            <div>
              <div className="text-[#858b93] text-[9px] font-bold uppercase tracking-wider mb-1">Total Bets</div>
              <div className="flex items-end gap-2">
                <span className="text-white text-xl font-bold">$7.84M</span>
                <span className="text-[#a9ff24] text-[10px] font-bold mb-1">+22.4% <span className="text-[#5e656d] font-normal">24H</span></span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[150px] p-4 flex items-center gap-4">
            <div className="text-[#a9ff24]"><BarChart3 size={24} /></div>
            <div>
              <div className="text-[#858b93] text-[9px] font-bold uppercase tracking-wider mb-1">Daily Volume</div>
              <div className="flex items-end gap-2">
                <span className="text-white text-xl font-bold">$2.63M</span>
                <span className="text-[#a9ff24] text-[10px] font-bold mb-1">+16.3% <span className="text-[#5e656d] font-normal">24H</span></span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[150px] p-4 flex items-center gap-4">
            <div className="text-[#b27aff]"><Trophy size={24} /></div>
            <div>
              <div className="text-[#858b93] text-[9px] font-bold uppercase tracking-wider mb-1">Win Rate (24H)</div>
              <div className="flex items-end gap-2">
                <span className="text-white text-xl font-bold">62.7%</span>
                <span className="text-[#858b93] text-[10px] mb-1">Top Predictors</span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[150px] p-4 flex items-center gap-4">
            <div className="text-[#a9ff24]"><Flame size={24} /></div>
            <div>
              <div className="text-[#858b93] text-[9px] font-bold uppercase tracking-wider mb-1">Live Rounds</div>
              <div className="flex items-end gap-2">
                <span className="text-white text-xl font-bold">8</span>
                <span className="text-[#858b93] text-[10px] mb-1">Across all markets</span>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="bg-gradient-to-r from-[#090d12] via-[#0d1612] to-[#090d12] border border-[#a9ff24]/20 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(169, 255, 36, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(169, 255, 36, 0.5) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            transform: 'perspective(500px) rotateX(60deg) scale(2)',
            transformOrigin: 'bottom'
          }}></div>
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="text-[#a9ff24]">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 50L35 20L50 80L65 30L80 60" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 50L35 20L50 80L65 30L80 60" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" style={{filter: 'drop-shadow(0 0 10px #a9ff24)'}}/>
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Ready to Predict the Future?</h2>
              <p className="text-[#858b93] text-sm">Join thousands of traders racing time and beating the market on MonCor.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
            <Link href="/play" className="flex-1 md:flex-none btn-premium-primary px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 whitespace-nowrap">
              🚀 Launch MonCor App
            </Link>
            <Link href="#" className="flex-1 md:flex-none btn-premium-secondary px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 whitespace-nowrap">
              View Leaderboard <span className="ml-2 text-[#858b93]">{'>'}</span>
            </Link>
          </div>
        </section>

      </div>
      
      <Footer />
    </main>
  )
}
