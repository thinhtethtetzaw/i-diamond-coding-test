import { create } from "zustand";

type UiState = {
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  isMenuOpen: false,
  setMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
}));
