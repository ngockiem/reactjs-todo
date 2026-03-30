import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    title: "",
    children: null,
    isOpen: false,
  });

  const openModal = ({ title, children }) => {
    setModalConfig({
      title,
      children,
      isOpen: true,
    });
  };

  const closeModal = () => {
    setModalConfig({
      title: "",
      children: null,
      isOpen: false,
    });
  };
  return (
    <ModalContext.Provider value={{ modalConfig, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
