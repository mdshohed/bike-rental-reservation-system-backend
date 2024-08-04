import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const UserSchema = new Schema<TUser>({
    name: { 
      type: String, 
      require: true
    },
    email: { 
      type: String, 
      require: true
    },
    password: { 
      type: String, 
      require: true
    },
    phone: { 
      type: Number, 
      require: true
    },
    address: { 
      type: String, 
      require: true
    },
    role: { 
      type: String,
      require: true, 
      enum: [ "admin", "user"]
    },
    isDeleted: { 
      type: String, 
      require: true
    },
 })

export const User = model<TUser>("User", UserSchema);
