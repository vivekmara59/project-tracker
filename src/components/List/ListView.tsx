import { useTaskStore } from "../../store/useTaskStore";
import { useState } from "react";

type SortField = "title" | "priority" | "dueDate";

const ListView = () => {
  const tasks = useTaskStore((s) => s.tasks);

  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  const [scrollTop, setScrollTop] = useState(0);

  const rowHeight = 50;
  const containerHeight = 500;

 
  const sortedTasks = [...tasks].sort((a, b) => {
    if (!sortField) return 0;

    const valA = a[sortField];
    const valB = b[sortField];

    if (sortField === "priority") {
      const order: Record<string, number> = {
        Critical: 4,
        High: 3,
        Medium: 2,
        Low: 1,
      };

      return sortOrder === "asc"
        ? order[valA] - order[valB]
        : order[valB] - order[valA];
    }

    if (sortField === "dueDate") {
      return sortOrder === "asc"
        ? new Date(valA).getTime() - new Date(valB).getTime()
        : new Date(valB).getTime() - new Date(valA).getTime();
    }

    return sortOrder === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  
  const totalRows = sortedTasks.length;

  const startIndex = Math.floor(scrollTop / rowHeight);
  const visibleCount = Math.ceil(containerHeight / rowHeight);

  const buffer = 5;

  const endIndex = Math.min(
    totalRows,
    startIndex + visibleCount + buffer
  );

  const visibleTasks = sortedTasks.slice(startIndex, endIndex);

  return (
    <div className="border rounded-lg overflow-hidden">

      <div className="grid grid-cols-5 bg-gray-200 p-2 font-semibold">
        <div
          className="cursor-pointer"
          onClick={() => {
            if (sortField === "title") {
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            } else {
              setSortField("title");
              setSortOrder("asc");
            }
          }}
        >
          Title
        </div>

        <div>Assignee</div>

        <div
          className="cursor-pointer"
          onClick={() => {
            if (sortField === "priority") {
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            } else {
              setSortField("priority");
              setSortOrder("asc");
            }
          }}
        >
          Priority
        </div>

        <div>Status</div>

        <div
          className="cursor-pointer"
          onClick={() => {
            if (sortField === "dueDate") {
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            } else {
              setSortField("dueDate");
              setSortOrder("asc");
            }
          }}
        >
          Due Date
        </div>
      </div>

      
      <div
        className="h-[500px] overflow-y-auto"
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      >
        <div
          style={{
            height: totalRows * rowHeight,
            position: "relative",
          }}
        >
          {visibleTasks.map((task, index) => {
            const actualIndex = startIndex + index;

            return (
              <div
                key={task.id}
                style={{
                  position: "absolute",
                  top: actualIndex * rowHeight,
                  left: 0,
                  right: 0,
                  height: rowHeight,
                }}
                className="grid grid-cols-5 p-2 border-b text-sm bg-white"
              >
                <div>{task.title}</div>
                <div>{task.assignee}</div>
                <div>{task.priority}</div>
                <div>{task.status}</div>
                <div>{task.dueDate}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListView;