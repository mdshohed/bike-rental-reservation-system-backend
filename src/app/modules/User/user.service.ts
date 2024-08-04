
import { User } from "./user.model";

const getProfileFromDB = async (query: Record<string, unknown>) => {
  const result = await User.find();
  return result;
};

const updateProfileIntoDB = (id: string) =>{

}

export const UserServices = {
  getProfileFromDB,
  updateProfileIntoDB
}