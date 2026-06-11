// Shared date helpers so screens stop re-implementing the same formatting.

// Returns a local YYYY-MM-DD string (used as the task date key).
export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const todayString = () => formatDate(new Date());
