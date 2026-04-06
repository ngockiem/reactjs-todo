export const isOverdue = (dueDate, status) => {
  if (!dueDate || status === "done") return false;

  const due = new Date(dueDate);
  const today = new Date();

  due.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return due < today;
};

// Format ngày từ "2024-03-30" → "30/03/2024"
export const formatDate = (dueDate) => {
  if (!dueDate) return "";
  const [year, month, day] = dueDate.split("-");
  return `${day}/${month}/${year}`;
};

export const formatLastUpdated = (isoString) => {
  if (!isoString) return "Chưa có dữ liệu";

  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return "Vừa xong";
  if (diffMins < 60) return `${diffMins} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;

  // Quá 24h thì hiển thị ngày giờ cụ thể
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
