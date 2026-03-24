import { useTaskStore } from "../../store/useTaskStore";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = () => {
  const tasks = useTaskStore((state) => state.tasks);

  const grouped = {
    todo: tasks.filter((t) => t.status === "todo"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    "in-review": tasks.filter((t) => t.status === "in-review"),
    done: tasks.filter((t) => t.status === "done"),
  };

  return (
    <div className="mt-4 flex gap-4 overflow-x-auto">
      <KanbanColumn title="To Do" tasks={grouped.todo} columnStatus="todo" />
      <KanbanColumn
        title="In Progress"
        tasks={grouped["in-progress"]}
        columnStatus="in-progress"
      />
      <KanbanColumn
        title="In Review"
        tasks={grouped["in-review"]}
        columnStatus="in-review"
      />
      <KanbanColumn title="Done" tasks={grouped.done} columnStatus="done" />
    </div>
  );
};

export default KanbanBoard;
