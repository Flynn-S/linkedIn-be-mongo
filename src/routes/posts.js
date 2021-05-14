import { Router } from 'express';
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  modifyPost,
  uploadPostPic,
} from '../controllers/posts.js';
import {
  likePost,
  unlikePost,
  getComments,
  createComment,
  deleteComment,
  modifyComment,
} from '../controllers/posts.js';
import multerUpload from '../middlewares/pictures/pictureUpload.js';
const upload = multerUpload();

const router = Router();

router.route('/').get(getPosts).post(createPost);
// GET POST AND CREATE POST

router
  .route('/:postId')
  .get(getPost)
  .put(modifyPost)
  .delete(deletePost)
  .post(upload, uploadPostPic);
// GET singular Post // edit post // delete post // upload post picture

// likes
router.route('/:postId/like').post(likePost).delete(unlikePost);

// comments
router.route('/:postId/comments').get(getComments).post(createComment);

router
  .route('/:postId/comments/:commentId')
  .delete(deleteComment)
  .put(modifyComment);

router.route('/comments/:commentId').put(modifyComment);

export default router;
