import { create } from 'zustand';

interface UIState {
  isMobileDrawerOpen: boolean;
  toggleMobileDrawer: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileDrawerOpen: false,
  toggleMobileDrawer: () => set((state) => ({ isMobileDrawerOpen: !state.isMobileDrawerOpen })),
}));
