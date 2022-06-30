import jwt from "jsonwebtoken";
import config from "../config/config";
export const generateToken = (user: any) => {
  const token = jwt.sign({ id: user._id, role: user.role }, config.jwt.secret);
  return token;
};
