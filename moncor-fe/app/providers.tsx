'use client'

import * as React from 'react'
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme
} from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css'

const monadTestnet = {
  id: 10143,
  name: 'Monad Testnet',
  iconUrl: 'https://monad.xyz/favicon.ico',
  nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz/'] },
  },
  blockExplorers: {
    default: { name: 'Monad Explorer', url: 'https://testnet.monadexplorer.com/' },
  },
} as const;

const monadMainnet = {
  id: 20143,
  name: 'Monad',
  iconUrl: 'https://monad.xyz/favicon.ico',
  nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.monad.xyz/'] },
  },
} as const;

import { localhost } from 'wagmi/chains'

const anvilLocalhost = {
  ...localhost,
  id: 10143, // Align with Monad Testnet id for local testing
} as const;

const config = getDefaultConfig({
  appName: 'MonCor',
  projectId: 'YOUR_PROJECT_ID',
  chains: [anvilLocalhost, monadTestnet, monadMainnet],
  ssr: true,
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: '#1fa2ff',
          accentColorForeground: 'white',
          borderRadius: 'small',
        })}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
