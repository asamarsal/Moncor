import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moncor",
  description: "Monad gacor gambling dapps",
};

import { Providers } from './providers';
import { TelemetryProvider } from '@/components/providers/telemetry-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <TelemetryProvider>
            {children}
          </TelemetryProvider>
        </Providers>
      </body>
    </html>
  );
}
