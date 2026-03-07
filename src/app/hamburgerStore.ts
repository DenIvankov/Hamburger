import { create } from "zustand";
import { persist } from "zustand/middleware";

type HamburgerStoreTypes = {
    accessToken: string | null;
    error: string | null;
    isComfirm: boolean;
    login: (token: string) => void;
    logout: () => void;
    setConfirm: (value: boolean) => void;
    setAccessToken: (token: string) => void;
};

export const hamburgerStore = create<HamburgerStoreTypes>()(
    persist(
        (set) => ({
            accessToken: null,
            error: null,
            isComfirm: false,

            login: (token: string) => {
                // При логине всегда сбрасываем isComfirm
                set({ accessToken: token, error: null, isComfirm: false });
            },

            logout: () => {
                // Очищаем localStorage для хранилища
                localStorage.removeItem('HamburgerStore');
                set({ accessToken: null, isComfirm: false, error: null });
            },

            setConfirm: (value: boolean) => {
                set({ isComfirm: value });
            },

            setAccessToken: (token: string) => {
                set({ accessToken: token });
            },
        }),
        { name: "HamburgerStore" }
    )
);

export const useHamburgerStore = hamburgerStore;
