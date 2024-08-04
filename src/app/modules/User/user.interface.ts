import { USER_ROLE } from "./user.constant";

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  role: "admin" | "user";
  isDeleted?: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
