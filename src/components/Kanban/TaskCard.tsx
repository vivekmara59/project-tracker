import type { Task } from "../../types/task";
import { useTaskStore } from "../../store/useTaskStore";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  const setDraggedTaskId = useTaskStore((s) => s.setDraggedTaskId);
  const setIsDragging = useTaskStore((s) => s.setIsDragging);
  const setDragPosition = useTaskStore((s) => s.setDragPosition);
  const draggedTaskId = useTaskStore((s) => s.draggedTaskId);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();

    setDraggedTaskId(task.id);
    setIsDragging(true);

    setDragPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setDraggedTaskId(null);
    setDragPosition(null); 
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    setDragPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500";
      case "High":
        return "bg-orange-500";
      case "Medium":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date();

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`bg-white p-3 rounded-lg shadow mb-3 cursor-grab active:cursor-grabbing select-none transition-all duration-150 ${
        draggedTaskId === task.id ? "opacity-0" : ""
      }`}
    >
      <h3 className="font-semibold">{task.title}</h3>

      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-600">{task.assignee}</span>

        <span
          className={`text-xs text-white px-2 py-1 rounded ${getPriorityColor(
            task.priority,
          )}`}
        >
          {task.priority}
        </span>
      </div>

      <div className="text-xs mt-2">
        <span className={isOverdue ? "text-red-500" : ""}>{task.dueDate}</span>
      </div>
    </div>
  );
};

export default TaskCard;
