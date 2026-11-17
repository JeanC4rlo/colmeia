export enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
};

export type Task = {
  id: number;
  title: string | null;
  description: string | null;
  deadline: Date | null;
  status: TaskStatus;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
};
