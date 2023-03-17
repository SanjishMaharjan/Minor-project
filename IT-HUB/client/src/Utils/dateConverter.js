export function getDate(date) {
  const date1 = new Date(date);
  const time = date1.getTime();
  const diff = new Date() - time;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years) return `${years} years`;
  if (months) return `${months % 12} months`;
  if (days) return `${days % 365} days`;
  if (hours) return `${hours % 24} hours`;
  if (minutes) return `${minutes % 60} minutes`;
  if (seconds) return `${seconds % 60} seconds`;
}
