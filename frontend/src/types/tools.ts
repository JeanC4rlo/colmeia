import { BanIcon, ListTodoIcon, type LucideIcon } from "lucide-react";
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
    type: "tasks",
    name: "Tarefas",
    description: "Crie uma nova tarefa.",
    icon: ListTodoIcon,
    tile: "tasks"
  },
  {
    type: "empty",
    name: "Tile Vazio",
    description: "Tile vazio para preencher espaços ou criar divisões.",
    icon: BanIcon,
    tile: "empty"
  },
];
