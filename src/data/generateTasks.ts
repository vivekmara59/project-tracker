import type { Task, Priority, Status } from "../types/task";

const priorities: Priority[] = ["Low", "Medium", "High", "Critical"];
const statuses: Status[] = ["todo", "in-progress", "in-review", "done"];
const users = ["VM", "AK", "RS", "PK", "SJ", "AM"];

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toISOString().split("T")[0];
}

export function generateTasks(count: number): Task[] {
  const tasks: Task[] = [];

  for (let i = 0; i < count; i++) {
    const hasStartDate = Math.random() > 0.2;

    tasks.push({
      id: `task-${i}`,
      title: `Task ${i + 1}`,
      assignee: users[Math.floor(Math.random() * users.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      startDate: hasStartDate
        ? randomDate(new Date(2026, 2, 1), new Date(2026, 2, 10))
        : undefined,
      dueDate: randomDate(new Date(2026, 2, 5), new Date(2026, 2, 30)),
    });
  }

  return tasks;
}