import { useState, type DragEvent } from "react";
import type { Branch, Tile } from "../types/tiling";
import { getDropPosition, type DropPosition } from "../utils/tiling";
import { TileView } from "./TileView";
import { BranchView } from "./BranchView";

type BranchTreeRendererProps = {
  root: Branch;
  onDrop?: (leafId: string, position: DropPosition, tileType: Tile["type"]) => void;
  onClose?: (leafId: string) => void;
};

export const BranchTreeRenderer = ({
  root,
  onDrop,
  onClose,
}: BranchTreeRendererProps) => {
  const [activeDropPosition, setActiveDropPosition] = useState<DropPosition | null>(null);

  if (root.type === "split") {
    return <BranchView branch={root} onDrop={onDrop} onClose={onClose} />;
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";

    const position = getDropPosition(event);
    setActiveDropPosition(position);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveDropPosition(null);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveDropPosition(null);
    
    const rawType = event.dataTransfer.getData("tile-type");
    if (!rawType || !onDrop) return;

    const tileType = rawType as Tile["type"];

    const position = getDropPosition(event);
    onDrop(root.id, position, tileType);
  };

  return (
    <div
      className="relative h-full w-full"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <TileView tile={root.tile} onClose={() => onClose?.(root.id)} />

      {activeDropPosition && (
        <div
          className={`pointer-events-none absolute z-10 border-2 border-amber-500 bg-amber-500/30 transition-all ${getHighlightClasses(
            activeDropPosition
          )}`}
        />
      )}
    </div>
  );
};

const getHighlightClasses = (position: DropPosition): string => {
  switch (position) {
    case "left":
      return "top-0 left-0 bottom-0 w-1/2";
    case "right":
      return "top-0 right-0 bottom-0 w-1/2";
    case "top":
      return "top-0 left-0 right-0 h-1/2";
    case "bottom":
      return "bottom-0 left-0 right-0 h-1/2";
    case "center":
      return "inset-0";
  }
};