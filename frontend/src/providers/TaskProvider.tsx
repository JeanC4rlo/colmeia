import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import { TaskStatus, type Task } from "../types/tasks";

export interface NewTask {
  title?: string;
  description?: string;
  status?: string;
  deadline?: Date;
}

interface TaskContextData {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  refreshTasks: () => Promise<void>;
  createTask: (taskData: NewTask, onSuccess?: () => void) => Promise<any>;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

interface ProviderProps {
  children: React.ReactNode;
}

export function TaskProvider({ children }: ProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const refreshTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/tasks');
      setTasks(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Erro ao atualizar lista');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  const createTask = async (taskData: NewTask, onSuccess?: () => void) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const payload = {
        status: TaskStatus.PENDING,
        ...taskData
      };

      const response = await api.post('/api/tasks/create', payload);
      
      await refreshTasks();
      
      if (onSuccess) {
        onSuccess();
      }
      
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Erro ao criar tarefa';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, isLoading, error, refreshTasks, createTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask deve ser usado dentro de um TaskProvider");
  }
  return context;
}
