import { useEffect } from "react";
import { useTask } from "../../providers/TaskProvider";
import { Button } from "../Button";

export const TaskView = () => {
    const { createTask, refreshTasks, tasks } = useTask();

    useEffect(() => {
        refreshTasks();
    }, [refreshTasks]);
  
    return (
        <div className="flex flex-col h-full p-4">
            <div className="flex flex-1 flex-col">
                {tasks.map((t) => (
                    <div key={t.id}>
                        {t.title ? (
                            <span>{t.title}</span>
                        ): (
                            <span className="text-gray-600">Nova tarefa</span>    
                        )}

                        {t.description ? <span>{t.description}</span> : null}
                    </div>
                ))}
            </div>
            <Button fullWidth onClick={() => {
                createTask({});
            }}>
                Criar tarefa
            </Button>
        </div>
    );
};
