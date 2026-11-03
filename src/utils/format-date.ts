export function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
