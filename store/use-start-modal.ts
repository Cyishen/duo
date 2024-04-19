import { create } from "zustand";

type StartModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useStartModal = create<StartModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
