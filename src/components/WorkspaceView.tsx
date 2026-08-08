import { useRef, useState } from "react";
import type { Tile, Workspace } from "../types/tiling";
import { insertTile, removeTile, type DropPosition } from "../utils/tiling";
import { BranchTreeRenderer } from "./BranchTreeRenderer";

export const WorkspaceView = () => {
  const [workspace, setWorkspace] = useState<Workspace>({
    root: null,
    focusedTileId: null,
    sidebar: {
      collapsed: false,
    },
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { root } = workspace;

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleWorkspaceDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (root !== null) return;

    const tileType = event.dataTransfer.getData("tile-type");
    if (!tileType) return;

    setWorkspace((current) => ({
      ...current,
      root: {
        id: crypto.randomUUID(),
        type: "leaf",
        tile: {
          id: crypto.randomUUID(),
          type: tileType as "empty",
        },
      },
    }));
  };

  const handleTileDrop = (
    leafId: string,
    position: DropPosition,
    tileType: Tile["type"],
  ) => {
    setWorkspace((current) => ({
      ...current,
      root: insertTile(
        current.root,
        leafId,
        {
          id: crypto.randomUUID(),
          type: tileType
        },
        position,
      ),
    }));
  };

  const handleTileClose = (leafId: string) => {
    setWorkspace((current) => {
      if (!current.root) return current;

      return {
        ...current,
        root: removeTile(current.root, leafId),
      };
    });
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden"
      onDragOver={handleDragOver}
      onDrop={handleWorkspaceDrop}
    >
      {root ? (
        <div className="h-full w-full">
          <BranchTreeRenderer
            root={root}
            onDrop={handleTileDrop}
            onClose={handleTileClose}
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-gray-300">
          <div className="text-center">
            <p className="text-lg font-semibold">Arraste e solte</p>

            <p className="mt-1 text-sm text-gray-500">
              Arraste uma ferramenta na sidebar para o workspace
              <br />
              para adicionar um tile
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
