import React from "react";
import { TaskProvider } from "./TaskProvider";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <TaskProvider>
        {children}
    </TaskProvider>
  )
}
