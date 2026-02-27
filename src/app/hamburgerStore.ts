import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authControllerAuthenticateCustomer, type Session } from "../api/generated";

type HamburgerStoreTypes = {
    accessToken: string | null;
    error: string | null;
    login: (phone: string) => Promise<void>;
    logout: () => void;
};

export const hamburgerStore = create<HamburgerStoreTypes>()(
    persist(
        (set) => ({
            accessToken: null,
            error: null,

            login: async (phone: string) => {
                try {
                    const response = await authControllerAuthenticateCustomer({ phone });
                    const token = (response.data as unknown as Session).token;

                    set({ accessToken: token, error: null });
                }
                catch (err: any) {
                    const errorMessage =
                        err?.response?.data?.description ||
                        err?.response?.data?.message ||
                        err?.message ||
                        "Login error";

                    set({ error: errorMessage, accessToken: null });
                }
            },

            logout: () => set({ accessToken: null }),
        }),
        { name: "HamburgerStore" }
    )
);
