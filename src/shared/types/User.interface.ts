import { ROLE } from "../util";

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: ROLE;
}