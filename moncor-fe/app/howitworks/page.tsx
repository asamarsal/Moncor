import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { Zap } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <main className="terminal-shell flex flex-col min-h-screen">
      <TopBar />
      
      <div className="flex-1 max-w-7xl mx-auto w-full p-8 mt-8">
        <div className="border border-[#1a2026] rounded-xl bg-gradient-to-br from-[#0c1116] to-[#090d12] p-8 min-h-[400px]">
          <div className="flex items-center gap-3 mb-8 border-bottom border-[#1a2026] pb-4">
            <Zap className="text-[#a9ff24]" size={24} />
            <h1 className="text-2xl font-bold text-white tracking-tight">How It Works</h1>
          </div>
          
          <div className="text-[#a0a6ad] text-sm leading-relaxed max-w-2xl">
            <h2 className="text-white font-semibold mb-2">1. Connect your wallet</h2>
            <p className="mb-6">Connect your Monad compatible wallet to start placing predictions.</p>
            
            <h2 className="text-white font-semibold mb-2">2. Choose your game mode</h2>
            <p className="mb-6">Select between Fixed Time (predict price at a specific duration) or Variable Time (predict the multiplier survival).</p>
            
            <h2 className="text-white font-semibold mb-2">3. Lock Prediction</h2>
            <p className="mb-6">Enter your bet amount in MON and lock your prediction on the blockchain.</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
