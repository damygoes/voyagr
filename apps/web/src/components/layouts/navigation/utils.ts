export const getUserAvatarFallback = (name?: string): string => {
  if (!name) return "U";

  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0] ?? "";
  const second = parts[1] ?? "";

  if (first && second) {
    return `${first[0] ?? ""}${second[0] ?? ""}`.toUpperCase() || "U";
  }

  if (first.length >= 2) {
    return first.slice(0, 2).toUpperCase();
  }

  if (first.length === 1) {
    return (first[0] ?? "U").toUpperCase();
  }

  return "U";
};
