import { Globe, Shield, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#03060a] border-t border-[#1a2026] text-[#a0a6ad] py-4 px-8 font-sans mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6 items-center md:items-start">
        
        {/* Brand & Desc */}
        <div className="flex-1 max-w-xs">
          <div className="flex items-center gap-2 mb-1.5">
            <Shield className="text-blue-500" size={18} />
            <span className="text-white text-base font-bold tracking-tight">Moncor</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#7a8189]">
            Confidential trading for a more private and fair DeFi future.
          </p>
        </div>

        {/* Links Grid */}
        <div className="flex-[2] flex flex-wrap gap-6 md:gap-12 text-xs">
          <div>
            <h4 className="text-white text-xs font-semibold mb-2">Product</h4>
            <ul className="flex flex-col gap-1.5 text-[11px]">
              <li><a href="#" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">Launch App <span className="text-[9px]">↗</span></a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-semibold mb-2">How It Works</h4>
            <ul className="flex flex-col gap-1.5 text-[11px]">
              <li><a href="#" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Architecture</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Settlement</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-semibold mb-2">Community</h4>
            <ul className="flex flex-col gap-1.5 text-[11px]">
              <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-col gap-1.5 min-w-[180px]">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-[#2a1124] to-[#1e1320] border border-[#3b1d35] cursor-default">
             <div className="bg-white/10 p-1 rounded-md">
               <Terminal size={12} className="text-white" />
             </div>
             <div>
               <div className="text-[8px] uppercase tracking-wider font-bold text-gray-400">Ecosystem</div>
               <div className="text-[11px] text-white font-semibold">Built on Monad</div>
             </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-[#1748d1] to-[#0e329c] border border-[#2b5deb] cursor-default">
             <div className="bg-white/20 p-1 rounded-md">
               <Globe size={12} className="text-white" />
             </div>
             <div>
               <div className="text-[8px] uppercase tracking-wider font-bold text-blue-200">Network</div>
               <div className="text-[11px] text-white font-semibold">Monad Testnet</div>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-4 pt-3 border-t border-[#1a2026] text-center text-[10px] text-[#5e656d]">
        © 2026 Moncor. All rights reserved. | Powered by Monad Network
      </div>
    </footer>
  )
}
