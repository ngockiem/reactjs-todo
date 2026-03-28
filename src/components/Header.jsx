import { ChartNoAxesColumn, Plus } from "lucide-react";
import TaskForm from "./TaskForm";

const Header = ({ setModalConfig, closeModal, handleAddTask }) => {
  return (
    <header className="bg-surface border-b border-solid border-border h-15 flex justify-between items-center sticky top-0 z-100 px-8">
      <div className="flex items-center gap-2.5 font-medium text-[15px] tracking-[-0.3px]">
        {/* header logo */}
        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-accent">
          <svg
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
          >
            <rect x="1" y="1" width="5" height="5" rx="1.5" fill="white"></rect>
            <rect
              x="8"
              y="1"
              width="5"
              height="5"
              rx="1.5"
              fill="white"
              opacity="0.5"
            ></rect>
            <rect
              x="1"
              y="8"
              width="5"
              height="5"
              rx="1.5"
              fill="white"
              opacity="0.5"
            ></rect>
            <rect
              x="8"
              y="8"
              width="5"
              height="5"
              rx="1.5"
              fill="white"
              opacity="0.25"
            ></rect>
          </svg>
        </div>
        <h1>TaskFlow</h1>
      </div>
      {/* header right */}
      <div className="flex items-center gap-3">
        <button className="btn btn-ghost">
          <ChartNoAxesColumn size={13} />
          <span>Báo cáo</span>
        </button>
        <button
          className="btn-primary btn"
          onClick={() =>
            setModalConfig({
              isOpen: true,
              title: "Thêm task mới",
              children: (
                <TaskForm onSubmit={handleAddTask} onClose={closeModal} />
              ),
            })
          }
        >
          <Plus size={13} />
          <span>Thêm task</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-surface2 border border-solid border-border flex items-center justify-center text-[12px] font-medium text-secondary cursor-pointer">
          {/* avatar */}
          NK
        </div>
      </div>
    </header>
  );
};

export default Header;
