import z from "zod";
import InputField from "./UI/InputField";
import SelectField from "./UI/SelectField";
import TextArea from "./UI/TextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "../context/ModalContext";

const taskSchema = z.object({
  title: z.string().min(3, { message: "Title phải có 3 ký tự" }),
  description: z.string().min(3, { message: "Description phải có 3 ký tự" }),
  priority: z.string(),
  tags: z.string().optional(),
  dueDate: z.string(),
  status: z.string().optional(),
});

const TaskForm = ({ initialValues, onSubmit }) => {
  const { closeModal } = useModal();
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
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
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
            { value: "low", label: "Thống" },
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
