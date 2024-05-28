import { CardRequest } from "../types/Card.interface";
import { OrderStatus, STATUS } from "../util";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  AUTH: {
    SIGNUP: () => `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
    SIGNIN: () => `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
  },
  ORDER: {
    GET_ORDERS: ({ userId, role, status, take = 1000, skip = 0 }: CardRequest) => `${process.env.NEXT_PUBLIC_API_URL}/order/${userId}?take=${take}&skip=${skip}${status === STATUS.ALL ? "" : `&status=${status}`}&role=${role}`,
  },
  TRANSLATOR: {
    GET_STATS: (userId: number) => `${process.env.NEXT_PUBLIC_API_URL}/translator/${userId}`,
  }
}