export const getNotificationTheme = (variant: "success" | "error" | "warning") => {
  switch (variant) {
    case "success":
      return ["#198754", "#f2faf1"];
    case "error":
      return ["#db9193", "#fbeeee"];
    case "warning":
      return ["#fced8f", "#fcf8e0"];
    default:
      return ["#fff", "#fff"];
  }
}