import { Router } from 'express';
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  getComments,
  getPost,
  getPosts,
  modifyComment,
  modifyPost,
  uploadPostPic,
} from '../controllers/posts.js';

const router = Router();

router.route('/').get(getPosts).post(createPost);
// GET POST AND CREATE POST

router
  .route('/:postId')
  .get(getPost)
  .put(modifyPost)
  .delete(deletePost)
  .post(uploadPostPic);
// GET singular Post // edit post // delete post // upload post picture

router.route('/:postId/comments').get(getComments).post(createComment);

router.route('/:postId/comments').post(createComment);

router.route('/:postId/comment/:commentId').post(deleteComment);

router.route('comments/:commentId').post(modifyComment);

export default router;
