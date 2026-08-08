import type { Branch, LeafBranch, Tile } from "../types/tiling";

export type DropPosition = "center" | "left" | "right" | "top" | "bottom";

export const createTile = (type: Tile["type"]): Tile => {
    return {
        id: crypto.randomUUID(),
        type,
    } as Tile;
};

export const createLeaf = (tile: Tile): LeafBranch => {
    return {
        id: crypto.randomUUID(),
        type: "leaf",
        tile,
    };
};

export const getDropPosition = (event: React.DragEvent): DropPosition => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const horizontal = x / rect.width;
    const vertical = y / rect.height;

    const edgeThreshold = 0.45;

    if (horizontal < edgeThreshold) {
        return "left";
    }

    if (horizontal > 1 - edgeThreshold) {
        return "right";
    }

    if (vertical < edgeThreshold) {
        return "top";
    }

    if (vertical > 1 - edgeThreshold) {
        return "bottom";
    }

    return "center";
};

export const insertTile = (
    branch: Branch | null,
    targetLeafId: string | null,
    tile: Tile,
    position: DropPosition,
): Branch => {
    if (!branch || !targetLeafId) {
        return createLeaf(tile);
    }

    if (branch.type === "leaf") {
        if (branch.id !== targetLeafId) {
            return branch;
        }

        if (position === "center") {
            return {
                ...branch,
                tile,
            };
        }

        return splitLeaf(branch, tile, position);
    }

    const leftChild = insertTile(branch.children[0], targetLeafId, tile, position);
    const rightChild = insertTile(branch.children[1], targetLeafId, tile, position);

    if (leftChild === branch.children[0] && rightChild === branch.children[1]) {
        return branch;
    }

    return {
        ...branch,
        children: [leftChild, rightChild],
    };
};

// utils/tiling.ts

export const removeTile = (
  branch: Branch | null,
  targetLeafId: string
): Branch | null => {
  if (!branch) return null;

  if (branch.type === "leaf") {
    return branch.id === targetLeafId ? null : branch;
  }

  const [left, right] = branch.children;

  if (left.type === "leaf" && left.id === targetLeafId) {
    return right;
  }

  if (right.type === "leaf" && right.id === targetLeafId) {
    return left;
  }

  const newLeft = removeTile(left, targetLeafId);
  const newRight = removeTile(right, targetLeafId);

  if (!newLeft) return newRight;
  if (!newRight) return newLeft;

  return {
    ...branch,
    children: [newLeft, newRight],
  };
};

const splitLeaf = (
    branch: LeafBranch,
    tile: Tile,
    position: Exclude<DropPosition, "center">,
): Branch => {
    const newLeaf = createLeaf(tile);

    const horizontal = position === "left" || position === "right";

    const first = position === "left" || position === "top"
        ? newLeaf
        : branch;

    const second = position === "left" || position === "top"
        ? branch
        : newLeaf;

    return {
        id: crypto.randomUUID(),
        type: "split",
        direction: horizontal ? "horizontal" : "vertical",
        ratio: 0.5,
        children: [first, second],
    };
};