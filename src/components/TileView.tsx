import type { Tile } from "../types/tiling";
import { tools } from "../types/tools";
import { ChatbotTileView } from "./tiles/ChatbotTileView";
import { XIcon } from "lucide-react";

type TileViewProps = {
  tile: Tile;
  focused?: boolean;
  onClose?: (tileId: string) => void;
  onClick?: (tileId: string) => void;
};

export const TileView = ({ tile, focused = false, onClose, onClick }: TileViewProps) => {
  const tool = tools.find((t) => t.tile === tile.type);
  const Icon = tool?.icon;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("tile-type", tile.type);
    e.dataTransfer.setData("source-leaf-id", tile.id);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      onClickCapture={() => onClick?.(tile.id)}
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-lg border bg-white border-2
        ${focused ? "border-solid border-amber-500" : "border-dashed border-gray-300"}`}
    >
      <div className="absolute inset-0 pointer-events-none z-0" onClickCapture={() => onClick?.(tile.id)} />

    <div
      draggable={true}
      onDragStart={handleDragStart}
        className="z-10 flex items-center justify-between border-b border-gray-200 bg-gray-100 px-3 py-2 select-none cursor-grab active:cursor-grabbing"
    >
        <div className="flex items-center gap-2 text-gray-700 pointer-events-none">
          {Icon && <Icon size={16} />}
          <span className="text-sm font-semibold capitalize">{tile.type}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose?.(tile.id);
          }}
          className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded p-1 text-xs transition-colors hover:cursor-pointer"
        >
          <XIcon size={16} />
        </button>
      </div>

      <div 
        className="relative z-10 flex-1 p-2 overflow-y-auto"
        draggable={true}
        onDragStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {(() => {
          switch (tile.type) {
            case "empty":
              return <EmptyTileView />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};
