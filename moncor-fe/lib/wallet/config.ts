import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { localhost, monadTestnet } from 'wagmi/chains';

const anvilLocalhost = {
  ...localhost,
  id: 10143, // Forcing monad testnet chain id for local anvil
};

export const config = getDefaultConfig({
  appName: 'Moncor / MonBeat',
  projectId: 'YOUR_PROJECT_ID', // Replace if actually deploying
  chains: [anvilLocalhost, monadTestnet],
  ssr: true,
});
