import { create } from "zustand";
import { persist } from "zustand/middleware";

type HamburgerStoreTypes = {
    accessToken: string | null;
    error: string | null;
    login: (token: string) => void;
    logout: () => void;
};

export const hamburgerStore = create<HamburgerStoreTypes>()(
    persist(
        (set) => ({
            accessToken: null,
            error: null,

            login: (token: string) => {
                set({ accessToken: token, error: null });
            },

            logout: () => set({ accessToken: null }),
        }),
        { name: "HamburgerStore" }
    )
);

export const useHamburgerStore = hamburgerStore;
