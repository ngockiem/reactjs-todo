import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
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
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks, (initial) => {
    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : initial;
    } catch (_) {
      return initial;
    }
  });

  const [filter, setFilter] = useState({ search: "", priority: "all" });

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchSearch = task.title
        .toLowerCase()
        .includes(filter.search.toLowerCase());
      const matchPriority =
        filter.priority === "all" || task.priority === filter.priority;
      return matchSearch && matchPriority;
    });
  }, [tasks, filter]);

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
      value={{
        tasks,
        filteredTasks,
        filter,
        setFilter,
        addTask,
        editTask,
        deleteTask,
        moveTask,
      }}
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
