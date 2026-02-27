import { IconBell, IconUser } from "@tabler/icons-react";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="glass-header pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex h-14 max-w-[420px] items-center justify-between px-4">
          <div className="text-sm leading-snug text-white/90">
            Южно-Сахалинск
            <br />
            проспект Гагарина, 12
          </div>
          <div className="flex items-center gap-3 text-black">
            <button
              className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full p-0 bg-white/90 shadow-sm border border-white/70 transition active:bg-white/80 active:shadow-inner transform-gpu origin-center active:scale-95"
              aria-label="Notifications"
            >
              <IconBell size={18} stroke={1.6} />
            </button>
            <button
              className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full p-0 bg-white/90 shadow-sm border border-white/70 transition active:bg-white/80 active:shadow-inner transform-gpu origin-center active:scale-95"
              aria-label="Profile"
            >
              <IconUser size={18} stroke={1.6} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
