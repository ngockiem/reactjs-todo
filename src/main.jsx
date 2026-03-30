import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "./context/ModalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaskProvider>
      <ModalProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <App />
      </ModalProvider>
    </TaskProvider>
  </StrictMode>,
);
