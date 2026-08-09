import { BanIcon, type LucideIcon } from "lucide-react";
import type { Tile } from "./tiling";

export type Tool = {
  type: string;
  name: string;
  description: string;
  icon: LucideIcon;
  tile: Tile["type"];
};

export const tools: Tool[] = [
  {
    type: "test",
    name: "Teste",
    description: "Ferramenta de teste para a criação de uma tiling view",
    icon: BanIcon,
    tile: "empty"
  },
];