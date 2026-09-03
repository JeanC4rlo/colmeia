import { useRef, useState } from "react";
import type { SplitBranch, Tile } from "../types/tiling";
import type { DropPosition } from "../utils/tiling";
import { BranchTreeRenderer } from "./BranchTreeRenderer";
import { Separator } from "./Separator";

type BranchViewProps = {
  branch: SplitBranch;
  focusedTileId?: string | null;
  onRatioChange?: (newRatio: number) => void;
  onDrop?: (
    leafId: string,
    position: DropPosition,
    tileType: Tile["type"],
    sourceLeafId?: string
  ) => void;
  onClose?: (leafId: string) => void;
  onClick?: (leafId: string) => void;
};

export const BranchView = ({
  branch,
  focusedTileId,
  onRatioChange,
  onDrop,
  onClose,
  onClick,
}: BranchViewProps) => {
  const { direction, ratio: initialRatio, children } = branch;
  const [ratio, setRatio] = useState(initialRatio ?? 0.5);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = (newRatio: number) => {
    setRatio(newRatio);
    onRatioChange?.(newRatio);
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex h-full w-full ${
        direction === "horizontal" ? "flex-row" : "flex-col"
      }`}
    >
      <div className="flex min-h-0 min-w-0 overflow-hidden" style={{ flex: ratio }}>
        <BranchTreeRenderer
          root={children[0]}
          focusedTileId={focusedTileId}
          onDrop={onDrop}
          onClose={onClose}
          onClick={onClick}
        />
      </div>

      <Separator
        direction={direction}
        containerRef={containerRef}
        onResize={handleResize}
      />

      <div className="flex min-h-0 min-w-0 overflow-hidden" style={{ flex: 1 - ratio }}>
        <BranchTreeRenderer
          root={children[1]}
          focusedTileId={focusedTileId}
          onDrop={onDrop}
          onClose={onClose}
          onClick={onClick}
        />
      </div>
    </div>
  );
};
