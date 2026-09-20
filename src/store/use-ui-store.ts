import { create } from "zustand";

type UiState = {
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  isMenuOpen: false,
  isSearchOpen: false,
  setMenuOpen: (isMenuOpen) => set({ isMenuOpen, isSearchOpen: false }),
  setSearchOpen: (isSearchOpen) => set({ isSearchOpen, isMenuOpen: false }),
}));
