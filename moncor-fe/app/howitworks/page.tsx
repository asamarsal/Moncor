'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { Zap, ShieldCheck, LockKeyhole, Target, Box, Clock, ChevronDown, CheckCircle2, Flame, Info } from 'lucide-react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const container = useRef<HTMLElement>(null);
  const [typedText, setTypedText] = useState('');
  const fullText = "How It Works";

  useGSAP(() => {
    // Typewriter effect for title
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
        }, 80);
      }
    });

    // Stagger animation for the 4 steps
    gsap.from('.step-card', {
      scrollTrigger: {
        trigger: '.steps-container',
        start: 'top 80%',
        once: true
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });

    // Fade up for detailed panels
    gsap.from('.panel-card', {
      scrollTrigger: {
        trigger: '.panels-container',
        start: 'top 85%',
        once: true
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });

  }, { scope: container });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Are markets fair?",
      a: "Yes. All outcomes are settled on-chain using verified price oracles. Smart contracts ensure that payouts are deterministic and cannot be tampered with."
    },
    {
      q: "Can I cancel my bet?",
      a: "No. Once locked, your prediction is final. Because odds are calculated dynamically and positions are recorded immutably on-chain, all trades are final."
    },
    {
      q: "How are odds calculated?",
      a: "Odds reflect probability, liquidity, and time-to-target risk. In Variable Time, odds scale based on distance from current price and time horizon."
    },
    {
      q: "Which mode should I use?",
      a: "New to MonCor? Start with Fixed Time 1m. Want precision and higher potential payouts? Try Variable Time."
    }
  ];

  return (
    <main ref={container} className="min-h-screen bg-[#05080b] flex flex-col font-sans">
      <TopBar />
      
      <div className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-12 flex flex-col gap-6">
        
        {/* HEADER SECTION */}
        <section className="flex flex-col lg:flex-row gap-8 justify-between mb-4">
          <div className="flex-1">
            <h1 id="hero-title" className="text-5xl font-bold text-white tracking-tight mb-4 min-h-[55px]">
              {typedText}
              <span className="animate-pulse">_</span>
            </h1>
            <p className="text-[#a0a6ad] text-lg max-w-md leading-relaxed">
              MonCor lets you predict where the price will be at a future time.<br />
              Two modes. One settlement layer. Fully on-chain.
            </p>
          </div>
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-[#090d12] border border-[#1a2026] rounded-xl p-6 flex items-start gap-4 hover:border-[#a9ff24] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(169,255,36,0.1)] transition-all duration-300">
              <div className="text-[#a9ff24]"><Target size={32} /></div>
              <div>
                <h3 className="text-[#a9ff24] font-bold text-lg mb-1">Fixed Time</h3>
                <p className="text-[#858b93] text-sm">Pick a time horizon.<br/>Race the market.</p>
              </div>
            </div>
            <div className="flex-1 bg-[#090d12] border border-[#1a2026] rounded-xl p-6 flex items-start gap-4 hover:border-[#b27aff] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(178,122,255,0.1)] transition-all duration-300">
              <div className="text-[#b27aff]"><Zap size={32} /></div>
              <div>
                <h3 className="text-[#b27aff] font-bold text-lg mb-1">Variable Time</h3>
                <p className="text-[#858b93] text-sm">Pick the exact second.<br/>Beat the odds.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 STEP PROCESS */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 relative steps-container">
          {/* Step 1 */}
          <div className="step-card bg-[#090d12] border border-[#1a2026] rounded-xl p-6 flex flex-col h-full relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-6 h-6 rounded-full border border-[#a9ff24] text-[#a9ff24] flex items-center justify-center text-xs font-bold">1</span>
              <h3 className="text-white font-bold">Choose Mode</h3>
            </div>
            <div className="flex flex-col gap-3 flex-1 justify-center">
              <div className="border border-[#a9ff24]/30 bg-[#a9ff24]/5 rounded-lg p-3 flex items-center gap-3">
                <Target className="text-[#a9ff24]" size={16} />
                <div>
                  <div className="text-[#a9ff24] text-xs font-bold">Fixed Time</div>
                  <div className="text-[#858b93] text-[10px]">Predict at 1m, 3m, 5m, or 10m</div>
                </div>
              </div>
              <div className="border border-[#b27aff]/30 bg-[#b27aff]/5 rounded-lg p-3 flex items-center gap-3">
                <Zap className="text-[#b27aff]" size={16} />
                <div>
                  <div className="text-[#b27aff] text-xs font-bold">Variable Time</div>
                  <div className="text-[#858b93] text-[10px]">Predict at an exact second<br/>(+10s to +60s)</div>
                </div>
              </div>
            </div>
            <p className="text-[#858b93] text-xs mt-6">Choose between Fixed Time (race mode) or Variable Time (exact second).</p>
          </div>
          
          {/* Arrow */}
          <div className="hidden md:block absolute top-1/2 left-[24%] transform -translate-y-1/2 z-0 text-[#2a2938]">→</div>

          {/* Step 2 */}
          <div className="step-card bg-[#090d12] border border-[#1a2026] rounded-xl p-6 flex flex-col h-full relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-6 h-6 rounded-full border border-[#a9ff24] text-[#a9ff24] flex items-center justify-center text-xs font-bold">2</span>
              <h3 className="text-white font-bold">Select Target</h3>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-[10px] text-[#858b93] mb-2 uppercase tracking-wider text-center">PIANO TILE RACE (10 LANES)</div>
              <div className="border border-[#1a2026] bg-[#05080b] rounded p-2 flex flex-col gap-1">
                {[0.160, 0.158, 0.156, 0.154, 0.152, 0.150, 0.148, 0.146].map((price, i) => (
                  <div key={i} className="flex items-center gap-2 text-[9px]">
                    <span className={i === 3 ? "text-[#a9ff24] font-bold w-8" : "text-[#858b93] w-8"}>{price.toFixed(3)}</span>
                    <div className="flex-1 h-2 bg-[#11161b] rounded relative overflow-hidden">
                      <div className={`absolute top-0 bottom-0 left-0 ${i === 3 ? 'bg-[#a9ff24] shadow-[0_0_8px_#a9ff24]' : 'bg-[#e5e7eb]'}`} style={{width: `${Math.max(10, 80 - Math.abs(i-3)*20)}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[#858b93] text-xs mt-6">Pick one lane on the board (Fixed Time) or one price + second in the matrix (Variable Time).</p>
          </div>

          {/* Arrow */}
          <div className="hidden md:block absolute top-1/2 left-[49%] transform -translate-y-1/2 z-0 text-[#2a2938]">→</div>

          {/* Step 3 */}
          <div className="step-card bg-[#090d12] border border-[#1a2026] rounded-xl p-6 flex flex-col h-full relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-6 h-6 rounded-full border border-[#a9ff24] text-[#a9ff24] flex items-center justify-center text-xs font-bold">3</span>
              <h3 className="text-white font-bold">Lock Prediction</h3>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
              <div className="w-16 h-16 rounded-full border border-[#a9ff24]/30 flex items-center justify-center text-[#a9ff24] bg-[#a9ff24]/5 shadow-[0_0_15px_rgba(169,255,36,0.1)]">
                <LockKeyhole size={28} />
              </div>
              <p className="text-[#a0a6ad] text-sm">
                Review your odds, stake your amount, and lock in.<br/><br/>
                Your position is recorded on-chain and cannot be changed.
              </p>
            </div>
            <p className="text-[#858b93] text-xs mt-6">Your bet is committed on-chain. No edits. No takebacks.</p>
          </div>

          {/* Arrow */}
          <div className="hidden md:block absolute top-1/2 left-[74%] transform -translate-y-1/2 z-0 text-[#2a2938]">→</div>

          {/* Step 4 */}
          <div className="step-card bg-[#090d12] border border-[#1a2026] rounded-xl p-6 flex flex-col h-full relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-6 h-6 rounded-full border border-[#b27aff] text-[#b27aff] flex items-center justify-center text-xs font-bold">4</span>
              <h3 className="text-white font-bold">Settle On-Chain</h3>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
              <div className="relative w-16 h-16 rounded-full flex items-center justify-center">
                <Box size={32} className="text-[#b27aff] relative z-10" />
                <div className="absolute inset-0 border border-[#b27aff]/30 rounded-full scale-110 animate-pulse"></div>
              </div>
              <p className="text-[#a0a6ad] text-sm">
                When time is up, MonCor settles fairly and transparently on-chain.<br/><br/>
                Winners are paid out automatically.
              </p>
            </div>
            <p className="text-[#858b93] text-xs mt-6">Outcomes are verified on-chain. Payouts are instant & immutable.</p>
          </div>
        </section>

        {/* DETAILED PANELS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-4 panels-container">
          
          {/* Left: Mode Details (Takes up 2 columns) */}
          <div className="xl:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* FIXED TIME PANEL */}
            <div className="panel-card bg-[#090d12] border border-[#a9ff24]/30 rounded-xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(169,255,36,0.05)]">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-[#a9ff24]" size={24} />
                <h2 className="text-[#a9ff24] font-bold tracking-widest text-sm">FIXED TIME (RACE MODE)</h2>
              </div>
              <p className="text-[#a0a6ad] text-xs mb-6">Predict where the price will be at the end of a fixed duration.</p>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-[10px] text-[#858b93] mb-2">Select Duration</div>
                  <div className="flex gap-2">
                    <button className="border border-[#a9ff24] bg-[#a9ff24]/10 text-[#a9ff24] px-3 py-1.5 rounded text-xs font-bold">1m</button>
                    <button className="border border-[#1a2026] bg-[#05080b] text-[#858b93] px-3 py-1.5 rounded text-xs">3m</button>
                    <button className="border border-[#1a2026] bg-[#05080b] text-[#858b93] px-3 py-1.5 rounded text-xs">5m</button>
                    <button className="border border-[#1a2026] bg-[#05080b] text-[#858b93] px-3 py-1.5 rounded text-xs">10m</button>
                  </div>
                  
                  <ul className="mt-8 space-y-3 text-xs text-[#a0a6ad]">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a9ff24] mt-1.5 shrink-0"></span>
                      10 lanes move left to right.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a9ff24] mt-1.5 shrink-0"></span>
                      Price starts in the center.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a9ff24] mt-1.5 shrink-0"></span>
                      Where it lands at the finish line determines the winner.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a9ff24] mt-1.5 shrink-0"></span>
                      Best odds are in the middle lanes.
                    </li>
                  </ul>
                </div>
                
                <div className="border border-[#1a2026] bg-[#05080b] p-3 rounded relative">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] text-[#858b93]">Example: 1m Race</span>
                    <span className="text-[8px] tracking-widest text-[#858b93]">FINISH</span>
                  </div>
                  
                  <div className="absolute right-[20px] top-[30px] bottom-[10px] w-px bg-gradient-to-b from-transparent via-[#a9ff24] to-transparent opacity-50 z-0"></div>
                  
                  <div className="flex flex-col gap-1.5 relative z-10">
                    {[0.160, 0.158, 0.156, 0.154, 0.152, 0.150, 0.148, 0.146, 0.144, 0.142].map((price, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px]">
                        <span className={i === 3 ? "text-[#a9ff24] font-bold w-8" : "text-[#858b93] w-8"}>{price.toFixed(3)}</span>
                        <div className="flex-1 h-2 bg-[#11161b] relative rounded overflow-hidden">
                          <div className={`absolute top-0 bottom-0 left-0 ${i === 3 ? 'bg-[#a9ff24] shadow-[0_0_8px_#a9ff24]' : 'bg-[#e5e7eb]'}`} style={{width: `${Math.max(10, 85 - Math.abs(i-3)*15)}%`}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-[#1a2026] flex items-center gap-2">
                <Zap className="text-[#a9ff24]" size={16} />
                <div className="text-xs text-[#a0a6ad]">
                  <strong className="text-[#a9ff24]">Best For:</strong> Quick trades, short-term edge, momentum plays.
                </div>
              </div>
            </div>

            {/* VARIABLE TIME PANEL */}
            <div className="panel-card bg-[#090d12] border border-[#b27aff]/30 rounded-xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(178,122,255,0.05)]">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-[#b27aff]" size={24} />
                <h2 className="text-[#b27aff] font-bold tracking-widest text-sm">VARIABLE TIME (EXACT SECOND)</h2>
              </div>
              <p className="text-[#a0a6ad] text-xs mb-6">Predict the price at an exact second in the future.</p>
              
              <div className="flex justify-between items-end mb-2">
                <div className="text-[10px] text-[#858b93]">Example Odds Matrix (USDC / USD)</div>
                <div className="text-[10px] text-white">Current Price: <strong>$0.1512</strong></div>
              </div>
              
              <div className="border border-[#1a2026] bg-[#05080b] rounded mb-6 overflow-hidden">
                <div className="grid grid-cols-6 border-b border-[#1a2026] bg-[#0c1116]">
                  <div className="p-2 text-[9px] text-[#858b93] border-r border-[#1a2026] flex items-center justify-center text-center leading-tight">PRICE / TIME</div>
                  {['+10s', '+20s', '+30s', '+40s', '+50s', '+60s'].map((t, i) => (
                    <div key={i} className="p-2 text-[10px] text-white text-center">{t}</div>
                  ))}
                </div>
                
                {[
                  { p: '0.160', odds: ['9.20x', '6.80x', '5.40x', '4.50x', '3.90x', '3.50x'] },
                  { p: '0.156', odds: ['5.60x', '4.20x', '3.40x', '2.90x', '2.50x', '2.20x'] },
                  { p: '0.152', odds: ['2.10x', '1.92x', '1.62x', '1.36x', '1.20x', '1.08x'], active: true },
                  { p: '0.148', odds: ['1.72x', '1.42x', '1.22x', '1.06x', '0.94x', '0.88x'] },
                  { p: '0.144', odds: ['1.32x', '1.12x', '0.98x', '0.88x', '0.78x', '0.72x'] }
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-6 border-b border-[#1a2026] last:border-0 ${row.active ? 'bg-[#b27aff]/10 border-y-[#b27aff]/30' : ''}`}>
                    <div className={`p-2 text-[10px] border-r border-[#1a2026] flex items-center justify-center font-mono ${row.active ? 'text-[#b27aff] font-bold' : 'text-[#858b93]'}`}>
                      ${row.p}
                    </div>
                    {row.odds.map((odd, j) => (
                      <div key={j} className={`p-2 text-[10px] text-center font-mono flex items-center justify-center relative ${row.active && j === 0 ? 'text-[#b27aff] font-bold' : 'text-[#a0a6ad]'}`}>
                        {row.active && j === 0 && (
                          <div className="absolute inset-1 border border-[#b27aff] rounded flex items-center justify-center bg-[#b27aff]/20 shadow-[0_0_10px_#b27aff]">
                            {odd} <Target size={8} className="ml-1" />
                          </div>
                        )}
                        {!(row.active && j === 0) && odd}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              
              <div className="mt-auto pt-4 border-t border-[#1a2026] flex items-center gap-2">
                <Target className="text-[#b27aff]" size={16} />
                <div className="text-xs text-[#a0a6ad]">
                  <strong className="text-[#b27aff]">Best For:</strong> Precision plays, mean reversion, event timing.
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Table & FAQ */}
          <div className="flex flex-col gap-6 panel-card">
            
            {/* COMPARISON TABLE */}
            <div className="bg-[#090d12] border border-[#1a2026] rounded-xl p-6">
              <h3 className="text-white font-bold tracking-widest text-sm mb-4 text-center">FIXED TIME VS VARIABLE TIME</h3>
              <div className="border border-[#1a2026] rounded-lg overflow-hidden bg-[#05080b]">
                <div className="grid grid-cols-3 border-b border-[#1a2026] bg-[#0c1116] p-2">
                  <div></div>
                  <div className="text-[#a9ff24] text-[10px] font-bold text-center">Fixed Time</div>
                  <div className="text-[#b27aff] text-[10px] font-bold text-center">Variable Time</div>
                </div>
                
                {[
                  { label: "Time Horizon", icon: Clock, f: "1m, 3m, 5m, 10m", v: "+10s to +60s" },
                  { label: "Selection", icon: Target, f: "Choose a price lane", v: "Choose price + exact second" },
                  { label: "Experience", icon: Flame, f: "Race to the finish", v: "Beat the odds" },
                  { label: "Best For", icon: Zap, f: "Momentum & trends", v: "Precision & timing" },
                  { label: "Risk Profile", icon: ShieldCheck, f: "Lower variance", v: "Higher variance" }
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 border-b border-[#1a2026] p-2 items-center">
                    <div className="flex items-center gap-1.5 text-[9px] text-[#858b93]">
                      <row.icon size={12} /> {row.label}
                    </div>
                    <div className="text-[9px] text-[#a0a6ad] text-center px-1">{row.f}</div>
                    <div className="text-[9px] text-[#a0a6ad] text-center px-1">{row.v}</div>
                  </div>
                ))}
                
                <div className="grid grid-cols-3 p-2 items-center bg-[#11161b]">
                  <div className="flex items-center gap-1.5 text-[9px] text-[#858b93]">
                    <LockKeyhole size={12} /> Settlement
                  </div>
                  <div className="col-span-2 text-[9px] text-white text-center font-bold">
                    On-chain. Transparent. Non-custodial.
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-[#090d12] border border-[#1a2026] rounded-xl p-6 flex-1">
              <h3 className="text-white font-bold tracking-widest text-sm mb-4">FAQ & TIPS</h3>
              <div className="flex flex-col gap-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-[#1a2026] last:border-0">
                    <button 
                      onClick={() => toggleFaq(i)}
                      className="w-full flex items-center justify-between py-3 text-left focus-visible:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        {i === 0 && <ShieldCheck size={16} className="text-[#a9ff24]" />}
                        {i === 1 && <LockKeyhole size={16} className="text-[#a9ff24]" />}
                        {i === 2 && <Zap size={16} className="text-[#a9ff24]" />}
                        {i === 3 && <Target size={16} className="text-[#a9ff24]" />}
                        <span className="text-xs font-bold text-[#e5e7eb]">{faq.q}</span>
                      </div>
                      <ChevronDown size={14} className={`text-[#858b93] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="pb-4 pl-7 pr-2">
                        <p className="text-[#858b93] text-[10px] leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>

        {/* BOTTOM CTA */}
        <section className="panel-card bg-gradient-to-r from-[#090d12] via-[#0d1612] to-[#090d12] border border-[#a9ff24]/20 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(169, 255, 36, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(169, 255, 36, 0.5) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            transform: 'perspective(500px) rotateX(60deg) scale(2)',
            transformOrigin: 'bottom'
          }}></div>
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-14 h-14 rounded-full border border-[#a9ff24] bg-[#a9ff24]/10 flex items-center justify-center text-[#a9ff24] shadow-[0_0_20px_rgba(169,255,36,0.2)]">
              <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 50L35 20L50 80L65 30L80 60" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">Ready to Predict?</h2>
              <p className="text-[#858b93] text-xs">Join thousands of traders racing time and beating the market on MonCor.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
            <Link href="/play" className="flex-1 md:flex-none btn-premium-primary px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 whitespace-nowrap text-sm">
              🚀 Launch MonCor App
            </Link>
            <Link href="#" className="flex-1 md:flex-none btn-premium-secondary px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 whitespace-nowrap text-sm">
              View Markets <span className="ml-2 text-[#858b93]">{'>'}</span>
            </Link>
          </div>
        </section>

      </div>
      
      <Footer />
    </main>
  )
}
