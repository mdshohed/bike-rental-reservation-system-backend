export interface TUser {
  id: string;
  email: string;
  password: string;
  phone: boolean;
  passwordChangedAt?: Date;
  role: "admin" | "user";
  isDeleted: boolean;
}
