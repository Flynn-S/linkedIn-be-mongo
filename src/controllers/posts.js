import asyncHandler from "../utilities/asyncHandler.js";
import PostModel from "../models/Post.js";
import ProfileModel from "../models/Profile.js";
import CommentModel from "../models/Comment.js";
import LikeModel from "../models/Like.js";
import mongoose from "mongoose";

//  - GET https://yourapi.herokuapp.com/api/posts/
// Retrieve posts
export const getPosts = asyncHandler(async (req, res, next) => {
  const posts = await PostModel.find()
    .populate({
      path: "profile",
      model: ProfileModel,
    })
    .populate({
      path: "comments",
      ref: CommentModel,
      populate: [{ path: "userWhoCommented", model: ProfileModel }],
    })
    .sort({ createdAt: -1 });
  // const posts = await PostModel.find()
  //   .populate({
  //     path: 'profile',
  //     model: ProfileModel,
  //   })
  //   .populate({
  //     path: 'comment',
  //     model: CommentModel,
  //   })
  //   .sort({ createdAt: -1 });
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
  const newLike = await LikeModel.create({
    userWhoLiked: mongoose.Types.ObjectId(req.body.userWhoLiked),
    post: mongoose.Types.ObjectId(req.params.postId),
  });
  const { _id } = newLike;
  const modifiedPost = await PostModel.findByIdAndUpdate(
    req.params.postId,
    {
      $push: {
        likes: _id,
      },
    },
    { runValidators: true, new: true }
  );
  res.send(modifiedPost);
});

// - DELETE https://striveschool-api.herokuapp.com/api/posts/:postId/like
// Remove the like for current user
export const unlikePost = asyncHandler(async (req, res, next) => {
  res.send("unlikePost");
});

// - GET https://striveschool-api.herokuapp.com/api/posts/:postId/comment
// Retrieve the list of comments for a given post
export const getComments = asyncHandler(async (req, res, next) => {
  res.send("getComments");
});

// - POST https://striveschool-api.herokuapp.com/api/posts/:postId/comment
// Create the a new comment for a given post
export const createComment = asyncHandler(async (req, res, next) => {
  const newComment = await CommentModel.create({
    comment: req.body.comment,
    userWhoCommented: mongoose.Types.ObjectId(req.body.userWhoCommented),
    post: mongoose.Types.ObjectId(req.params.postId),
  });
  const { _id } = newComment;
  const modifiedPost = await PostModel.findByIdAndUpdate(req.params.postId, {
    $push: {
      comments: _id,
    },
  });
  res.status(200).send(newComment);
});

// - DELETE https://striveschool-api.herokuapp.com/api/posts/:postId/comment/:commentId
// Deletes a given comment
export const deleteComment = asyncHandler(async (req, res, next) => {
  const { postId, commentId } = req.params;
  console.log(postId, commentId);
  await CommentModel.findByIdAndDelete(commentId);
  await PostModel.findByIdAndUpdate(postId, {
    $pull: {
      comments: { _id: mongoose.Types.ObjectId(commentId) },
    },
  });
  res.status(200).send("deleted");
});

// - PUT https://striveschool-api.herokuapp.com/api/posts/comments/:commentId
// Edit a given comment
export const modifyComment = asyncHandler(async (req, res, next) => {
  const { postId, commentId } = req.params;
  console.log(postId, commentId);
  const modified = await CommentModel.findByIdAndUpdate(
    commentId,
    {
      ...req.body,
    },
    { runValidators: true, new: true }
  );

  res.status(200).send(modified);
});
