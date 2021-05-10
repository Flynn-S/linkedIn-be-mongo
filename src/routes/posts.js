import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  modifyPost,
  uploadPostPic,
} from "../controllers/posts";

const router = Router();

router.route("/").get(getPosts).post(createPost);
// GET POST AND CREATE POST

router
  .route("/:postId")
  .get(getPost)
  .put(modifyPost)
  .delete(deletePost)
  .post(uploadPostPic);
// GET singular Post // edit post // delete post // upload post picture

export default router;
