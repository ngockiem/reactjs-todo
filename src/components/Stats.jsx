import { Check, Clock, ClockAlert, Layers } from "lucide-react";
const Stats = () => {
  return (
    <div className="flex gap-4 mb-7">
      {/* stat card - total */}
      <div className="stat-card">
        <div className="stat-icon bg-[#F3F1FF] ">
          {" "}
          <Layers size={16} className="stroke-[#8B7CF6]" />
        </div>
        <div>
          <div className="stat-num text-[#8B7CF6]">8</div>
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
          <div className="stat-num text-[#F59E0B]">3</div>
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
          <div className="stat-num text-[#10B981]">3</div>
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
          <div className="stat-num text-[#EF4444]">2</div>
          <div className="stat-label">Quá hạn</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
