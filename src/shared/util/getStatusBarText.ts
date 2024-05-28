import { OrderStatus, STATUS } from "./constants";

export const getStatusBarText = (status: STATUS) => {
  switch (status) {
    case STATUS.IN_PROGRESS:
      return "In progress";
    case STATUS.TRANSLATED:
      return "Completed"
    case STATUS.OVERDUE:
      return "Overdue";
    case STATUS.NOT_STARTED: 
      return "Not started"
  }
}