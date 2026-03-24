import { create } from "zustand";
import { generateTasks } from "../data/generateTasks";
import type { Task, Status } from "../types/task";

interface TaskState {
  tasks: Task[];
  draggedTaskId: string | null;
  isDragging: boolean; 

  setTasks: (tasks: Task[]) => void;
  setDraggedTaskId: (id: string | null) => void;
  setIsDragging: (val: boolean) => void;
  updateTaskStatus: (id: string, status: Status) => void;
  dragPosition: { x: number; y: number } | null;
  setDragPosition: (pos: { x: number; y: number } | null) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: generateTasks(500),
  dragPosition: null,

  setDragPosition: (pos) => set({ dragPosition: pos }),
  draggedTaskId: null,
  isDragging: false, 

  setDraggedTaskId: (id) => set({ draggedTaskId: id }),
  setIsDragging: (val) => set({ isDragging: val }),

  setTasks: (tasks) => set({ tasks }),

  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task,
      ),
    })),
}));
