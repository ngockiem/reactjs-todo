import { Clock, EllipsisVertical, Trash2 } from "lucide-react";
import PriorityLabel from "./PriorityLabel";
import TaskForm from "./TaskForm";
import { useTasks } from "../context/TaskContext";
import toast from "react-hot-toast";
import { useModal } from "../context/ModalContext";
import { isOverdue, formatDate } from "../utils/dateHelpers";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({
  type,
  title,
  description,
  tags,
  priority,
  dueDate,
  task,
}) => {
  const { deleteTask } = useTasks();
  const { openModal } = useModal();
  const overdue = isOverdue(dueDate, task.status);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      // Truyền status hiện tại để App biết task đang ở cột nào
      data: { status: task.status },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
    toast.success("Xóa task thành công!");
  };

  const handleOpenModal = () => {
    openModal({
      title: "Cập nhật task",
      children: <TaskForm initialValues={task} />,
    });
  };

  // Kiểm tra an toàn: nếu tags là string thì split, nếu là array thì giữ nguyên, còn lại để mảng trống
  const rawTags =
    typeof tags === "string"
      ? tags.split(",")
      : Array.isArray(tags)
        ? tags
        : [];

  const tagList = rawTags
    .map((tag) => {
      const trimmedTag = tag.trim(); // Xóa khoảng trắng thừa
      if (!trimmedTag) return null;
      // Sửa lỗi cú pháp charAt() và viết hoa chữ đầu
      return trimmedTag.charAt(0).toUpperCase() + trimmedTag.slice(1);
    })
    .filter(Boolean); // Loại bỏ các tag rỗng

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners} // xử lý sự kiện kéo
      {...attributes} // accessibility
      data-type={type}
      className={`task-card ${isOverdue(dueDate, task.status) ? "overdue" : ""}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-[13px] font-medium leading-[1.4] text-primary capitalize">
          {title}
        </h4>
        <button
          className="w-5.5 h-5.5 flex items-center justify-center rounded-sm text-muted cursor-pointer shrink-0 border-none bg-none hover:text-primary hover:bg-surface2"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenModal();
          }}
        >
          <EllipsisVertical size={16} className="stroke-muted" />
        </button>
      </div>
      {/* content */}
      <p className="text-[12px] text-secondary leading-normal mb-3 font-light">
        {description}
      </p>
      {/* tags */}
      <div className="flex flex-wrap gap-1.25 mb-3">
        {tagList.length > 0 &&
          tagList.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
      </div>
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1 text-[11px] text-muted`}>
          <Clock
            size={10}
            className={overdue ? "stroke-red-500" : "stroke-muted"}
          />
          <span className={overdue ? "text-red-500 font-medium" : "text-muted"}>
            {formatDate(dueDate)}
            {overdue && " · Quá hạn"}
          </span>
        </div>
        <PriorityLabel priority={priority} />
        <button
          type="button"
          className="w-5.5 h-5.5 flex items-center justify-center rounded-sm text-muted cursor-pointer shrink-0 border-none bg-none hover:text-primary hover:bg-surface2"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteTask();
          }}
        >
          <Trash2 size={12} className="stroke-muted" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
