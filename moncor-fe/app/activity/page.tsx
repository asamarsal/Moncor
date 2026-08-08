import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { Activity } from "lucide-react";

export default function ActivityPage() {
  return (
    <main className="terminal-shell flex flex-col min-h-screen">
      <TopBar />
      
      <div className="flex-1 max-w-7xl mx-auto w-full p-8 mt-8">
        <div className="border border-[#1a2026] rounded-xl bg-gradient-to-br from-[#0c1116] to-[#090d12] p-8 min-h-[400px]">
          <div className="flex items-center gap-3 mb-8 border-bottom border-[#1a2026] pb-4">
            <Activity className="text-blue-500" size={24} />
            <h1 className="text-2xl font-bold text-white tracking-tight">Recent Activity</h1>
          </div>
          
          <div className="text-[#a0a6ad] text-sm">
            <p>Activity history will be displayed here...</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
