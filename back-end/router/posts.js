import express from "express";
import "express-async-errors";
import * as postController from "../controller/post.js";

const router = express.Router();

// GET /posts
// GET /posts?username=:username
router.get("/", postController.getPosts);

// GET /posts/:id
router.get("/:id", postController.getById);

// POST /posts
router.post("/", postController.create);

// PUT /posts/:id
router.put("/:id", postController.update);

// DELETE /posts/:id
router.delete("/:id", postController.remove);

export default router;
