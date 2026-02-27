import type { ReactNode } from "react";
import { Header } from "./Header";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pt-[calc(env(safe-area-inset-top)+3.5rem)]">
        {children}
      </main>
    </div>
  );
}
