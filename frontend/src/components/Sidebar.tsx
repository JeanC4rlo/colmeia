import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tools, type Tool } from "../types/tools";

type SidebarProps = {
  collapsed: boolean;
  onCollapse: () => void;
};

export const Sidebar = ({ collapsed, onCollapse }: SidebarProps) => {
  const [draggingTool, setDraggingTool] = useState<string | null>(null);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    tool: Tool
  ) => {
    const preview = event.currentTarget.cloneNode(true) as HTMLDivElement;

    document.body.appendChild(preview);

    event.dataTransfer.setDragImage(
      preview,
      preview.offsetWidth / 2,
      preview.offsetHeight / 2
    );

    event.dataTransfer.clearData();
    event.dataTransfer.setData("tile-type", tool.tile);
    event.dataTransfer.effectAllowed = "copyMove";

    setDraggingTool(tool.type);

    requestAnimationFrame(() => {
      preview.remove();
    });
  };

  const handleDragEnd = () => {
    setDraggingTool(null);
  };

  return (
    <aside
      className={`relative flex h-full flex-col gap-2 justify-center ${
        collapsed ? "w-0" : "px-6 border-r border-dashed border-gray-300"
      }`}
    >
      {!collapsed &&
        tools.map((tool) => {
          const Icon = tool.icon;
          const dragging = draggingTool === tool.type;

          return (
            <div key={tool.type} className="relative flex items-center group">
              <div
                draggable
                onDragStart={(event) => handleDragStart(event, tool)}
                onDragEnd={handleDragEnd}
                className={`box-border rounded-sm flex h-11 w-11 aspect-square items-center justify-center p-2 text-white transition-transform duration-200 hover:scale-105 ${
                  dragging ? "bg-gray-400 opacity-50" : "bg-black"
                } hover:cursor-pointer`}
              >
                <Icon size={18} />
              </div>

              <div className="pointer-events-none absolute left-full ml-3 z-20 hidden rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white shadow-md group-hover:block group-active:hidden whitespace-nowrap capitalize">
                {tool.type}
              </div>
            </div>
          );
        })}

      <div
        className={`absolute bottom-0 top-0 flex items-center ${
          collapsed ? "left-0" : "-right-3.5"
        }`}
      >
        <button
          type="button"
          onClick={onCollapse}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-100 hover:text-black"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
};
