export type SplitBranch = {
  id: string;
  type: "split";
  direction: "horizontal" | "vertical";
  ratio: number;
  children: [Branch, Branch];
};

export type LeafBranch = {
  id: string;
  type: "leaf";
  tile: Tile;
};

export type Branch =
  | SplitBranch
  | LeafBranch;

export type EmptyTile = {
  id: string;
  type: "empty";
};

export type ChatbotTile = {
  id: string;
  type: "chatbot";
}

export type Tile = | EmptyTile
                   | ChatbotTile;

type Sidebar = {
  collapsed: boolean;
}

export type Workspace = {
  root: Branch | null;
  focusedTileId: string | null;
  sidebar: Sidebar;
};
