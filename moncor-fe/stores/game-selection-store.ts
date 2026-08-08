import { create } from 'zustand';
import { WagerMode } from '../schemas/wager';

interface GameSelectionState {
  mode: WagerMode;
  horizon: string | number;
  selection: string;
  wagerAmount: string;
  locked: boolean;
  secondsRemaining: number;
  
  setMode: (mode: WagerMode) => void;
  setHorizon: (horizon: string | number) => void;
  setSelection: (selection: string) => void;
  setWagerAmount: (amount: string) => void;
  setLocked: (locked: boolean) => void;
  setSecondsRemaining: (seconds: number) => void;
  reset: () => void;
}

export const useGameSelectionStore = create<GameSelectionState>((set) => ({
  mode: 'fixed',
  horizon: 'PT1M', // default 1 minute for fixed
  selection: '',
  wagerAmount: '50', // Default 50 MON
  locked: false,
  secondsRemaining: 0,
  
  setMode: (mode) => set({ mode, selection: '', locked: false }),
  setHorizon: (horizon) => set({ horizon }),
  setSelection: (selection) => set({ selection }),
  setWagerAmount: (wagerAmount) => set({ wagerAmount }),
  setLocked: (locked) => set({ locked }),
  setSecondsRemaining: (seconds) => set({ secondsRemaining: seconds }),
  reset: () => set((state) => ({ 
    selection: '', 
    locked: false,
    horizon: state.mode === 'fixed' ? 'PT1M' : 10,
    secondsRemaining: 0
  })),
}));
