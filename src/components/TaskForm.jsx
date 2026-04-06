import z from "zod";
import InputField from "./UI/InputField";
import SelectField from "./UI/SelectField";
import TextArea from "./UI/TextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "../context/ModalContext";
import { useTasks } from "../context/TaskContext";
import toast from "react-hot-toast";

const taskSchema = z.object({
  title: z.string().min(3, { message: "Title phải có 3 ký tự" }),
  description: z.string().min(3, { message: "Description phải có 3 ký tự" }),
  priority: z.string(),
  tags: z.string().optional(),
  dueDate: z.string(),
  status: z.string().optional(),
});

const TaskForm = ({ initialValues = null }) => {
  const { closeModal } = useModal();
  const { addTask, editTask } = useTasks();
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
  const handleEditTask = (formData) => {
    // Fixed logic
    const updatedTask = {
      ...initialValues,
      ...formData,
      tags: formData.tags
        ? formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : initialValues.tags,
    };
    editTask(updatedTask);
    closeModal();
    toast.success("Cập nhật task thành công!");
  };
  let defaultValues = {
    title: "",
    description: "",
    priority: "medium",
    tags: "",
    dueDate: "",
    status: "todo",
  };

  if (initialValues) {
    defaultValues = {
      title: initialValues.title,
      description: initialValues.description,
      priority: initialValues.priority,
      tags: initialValues.tags,
      dueDate: initialValues.dueDate,
      status: initialValues.status,
    };
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: defaultValues,
  });

  return (
    <form
      onSubmit={
        initialValues
          ? handleSubmit(handleEditTask)
          : handleSubmit(handleAddTask)
      }
      className="flex flex-col gap-3.5"
    >
      <InputField
        label="Tên task"
        type="text"
        placeholder="Ví dụ: Implement dark mode..."
        {...register("title")}
        error={errors.title}
      />
      <TextArea
        label="Mô tả"
        rows={3}
        placeholder="Chi tiết về task này..."
        {...register("description")}
        error={errors.description}
      />
      <div className="flex items-start justify-between gap-3">
        <SelectField
          label="Mức độ ưu tiên"
          options={[
            { value: "high", label: "Cao" },
            { value: "medium", label: "Trung bình" },
            { value: "low", label: "Thấp" },
          ]}
          {...register("priority")}
          error={errors.priority}
        />
        <InputField
          label="Deadline"
          type="date"
          {...register("dueDate")}
          error={errors.dueDate}
        />
      </div>
      {initialValues && (
        <SelectField
          label="Trạng thái"
          options={[
            { value: "todo", label: "Cần làm" },
            { value: "doing", label: "Đang làm" },
            { value: "done", label: "Hoàn thành" },
          ]}
          {...register("status")}
          error={errors.status}
        />
      )}

      <InputField
        label="Tags (Cách nhau bằng dấu phẩy)"
        type="text"
        placeholder="React, UI/UX, Testing..."
        {...register("tags")}
        error={errors.tags}
      />
      <div className="mt-3.5 flex items-center justify-end gap-3.5">
        <button type="button" className="btn btn-ghost" onClick={closeModal}>
          Hủy
        </button>
        <button type="submit" className="btn btn-primary">
          {initialValues ? "Sửa task" : "Tạo task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
