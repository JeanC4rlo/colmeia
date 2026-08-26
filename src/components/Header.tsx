import { useEffect, useState, type CSSProperties } from "react";
import { Maximize2Icon, MinimizeIcon, XIcon } from "lucide-react";
import { Logo } from "./Logo";

export const Header = () => {
  const isElectron = !!window.electronAPI;
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  useEffect(() => {
    if (!window.electronAPI) return;

    window.electronAPI.isMaximized().then(setIsMaximized);

    const unsubscribe = window.electronAPI.onMaximizedChange?.((maximized) => {
      setIsMaximized(maximized);
    });

    return () => unsubscribe?.();
  }, []);

  const handleToggleMaximize = () => {
    window.electronAPI?.maximize();
  };

  return (
    <header
      style={{ WebkitAppRegion: "drag" } as CSSProperties}
      className={`flex ${isElectron ? "justify-between" : "justify-center"} items-center h-16 px-4 shadow-sm select-none`}
      onDoubleClick={handleToggleMaximize}
    >
      <div
        style={{ WebkitAppRegion: "no-drag" } as CSSProperties}
        className="flex items-center h-full py-2"
      >
        <Logo />
      </div>

      {isElectron && (
        <div
          style={{ WebkitAppRegion: "no-drag" } as CSSProperties}
          className="flex self-stretch -mr-4"
        >
          <button
            type="button"
            className="px-4 cursor-pointer hover:bg-amber-400 flex items-center justify-center transition-colors"
            onClick={() => window.electronAPI?.minimize()}
            aria-label="Minimizar"
          >
            <MinimizeIcon size={18} />
          </button>

          <button
            type="button"
            className="px-4 cursor-pointer hover:bg-amber-400 flex items-center justify-center transition-colors"
            onClick={handleToggleMaximize}
            aria-label={isMaximized ? "Restaurar" : "Maximizar"}
          >
            <Maximize2Icon size={18} />
          </button>

          <button
            type="button"
            className="px-4 cursor-pointer hover:bg-red-400 hover:text-white flex items-center justify-center transition-colors"
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