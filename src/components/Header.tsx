import type { CSSProperties } from "react";
import { Maximize2Icon, MinimizeIcon, XIcon } from "lucide-react";

import { Logo } from "./Logo";

export const Header = () => {
  const isElectron = !!window.electronAPI;

  return (
    <header
      style={{
        WebkitAppRegion: "drag",
        cursor: "move",
      } as CSSProperties}
      className="flex justify-between items-center h-16 px-4 shadow-sm"
    >
      <div className="flex items-center h-full py-2">
        <Logo />
      </div>

      {isElectron && (
        <div
          style={{ WebkitAppRegion: "no-drag" } as CSSProperties}
          className="flex self-stretch -mr-4"
        >
          <button
            className="px-4 hover:bg-amber-400"
            onClick={() => window.electronAPI?.minimize()}
            aria-label="Minimizar"
          >
            <MinimizeIcon size={18} />
          </button>

          <button
            className="px-4 hover:bg-amber-400"
            onClick={() => window.electronAPI?.maximize()}
            aria-label="Maximizar"
          >
            <Maximize2Icon size={18} />
          </button>

          <button
            className="px-4 hover:bg-red-400 hover:text-white"
            onClick={() => window.electronAPI?.close()}
            aria-label="Fechar"
          >
            <XIcon size={18} />
          </button>
        </div>
      )}
    </header>
  );
};
