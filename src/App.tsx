import { useEffect, useState } from "react";
import { useTaskStore } from "./store/useTaskStore";
import KanbanBoard from "./components/Kanban/KanbanBoard.tsx";
import DragOverlay from "./components/Common/DragOverlay";
import ListView from "./components/List/ListView";
import TimelineView from "./components/Timeline/TimelineView";

function App() {
  const [view, setView] = useState("kanban");
  const setIsDragging = useTaskStore((s) => s.setIsDragging);
  const setDraggedTaskId = useTaskStore((s) => s.setDraggedTaskId);
  const setDragPosition = useTaskStore((s) => s.setDragPosition);
  
  useEffect(() => {
    const handlePointerUp = () => {
      setIsDragging(false);
      setDraggedTaskId(null);
      setDragPosition(null);
    };
  
    window.addEventListener("pointerup", handlePointerUp);
  
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);
  
  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => setView("kanban")}
        >
          Kanban
        </button>

        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => setView("list")}
        >
          List
        </button>

        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => setView("timeline")}
        >
          Timeline
        </button>
      </div>
      {view === "kanban" && <KanbanBoard />}
      {view === "list" && <ListView />}
      {view === "timeline" && <TimelineView />}
      <DragOverlay />
    </div>
  );
}

export default App;
