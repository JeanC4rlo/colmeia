import { useRef, useState } from "react";
import type { Branch, Tile, Workspace } from "../types/tiling";
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
  const { root, focusedTileId } = workspace;

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleWorkspaceDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (root !== null) return;

    const tileType = event.dataTransfer.getData("tile-type") || event.dataTransfer.getData("text/plain");
    if (!tileType) return;

    setWorkspace((current) => ({
      ...current,
      root: {
        id: crypto.randomUUID(),
        type: "leaf",
        tile: {
          id: crypto.randomUUID(),
          type: tileType as Tile["type"],
        },
      },
    }));
  };

  const handleTileDrop = (
    targetLeafId: string,
    position: DropPosition,
    tileType: Tile["type"],
    sourceLeafId?: string
  ) => {
    setWorkspace((current) => {
      if (!current.root) return current;
      if (sourceLeafId === targetLeafId) return current;

      let updatedRoot: Branch | null = insertTile(
        current.root,
        targetLeafId,
        {
          id: crypto.randomUUID(),
          type: tileType,
        },
        position
      );

      if (sourceLeafId && updatedRoot) {
        updatedRoot = removeTile(updatedRoot, sourceLeafId);
      }

      return {
        ...current,
        root: updatedRoot,
      };
    });
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

  const handleTileClick = (leafId: string) => {
    setWorkspace((current) => ({
      ...current,
      focusedTileId: leafId,
    }));
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
            focusedTileId={focusedTileId}
            onDrop={handleTileDrop}
            onClose={handleTileClose}
            onClick={handleTileClick}
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