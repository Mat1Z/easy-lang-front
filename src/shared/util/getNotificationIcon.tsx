import { CheckCheck, TriangleAlert, X } from "lucide-react";

export const getNotificationIcon = (variant: "success" | "error" | "warning") => {
  switch (variant) {
    case "success":
      return  <CheckCheck color="#198754" />;
    case "error":
      return <X color="#DC3545"/>;
    case "warning":
      return <TriangleAlert color="#FFD900" />;
    default:
      return ["#fff", "#fff"];
  }
}