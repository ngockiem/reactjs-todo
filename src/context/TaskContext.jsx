import { createContext, useContext, useEffect, useReducer } from "react";
import { ACTIONS, taskReducer } from "./TaskReducer";

// 1. Tạo context
const TaskContext = createContext(null);

// 2. Dữ liệu mẫu ban đầu
const initialTasks = [
  {
    id: crypto.randomUUID(),
    title: "Thiết kế màn hình đăng nhập",
    description: "Tạo wireframe và prototype cho màn hình auth.",
    status: "todo",
    priority: "high",
    tags: ["UI/UX"],
    dueDate: "2024-03-30",
    createdAt: new Date().toISOString(),
  },
];

// 3. Tạo Provider để bao quanh app
export const TaskProvider = ({ children }) => {
  // Lấy dữ liệu từ localStorage, không có thì dùng initalTasks
  const saved = localStorage.getItem("tasks");
  const [tasks, dispatch] = useReducer(
    taskReducer,
    saved ? JSON.parse(saved) : initialTasks,
  );

  // Mỗi khi task thay đổi thì lưu vào localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Helper functions - thay cho displatch trực tiếp
  const addTask = (task) => dispatch({ type: ACTIONS.ADD_TASK, payload: task });
  const editTask = (task) =>
    dispatch({ type: ACTIONS.EDIT_TASK, payload: task });
  const deleteTask = (id) =>
    dispatch({ type: ACTIONS.DELETE_TASK, payload: { id } });
  const moveTask = (id, status) =>
    dispatch({ type: ACTIONS.MOVE_TASK, payload: { id, status } });

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, editTask, deleteTask, moveTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// 4. Custom hook dùng trong component
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
