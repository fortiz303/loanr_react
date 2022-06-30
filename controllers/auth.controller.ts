import { Response, Request } from "express";
import { authService, tokenService, userService } from "../services";
import catchAsync from "../utils/catchAsync";

export const login = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.findUserByEmail(req.body.email);
  await authService.login(user, req.body.password);
  const token = await tokenService.generateToken(user);
  res.json({ user, token });
});

export const register = catchAsync(async (req: Request, res: Response) => {
  const file: any = req.file;
  const user = await userService.createUser({
    ...req.body,
    id_proof: file.path,
  });
  const token = await tokenService.generateToken(user);
  res.json({ user, token });
});
