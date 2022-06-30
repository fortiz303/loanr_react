import config from "../config/config";
import { Router } from "express";

import docsRoute from "./docs.route";
import authRouter from "./auth.route";
import loanRouter from "./loan.route";

const router = Router();

const routes = [
  { path: "/auth", router: authRouter },
  { path: "/loans", router: loanRouter },
];

if (config.env === "development") {
  router.use("/docs", docsRoute);
}

routes.forEach((obj) => {
  return router.use(obj.path, obj.router);
});

export default router;
