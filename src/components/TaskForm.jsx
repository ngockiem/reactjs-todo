import InputField from "./UI/InputField";
import SelectField from "./UI/SelectField";
import TextArea from "./UI/TextArea";

const TaskForm = ({ onClose }) => {
  return (
    <div className="flex flex-col gap-3.5">
      <InputField
        label="Tên task"
        type="text"
        placeholder="Ví dụ: Implement dark mode..."
      />
      <TextArea label="Mô tả" rows={3} placeholder="Chi tiết về task này..." />
      <div className="flex items-start justify-between gap-3">
        <SelectField
          label="Mức độ ưu tiên"
          options={[
            { value: "high", label: "Cao" },
            { value: "medium", label: "Trung bình" },
            { value: "low", label: "Thống" },
          ]}
        />
        <InputField label="Deadline" type="date" />
      </div>
      <InputField
        label="Tags (Cách nhau bằng dấu phẩy)"
        type="text"
        placeholder="React, UI/UX, Testing..."
      />
      <div className="mt-3.5 flex items-center justify-end gap-3.5">
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Hủy
        </button>
        <button type="submit" className="btn btn-primary">
          Tạo Task
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
