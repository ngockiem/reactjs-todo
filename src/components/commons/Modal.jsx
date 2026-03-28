import { X } from "lucide-react";
const Modal = ({ title, children, onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-surface border border-solid border-border rounded-2xl p-7 w-110 shadow-md animate-fadeUp z-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* modal header */}
        <div className="flex items-center justify-between mb-5">
          <div className="text-[15px] font-medium text-accent">{title}</div>
          <button
            type="button"
            className="border-none bg-transparent cursor-pointer text-muted p-1 rounded-sm hover:bg-surface2 transition-colors duration-150 ease-in"
            onClick={onClose}
          >
            <X size={16} className="stroke-muted" />
          </button>
        </div>
        {/* modal content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
