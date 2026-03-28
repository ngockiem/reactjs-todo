import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";

const TodoColumn = ({ type }) => {
  const labels = {
    work: "Cần làm",
    doing: "Đang làm",
    done: "Hoàn thành",
  };
  return (
    <div
      data-type={type}
      className="bg-surface2 rounded-xl border border-solid border-border overflow-hidden animate-fadeUp"
    >
      <div className="pt-4 pb-3.5 px-4.5 flex items-center justify-between border border-solid border-border bg-surface rounded-tl-xl rounded-tr-xl">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full`}
            style={{ backgroundColor: "var(--type-accent)" }}
          ></div>
          <span className="text-[13px] font-medium">{labels[type]}</span>
          <span
            className={`text-[11px] font-medium py-0.5 px-1.75 rounded-[20px] font-sans `}
            style={{
              backgroundColor: "var(--type-bg)",
              color: "var(--type-accent)",
            }}
          >
            2
          </span>
        </div>
        <button className="w-6 h-6 rounded-xs flex items-center justify-center cursor-pointer text-muted border-none bg-transparent transition-colors duration-150 hover:text-primary hover:bg-surface2">
          <Plus size={16} className="stroke-muted" />
        </button>
      </div>
      {/* task list */}
      <div className="p-3 flex flex-col gap-2 min-h-20">
        {/* task */}
        {
          <TaskCard
            type={type}
            title="Thiết kế màn hình đăng nhập"
            content="Tạo wireframe và prototype cho màn hình auth, bao gồm login, register, forgot password."
            tags={["design", "wireframe", "prototype"]}
            priority="high"
          />
        }
      </div>
      <button className="mx-3 mb-3 w-[calc(100%-24px)] p-2.25 rounded-lg border-[1.5px] border-dashed border-border bg-transparent text-[12px] text-muted cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-150 hover:border-border-strong hover:text-secondary hover:bg-surface">
        <Plus size={14} className="stroke-muted" />
        Thêm task
      </button>
    </div>
  );
};

export default TodoColumn;
