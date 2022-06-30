import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";

export const login = async (user: any, password: string) => {
  if (!user.isPasswordMatch(password)) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Invalid Username or password");
  } else return true;
};
