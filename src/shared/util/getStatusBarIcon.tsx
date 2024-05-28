import { CircleCheckBig, CircleX, Clock, Timer } from "lucide-react";
import { STATUS } from "./constants";

export const getStatusBarIcon = (status: STATUS) => {
  switch (status) {
    case STATUS.IN_PROGRESS:
      return Clock;
    case STATUS.TRANSLATED:
      return CircleCheckBig;
    case STATUS.OVERDUE:
      return CircleX;
    default:
      return Timer;
  }
};
