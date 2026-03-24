export type Priority = "Low" | "Medium" | "High" | "Critical";
export type Status = "todo" | "in-progress" | "in-review" | "done";

export interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: Priority;
  status: Status;
  startDate?: string;
  dueDate: string;
}