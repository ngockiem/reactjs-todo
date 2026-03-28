import { Clock, EllipsisVertical, Trash2 } from "lucide-react";
import PriorityLabel from "./PriorityLabel";
import TaskForm from "./TaskForm";
import { useTasks } from "../context/TaskContext";
const TaskCard = ({
  type,
  title,
  description,
  tags,
  priority,
  dueDate,
  task,
  setModalConfig,
  closeModal,
}) => {
  const { editTask, deleteTask } = useTasks();

  const handleEditTask = (formData) => {
    const tags = formData.tags.split(",");
    const updatedTask = {
      ...task,
      tags,
      ...formData,
    };
    editTask(updatedTask);
    closeModal();
    alert("Task updated");
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
    alert("Task deleted");
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
    <div data-type={type} className="task-card">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-[13px] font-medium leading-[1.4] text-primary capitalize">
          {title}
        </h4>
        <button
          className="w-5.5 h-5.5 flex items-center justify-center rounded-sm text-muted cursor-pointer shrink-0 border-none bg-none hover:text-primary hover:bg-surface2"
          onClick={() =>
            setModalConfig({
              title: "Chỉnh sửa task",
              children: (
                <TaskForm
                  initialValues={task}
                  onClose={closeModal}
                  onSubmit={handleEditTask}
                />
              ),
              isOpen: true,
            })
          }
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
          <Clock size={10} className="stroke-muted" />
          <span>{dueDate}</span>
        </div>
        <PriorityLabel priority={priority} />
        <button
          type="button"
          className="w-5.5 h-5.5 flex items-center justify-center rounded-sm text-muted cursor-pointer shrink-0 border-none bg-none hover:text-primary hover:bg-surface2"
          onClick={handleDeleteTask}
        >
          <Trash2 size={12} className="stroke-muted" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
