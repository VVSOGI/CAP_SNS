import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as postController from "../controller/post.js";
import { isAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

const validatePost = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("세 글자 이상은 작성해야합니다."),
  validate,
];

// GET /posts
// GET /posts?username=:username
router.get("/", isAuth, postController.getPosts);

// GET /posts/:id
router.get("/:id", isAuth, postController.getById);

// POST /posts
router.post("/", isAuth, validatePost, postController.create);

// PUT /posts/:id
router.put("/:id", isAuth, validatePost, postController.update);

// DELETE /posts/:id
router.delete("/:id", isAuth, postController.remove);

export default router;
