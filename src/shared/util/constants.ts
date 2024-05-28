export enum OrderStatus {
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  UNTRANSLATED = "UNTRANSLATED",
  DELAYED = "DELAYED",
}

export const METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
} as const;

export enum ROLE {
  TRANSLATOR = "TRANSLATOR",
  CUSTOMER = "CUSTOMER",
}

export const TABS_LIST = [
  "ALL",
  "TRANSLATED",
  "IN_PROGRESS",
  "NOT_STARTED",
  "OVERDUE"
] as const; 

export enum STATUS {
  "IN_PROGRESS" = "IN_PROGRESS",
  "TRANSLATED" = "TRANSLATED",
  "NOT_STARTED" = "NOT_STARTED",
  "OVERDUE" = "OVERDUE",
  "ALL" = "ALL",
}