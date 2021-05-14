import asyncHandler from '../utilities/asyncHandler.js';
import PostModel from '../models/Post.js';
import ProfileModel from '../models/Profile.js';
import mongoose from 'mongoose';

//  - GET https://yourapi.herokuapp.com/api/posts/
// Retrieve posts
export const getPosts = asyncHandler(async (req, res, next) => {
  const posts = await PostModel.find()
    .populate({
      path: 'profile',
      model: ProfileModel,
    })
    .sort({ createdAt: -1 });
  res.send(posts);
});

// - POST https://yourapi.herokuapp.com/api/posts/
// Creates a new post
export const createPost = asyncHandler(async (req, res, next) => {
  const { profileId, text } = req.body;
  // const user = await ProfileModel.findOne({ username: username });
  const newPost = await PostModel.create({
    text: text,
    profile: mongoose.Types.ObjectId(profileId),
  });
  res.status(200).send(newPost);
});

// - GET https://yourapi.herokuapp.com/api/posts/:postId
// Retrieves the specified post
export const getPost = asyncHandler(async (req, res, next) => {
  const post = await PostModel.findById(req.params.postId);
  if (post) {
    res.status(200).send(post);
  } else {
    res.status(404).send(`Post with id ${req.params.postId} does not exist`);
  }
});

// - PUT https://yourapi.herokuapp.com/api/posts/:postId
// Edit a given post
export const modifyPost = asyncHandler(async (req, res, next) => {
  const newPost = { ...req.body };
  const post = await PostModel.findByIdAndUpdate(req.params.postId, newPost, {
    runValidators: true,
    new: true,
  });
  res.send(post);
});

// - DELETE https://yourapi.herokuapp.com/api/posts/:postId
// Removes a post
export const deletePost = asyncHandler(async (req, res, next) => {
  const post = await PostModel.findByIdAndDelete(req.params.postId);
  if (post) {
    res.send(`Post deleted`);
  } else {
    res.status(404).send(`Post with id ${req.params.postId} not found`);
  }
});

// - POST https://yourapi.herokuapp.com/api/posts/:postId
// Add an image to the post under the name of "post"
export const uploadPostPic = asyncHandler(async (req, res, next) => {
  const modPost = await PostModel.findByIdAndUpdate(
    req.params.postId,
    {
      image: req.file.path,
    },
    {
      runValidators: true,
      new: true,
    }
  );
  res.send(modPost);
});

// comments

// - POST https://striveschool-api.herokuapp.com/api/posts/:postId/like
// Like the post for current user (each user can like only once per post)
export const likePost = asyncHandler(async (req, res, next) => {
  res.send('likePost');
});

// - DELETE https://striveschool-api.herokuapp.com/api/posts/:postId/like
// Remove the like for current user
export const unlikePost = asyncHandler(async (req, res, next) => {
  res.send('unlikePost');
});

// - GET https://striveschool-api.herokuapp.com/api/posts/:postId/comment
// Retrieve the list of comments for a given post
export const getComments = asyncHandler(async (req, res, next) => {
  res.send('getComments');
});

// - POST https://striveschool-api.herokuapp.com/api/posts/:postId/comment
// Create the a new comment for a given post
export const createComment = asyncHandler(async (req, res, next) => {
  res.send('createComment');
});

// - DELETE https://striveschool-api.herokuapp.com/api/posts/:postId/comment/:commentId
// Deletes a given comment
export const deleteComment = asyncHandler(async (req, res, next) => {
  res.send('deleteComment');
});

// - PUT https://striveschool-api.herokuapp.com/api/posts/:postId/comment/:commentId
// Edit a given comment
export const modifyComment = asyncHandler(async (req, res, next) => {
  res.send('modifyComment');
});
