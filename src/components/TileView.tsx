import type { Tile } from "../types/tiling";
import { tools } from "../types/tools";
import { EmptyTileView } from "./tiles/EmptyTileView";
import { XIcon } from "lucide-react";

type TileViewProps = {
  tile: Tile;
  onClose?: (tileId: string) => void;
  onClick?: (tileId: string) => void;
};

export const TileView = ({ tile, onClose, onClick }: TileViewProps) => {
  const tool = tools.find((t) => t.tile === tile.type);
  const Icon = tool?.icon;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("tile-type", tile.type);
    e.dataTransfer.setData("source-leaf-id", tile.id);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      onClick={() => onClick?.(tile.id)}
      className="w-full h-full border border-dashed border-gray-300 flex flex-col rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b border-gray-200 select-none">
        <div className="flex items-center gap-2 text-gray-700">
          {Icon && <Icon size={16} />}
          <span className="text-sm font-semibold capitalize">
            {tile.type}
          </span>
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

      <div className="flex-1 p-2">
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