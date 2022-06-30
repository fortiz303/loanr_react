import { Request, Response } from "express";
import { loanService } from "../services";
import catchAsync from "../utils/catchAsync";
import pick from "../utils/pick";

export const getLoans = catchAsync(async (req: Request, res: Response) => {
  const filters = {
    ...("granted" in req.query ? { granted_by: { $exists: true } } : {}),
    ...(req.query.id ? { created_by: { $ne: req.query.id } } : {}),
    ...(req.query.createdBy ? { created_by: req.query.createdBy } : {}),
    ...(req.query.grantedBy ? { granted_by: req.query.grantedBy } : {}),
    populate: "created_by, granted_by",
  };
  const options = pick(req.query, ["sortBy", "page", "limit"]);
  const loans = await loanService.queryLoan(filters, options);
  res.json(loans);
});

export const getLoanById = catchAsync(async (req: Request, res: Response) => {
  const loan = await loanService.getLoanById(req.params.id);
  res.json(loan);
});

export const createLoan = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const images: any = req.files;
  const files = [...images.map((obj: any) => obj.path)];
  const loan = await loanService.createRequest(user.id, req.body, files);
  res.json(loan);
});

export const grantLoan = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const loan = await loanService.grantLoan(req.params.id, user.id);
  res.json(loan);
});
