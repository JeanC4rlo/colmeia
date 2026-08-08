import type { Tile } from "../types/tiling";
import { EmptyTileView } from "./tiles/EmptyTileView";
import { XIcon } from "lucide-react";

type TileViewProps = {
  tile: Tile;
  onClose?: (tileId: string) => void;
};

export const TileView = ({ tile, onClose }: TileViewProps) => {
  return (
    <div className="w-full h-full border border-dashed border-gray-300 flex flex-col rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b border-gray-200">
        <span className="text-sm font-semibold capitalize text-gray-700">
          {tile.type}
        </span>
        <button
          onClick={() => onClose?.(tile.id)}
          className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded p-1 text-xs transition-colors hover:cursor-pointer"
        >
          <XIcon />
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