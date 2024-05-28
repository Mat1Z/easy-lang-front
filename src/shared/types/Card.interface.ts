import { ROLE, STATUS } from "../util";

export interface CardRequest {
  userId: number;
  take?: number;
  skip?: number;
  status: STATUS;
  role: ROLE;
}


export interface CardResponse {
  totalRows: number;
  data:      Card[];
}

export interface Card {
  id:              number;
  title:           string;
  status:          STATUS;
  totalPages:      number;
  translatedPages: number;
  translatorId:    number;
  customerId:      number;
  startedAt:       null | string;
  deadlineAt:      string;
  finishedAt:      null | string;
  createdAt:       string;
  updatedAt:       string;
}


