import { OrderStatus, STATUS } from "./constants";

export const getStatusBarColor = (status: STATUS) => {
  switch (status) {
    case STATUS.IN_PROGRESS:
      return "#EF9B0F";
    case STATUS.TRANSLATED:
      return "#02B887"
    case STATUS.OVERDUE:
      return "#CA0F22";
    case STATUS.NOT_STARTED: 
      return "#638BC8"
  }
}