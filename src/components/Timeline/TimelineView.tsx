import { useTaskStore } from "../../store/useTaskStore";

const TimelineView = () => {
  const tasks = useTaskStore((s) => s.tasks);

  const daysInMonth = 31;
  const today = new Date().getDate();

  const getColor = (priority: string) => {
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

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] relative">

     
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-red-500 z-10"
          style={{ left: (today - 1) * 40 }}
        />

   
        <div className="flex border-b">
          {Array.from({ length: daysInMonth }).map((_, i) => (
            <div
              key={i}
              className="w-10 text-xs text-center border-r"
            >
              {i + 1}
            </div>
          ))}
        </div>

      
        <div>
          {tasks.map((task) => {
            const start = task.startDate
              ? new Date(task.startDate).getDate()
              : new Date(task.dueDate).getDate();

            const end = new Date(task.dueDate).getDate();

            const left = (start - 1) * 40;
            const width = Math.max((end - start + 1) * 40, 10);

            return (
              <div key={task.id} className="pl-32 relative h-12 border-b">

          
                <div className="absolute left-0 top-1 text-xs w-32 truncate">
                  {task.title}
                </div>

                <div
                  className={`absolute top-5 h-4 rounded ${getColor(task.priority)}`}
                  style={{
                    left: left,
                    width: width,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineView;