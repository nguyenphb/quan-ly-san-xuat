import { TaskStatus } from '@/types/taskStatus.type';

export const getTaskStatusColor = (status: string, taskStatus: TaskStatus[]) => {
  const exist = taskStatus.find((t) => t.status === status);
  if (exist) {
    return exist.color;
  }
  return '#265985';
};
