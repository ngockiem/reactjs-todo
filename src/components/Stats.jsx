import { Check, Clock, ClockAlert, Layers } from "lucide-react";
import { useTasks } from "../context/TaskContext";
import { useMemo } from "react";
const Stats = () => {
  const { tasks } = useTasks();
  const totalTasks = useMemo(() => tasks.length || 0, [tasks]);
  const totalDone = useMemo(
    () => tasks.filter((task) => task.status === "done").length || 0,
    [tasks],
  );
  const totalDoing = useMemo(
    () => tasks.filter((task) => task.status === "doing").length || 0,
    [tasks],
  );
  const totalOverdue = useMemo(
    () =>
      tasks.filter((task) => {
        if (!task.dueDate) return false;
        const isNotDone = task.status !== "done";

        const dueDate = new Date(task.dueDate);
        const today = new Date();

        // Đặt lại giờ về 0 để chỉ so sánh ngày/tháng/năm
        today.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);

        return dueDate < today && isNotDone;
      }).length || 0,
    [tasks],
  );

  return (
    <div className="flex gap-4 mb-7">
      {/* stat card - total */}
      <div className="stat-card">
        <div className="stat-icon bg-[#F3F1FF] ">
          {" "}
          <Layers size={16} className="stroke-[#8B7CF6]" />
        </div>
        <div>
          <div className="stat-num text-[#8B7CF6]">{totalTasks}</div>
          <div className="stat-label">Tổng task</div>
        </div>
      </div>
      {/* stat card - doing */}
      <div className="stat-card">
        <div className="stat-icon bg-[#FFFBEB] ">
          {" "}
          <Clock size={16} className="stroke-[#F59E0B]" />
        </div>
        <div>
          <div className="stat-num text-[#F59E0B]">{totalDoing}</div>
          <div className="stat-label">Đang làm</div>
        </div>
      </div>
      {/* stat card - done */}
      <div className="stat-card">
        <div className="stat-icon bg-[#ECFDF5] ">
          {" "}
          <Check size={16} className="stroke-[#10B981]" />
        </div>
        <div>
          <div className="stat-num text-[#10B981]">{totalDone}</div>
          <div className="stat-label">Hoàn thành</div>
        </div>
      </div>
      {/* stat card - overdue */}
      <div className="stat-card">
        <div className="stat-icon bg-[#FEF2F2] ">
          {" "}
          <ClockAlert size={16} className="stroke-[#EF4444]" />
        </div>
        <div>
          <div className="stat-num text-[#EF4444]">{totalOverdue}</div>
          <div className="stat-label">Quá hạn</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
