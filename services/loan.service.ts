import { StatusCodes } from "http-status-codes";
import { Loan } from "../models";
import ApiError from "../utils/ApiError";

export const queryLoan = async (filter: any, options: any) => {
  const loans = await Loan.paginate(filter, options);

  return loans;
};

export const createRequest = async (
  id: string,
  data: object,
  files: string[]
) => {
  console.log(files);
  const loan = await Loan.create({
    ...data,
    created_by: id,
    collateral_images: files,
  });
  return loan;
};

export const grantLoan = async (loan_id: string, id: string) => {
  const loan = await Loan.findById(loan_id);

  if (!loan) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid Id");
  }
  Object.assign(loan, { grantedBy: id });
  loan.save();
  return loan;
};

export const getLoanById = async (id: string) => {
  const loan = await Loan.findById(id);
  if (!loan) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid Loan Id");
  }
  return loan;
};
