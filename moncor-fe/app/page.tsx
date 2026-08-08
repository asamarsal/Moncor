import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="terminal-shell flex flex-col min-h-screen">
      <TopBar />
      {/* Konten utama bisa diletakkan di sini nantinya */}
      <div className="flex-1"></div>
      <Footer />
    </main>
  );
}
