import type { Task } from "../../../types/tasks"
import { CalendarIcon } from "lucide-react";
import { formatTaskDate } from "../utils/date";

interface TaskItemProps {
    task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
    const now = new Date();
    const isLate = task.deadline
        ? new Date(task.deadline).getTime() - now.getTime() < 0
        : false;

    console.log(now, task.deadline, isLate);

    return (
        <div className="border-2 rounded-lg p-4">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    {task.title ? (
                        <span className="font-bold text-md">{task.title}</span>
                    ) : (
                        <span className="font-bold text-md text-gray-500">Tarefa não nomeada</span>
                    )}

                    {task.description ? (
                        <span className="text-sm">{task.description}</span>
                    ) : (
                        <span className="italic text-sm text-gray-500">Sem descrição.</span>
                    )}
                </div>

                {task.deadline ? (
                    <div className={`flex gap-2 items-center ${isLate ? "text-red-500 font-medium" : "text-black"}`}>
                        <CalendarIcon size={16} />
                        <span className="text-sm">{formatTaskDate(task.deadline)}</span>
                    </div>
                ) : (
                    <div className="flex gap-2 items-center text-gray-500">
                        <CalendarIcon size={16} />
                        <span className="text-sm italic">Sem data</span>
                    </div>
                )}
            </div>

            {task.description ? <span>{task.description}</span> : null}
        </div>
    )
}
