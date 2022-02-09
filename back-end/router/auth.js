import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as authController from "../controller/auth.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateCredential = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("유저 네임은 적어도 5개 이상 작성해야 합니다."),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("비밀번호는 적어도 5개 이상 작성해야 합니다."),
  validate,
];

const validateSignUp = [
  body("name").notEmpty().withMessage("이름을 작성해주세요."),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("이메일의 형식을 지켜주세요."),
  body("url")
    .isURL()
    .withMessage("URL이 아닙니다.")
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];

router.post("/signup", validateSignUp, authController.signup);

router.post("/login", validateCredential, authController.login);

router.get("/me", isAuth, authController.me);

export default router;
