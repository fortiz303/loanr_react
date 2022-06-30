import { Router } from "express";
import { loanController } from "../controllers";
import auth from "../middlewares/auth";
import validate from "../middlewares/validate";
import { loanValidation } from "../validations";
import upload from "../middlewares/multer";
const router = Router();

router.get("/", auth("loan"), loanController.getLoans);
router.post(
  "/",
  auth("loan"),
  upload.array("collateral_images"),
  validate(loanValidation.createRequest),
  loanController.createLoan
);
router.put(
  "/:id",
  auth("loan"),
  validate(loanValidation.getLoanById),
  loanController.grantLoan
);
router.get(
  "/:id",
  auth("loan"),
  validate(loanValidation.getLoanById),
  loanController.getLoanById
);

export default router;
