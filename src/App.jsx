import { useState } from "react";
import "./App.css";
import Modal from "./components/commons/Modal";
import FilterBar from "./components/FilterBar";
import Header from "./components/Header";
import Stats from "./components/Stats";
import TodoColumn from "./components/TodoColumn";
import { useTasks } from "./context/TaskContext";

function App() {
  const [modalConfig, setModalConfig] = useState({
    title: "",
    children: null,
    isOpen: false,
  });
  const { addTask } = useTasks();

  const closeModal = () => {
    setModalConfig({
      title: "",
      children: null,
      isOpen: false,
    });
  };

  const handleAddTask = async (formData) => {
    try {
      const newTask = {
        ...formData,
        id: crypto.randomUUID(),
        status: "todo",
        createdAt: new Date().toISOString(),
      };
      await addTask(newTask);
      closeModal();
      alert("Task added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header
        handleAddTask={handleAddTask}
        setModalConfig={setModalConfig}
        closeModal={closeModal}
      />
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
          <TodoColumn
            type="todo"
            handleAddTask={handleAddTask}
            setModalConfig={setModalConfig}
            closeModal={closeModal}
          />
          {/* doing column */}
          <TodoColumn
            type="doing"
            handleAddTask={handleAddTask}
            setModalConfig={setModalConfig}
            closeModal={closeModal}
          />
          {/* done column */}
          <TodoColumn
            type="done"
            handleAddTask={handleAddTask}
            setModalConfig={setModalConfig}
            closeModal={closeModal}
          />
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
