
export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  role: "admin" | "user";
  isDeleted?: boolean;
}
