import { TUser } from "../User/user.interface"
import { TLoginUser } from "./auth.interface"

const signUpInToDB = async (payload: TUser)=>{

}

const loginUser = async (payload: TLoginUser) =>{
  
}

export const AuthServices = {
  signUpInToDB, 
  loginUser
}