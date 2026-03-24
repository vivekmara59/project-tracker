import { useTaskStore } from "../../store/useTaskStore";

const DragOverlay = () => {
  const { draggedTaskId, dragPosition, tasks } = useTaskStore();

  if (!draggedTaskId || !dragPosition) return null;

  const task = tasks.find((t) => t.id === draggedTaskId);
  if (!task) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: dragPosition.y,
        left: dragPosition.x,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 1000,
      }}
      className="bg-white p-3 rounded-lg shadow-lg w-48 opacity-80"
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm">{task.assignee}</p>
    </div>
  );
};

export default DragOverlay;