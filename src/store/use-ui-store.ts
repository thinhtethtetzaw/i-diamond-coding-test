import { create } from "zustand";

export type Toast = { id: number; type: "success" | "error"; title: string; message: string };

type UiState = {
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  toasts: Toast[];
  setMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  showToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
};

let nextToastId = 1;

export const useUiStore = create<UiState>((set) => ({
  isMenuOpen: false,
  isSearchOpen: false,
  toasts: [],
  setMenuOpen: (isMenuOpen) => set({ isMenuOpen, isSearchOpen: false }),
  setSearchOpen: (isSearchOpen) => set({ isSearchOpen, isMenuOpen: false }),
  showToast: (toast) => set((state) => ({ toasts: [...state.toasts, { ...toast, id: nextToastId++ }] })),
  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));
