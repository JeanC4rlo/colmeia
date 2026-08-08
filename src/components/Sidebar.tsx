import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tools, type Tool } from "../types/tools";

type SidebarProps = {
    collapsed: boolean;
    onCollapse: () => void;
};

export const Sidebar = ({ collapsed, onCollapse }: SidebarProps) => {
    const [draggingTool, setDraggingTool] = useState<string | null>(null);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, tool: Tool) => {
        const preview = event.currentTarget.cloneNode(true) as HTMLDivElement;

        document.body.appendChild(preview);

        event.dataTransfer.setDragImage(preview, preview.offsetWidth / 2, preview.offsetHeight / 2);
        event.dataTransfer.setData("tile-type", tool.tile);
        event.dataTransfer.effectAllowed = "copy";

        setDraggingTool(tool.type);

        requestAnimationFrame(() => {
            preview.remove();
        });
    };

    const handleDragEnd = () => {
        setDraggingTool(null);
    };

    return (
        <aside className={`relative flex h-full flex-col gap-2 justify-center ${collapsed ? "w-0" : "px-6 border-1 border-dashed border-gray-300"}`}>
            {!collapsed &&
                tools.map((tool) => {
                    const Icon = tool.icon;
                    const dragging = draggingTool === tool.type;

                    return (
                        <div
                            key={tool.type}
                            draggable
                            onDragStart={(event) => handleDragStart(event, tool)}
                            onDragEnd={handleDragEnd}
                            className={`box-border flex h-10 w-10 items-center justify-center rounded-lg border p-2 text-white ${dragging ? "border-dashed border-gray-300 bg-transparent" : "border-transparent bg-black"} hover:cursor-pointer`}
                        >
                            <Icon size={20} />
                        </div>
                    );
                })}

            <div className={`absolute bottom-0 top-0 flex items-center ${collapsed ? "left-0" : "-right-3.5"}`}>
                <button type="button" onClick={onCollapse} className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-100 hover:text-black" aria-label={collapsed ? "Abrir sidebar" : "Fechar sidebar"}>
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>
        </aside>
    );
};