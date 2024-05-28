import { API } from ".";
import { LoginFormData, SignupFormData } from "../types";
import { CardRequest } from "../types/Card.interface";
import { METHODS, OrderStatus } from "../util";
import request from "../util/request";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getOrders: (payload: CardRequest) => request(METHODS.GET, API.ORDER.GET_ORDERS(payload)),
  signUp: (body: SignupFormData) => request(METHODS.POST, API.AUTH.SIGNUP(), body)(),
  signIn: (body: LoginFormData) => request(METHODS.POST, API.AUTH.SIGNIN(), body)(),
  getStats: (userId: number) => request(METHODS.GET, API.TRANSLATOR.GET_STATS(userId)),
}