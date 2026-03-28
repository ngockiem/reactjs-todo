import { useState } from "react";
import "./App.css";
import Modal from "./components/commons/Modal";
import FilterBar from "./components/FilterBar";
import Header from "./components/Header";
import Stats from "./components/Stats";
import TodoColumn from "./components/TodoColumn";

function App() {
  const [modalConfig, setModalConfig] = useState({
    title: "",
    children: null,
    isOpen: false,
  });
  const closeModal = () => {
    setModalConfig({
      title: "",
      children: null,
      isOpen: false,
    });
  };
  return (
    <>
      <Header setModalConfig={setModalConfig} closeModal={closeModal} />
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
          <TodoColumn type="work" />
          {/* doing column */}
          <TodoColumn type="doing" />
          {/* done column */}
          <TodoColumn type="done" />
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
