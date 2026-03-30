import { useState } from "react";
import "./App.css";
import Modal from "./components/commons/Modal";
import FilterBar from "./components/FilterBar";
import Header from "./components/Header";
import Stats from "./components/Stats";
import TodoColumn from "./components/TodoColumn";
import { useTasks } from "./context/TaskContext";
import toast from "react-hot-toast";
import { useModal } from "./context/ModalContext";

function App() {
  const { modalConfig, closeModal } = useModal();
  const { addTask } = useTasks();

  const handleAddTask = (formData) => {
    addTask({
      ...formData,
      id: crypto.randomUUID(),
      status: "todo",
      createdAt: new Date().toISOString(),
    });
    closeModal();
    toast.success("Thêm task mới thành công");
  };

  return (
    <>
      <Header handleAddTask={handleAddTask} />
      <main className="pt-7 px-8 pb-10">
        {/* title */}
        <div className="flex items-end justify-between mb-7">
          <div>
            <h2 className="text-[22px] font-medium tracking-[-0.5px] text-primary">
              Dự án cá nhân
            </h2>
            <p className="text-[13px] text-muted mt-0.75 font-light">
              Cập nhật lần cuối: hôm nay lúc 10:32
            </p>
          </div>
          {/* filter bar */}
          <FilterBar />
        </div>
        {/* stats */}
        <Stats />
        {/* Kanban board */}
        <div className="grid grid-cols-3 gap-5 items-start">
          {/* todo column */}
          <TodoColumn type="todo" handleAddTask={handleAddTask} />
          {/* doing column */}
          <TodoColumn type="doing" handleAddTask={handleAddTask} />
          {/* done column */}
          <TodoColumn type="done" handleAddTask={handleAddTask} />
        </div>
      </main>
      {modalConfig.isOpen && (
        <Modal title={modalConfig.title} onClose={closeModal}>
          {modalConfig.children}
        </Modal>
      )}
    </>
  );
}

export default App;
