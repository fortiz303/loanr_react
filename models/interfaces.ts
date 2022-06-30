import { Document, Model, Types } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  id_type: string;
  country?: string;
  number: string;
  expiry?: Date;
  id_proof: string;
  role: string;
  active: boolean;
}

export interface UserModel extends Model<User> {
  isPasswordMatch(password: string): boolean;
  isEmailTaken(email: string): boolean;
  paginate: any;
  toJSON: any;
}

export interface Loan extends Document {
  description: string;
  amount: number;
  collateral_images: string[];
  collateral: string;
  date: Date;
  created_by: Types.ObjectId;
  granted_by?: Types.ObjectId;
}

export interface EachChat {
  sender: Types.ObjectId;
  data: string;
}

export interface PersonChat extends Document {
  person1: Types.ObjectId;
  person2: Types.ObjectId;
  person1SocketId?: string;
  person2SocketId?: string;
  chat: Object[];
}

export interface LoanModel extends Model<Loan> {
  paginate: any;
  toJSON: any;
}
