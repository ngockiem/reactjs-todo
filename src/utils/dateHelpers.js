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
