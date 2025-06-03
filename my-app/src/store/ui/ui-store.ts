import { create } from 'zustand'

//creamos un estado
interface State {
    isSideMenuOpen: boolean;

    openSideMenu: () => void;
    closeSideMenu: () => void;
}

export const useUIStore = create<State>()((set) => ({
    isSideMenuOpen: false,

    openSideMenu: () => set({ isSideMenuOpen: true }),
    closeSideMenu: () => set({ isSideMenuOpen: false }),
}))
