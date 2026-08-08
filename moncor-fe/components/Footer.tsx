import { Globe, Shield, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#03060a] border-t border-[#1a2026] text-[#a0a6ad] py-6 px-8 font-sans mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        
        {/* Brand & Desc */}
        <div className="flex-1 max-w-sm">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="text-blue-500" size={20} />
            <span className="text-white text-lg font-bold tracking-tight">Moncor</span>
          </div>
          <p className="text-xs leading-relaxed text-[#7a8189]">
            Confidential trading for a more private and fair DeFi future, protecting your orders with Monad Confidential Compute.
          </p>
        </div>

        {/* Links Grid */}
        <div className="flex-[2] flex flex-wrap gap-8 md:gap-16">
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Product</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">Launch App <span className="text-[9px]">↗</span></a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">How It Works</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Architecture</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Settlement</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Community</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-col gap-2 min-w-[200px]">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-[#2a1124] to-[#1e1320] border border-[#3b1d35] cursor-default">
             <div className="bg-white/10 p-1 rounded-md">
               <Terminal size={14} className="text-white" />
             </div>
             <div>
               <div className="text-[8px] uppercase tracking-wider font-bold text-gray-400">Ecosystem</div>
               <div className="text-xs text-white font-semibold">Built on Monad</div>
             </div>
          </div>
          
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-[#1748d1] to-[#0e329c] border border-[#2b5deb] cursor-default">
             <div className="bg-white/20 p-1 rounded-md">
               <Globe size={14} className="text-white" />
             </div>
             <div>
               <div className="text-[8px] uppercase tracking-wider font-bold text-blue-200">Network</div>
               <div className="text-xs text-white font-semibold">Monad Testnet</div>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-[#1a2026] text-center text-[10px] text-[#5e656d]">
        © 2026 Moncor. All rights reserved. | Powered by Monad Network
      </div>
    </footer>
  )
}
