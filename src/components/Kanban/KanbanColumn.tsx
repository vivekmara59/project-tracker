import type { Task } from "../../types/task";
import TaskCard from "./TaskCard";
import { useTaskStore } from "../../store/useTaskStore";
import type { Status } from "../../types/task";

interface Props {
  title: string;
  tasks: Task[];
  columnStatus: Status;
}

const KanbanColumn = ({ title, tasks, columnStatus }: Props) => {
  const draggedTaskId = useTaskStore((s) => s.draggedTaskId);
  const updateTaskStatus = useTaskStore((s) => s.updateTaskStatus);

  const handleDrop = () => {
    if (draggedTaskId && isDragging) {
      updateTaskStatus(draggedTaskId, columnStatus);
    }
  };
  const isDragging = useTaskStore((s) => s.isDragging);
  return (
    <div
      onPointerUp={handleDrop}
      className={`bg-gray-100 p-3 rounded-lg w-64 flex-shrink-0 ${
        isDragging ? "bg-blue-100" : "bg-gray-100"
      }`}
    >
      <h2 className="font-bold mb-3">
        {title} ({tasks.length})
      </h2>

      <div className="h-[500px] overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="text-gray-400 text-sm text-center mt-10">
            No tasks
          </div>
        ) : (
          tasks.map((task) => {
            if (task.id === draggedTaskId) {
              return (
                <div
                  key={task.id}
                  className="h-20 mb-3 rounded-lg border-2 border-dashed border-gray-300"
                />
              );
            }

            return <TaskCard key={task.id} task={task} />;
          })
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
