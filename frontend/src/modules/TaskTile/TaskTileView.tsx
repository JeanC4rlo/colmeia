import { useEffect } from 'react';
import { useTask } from '../../providers/TaskProvider';
import { Button } from '../../components/Button';
import { TaskItem } from './components/TaskItem';

export const TaskView = () => {
  const { createTask, refreshTasks, tasks } = useTask();

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  const activeTasks = tasks.filter(task => !task.is_deleted);

  return (
    <div className="flex flex-col h-full gap-6"> 
      
      <div className="flex-1 overflow-y-auto px-4 pt-4 flex flex-col gap-4">
        {activeTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
      
      <div className="p-4">
        <Button fullWidth onClick={() => createTask({})}>
          Criar tarefa
        </Button>
      </div>
    </div>
  );
};
