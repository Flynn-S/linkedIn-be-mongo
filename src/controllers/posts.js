import asyncHandler from '../utilities/asyncHandler.js';
import PostModel from '../models/Post.js';
import ProfileModel from '../models/Profile.js';

//  - GET https://yourapi.herokuapp.com/api/posts/
// Retrieve posts
export const getPosts = asyncHandler(async (req, res, next) => {
  const posts = await PostModel.find().populate({
    path: 'profile',
    model: ProfileModel,
  });
  res.send(posts);
});

// - POST https://yourapi.herokuapp.com/api/posts/
// Creates a new post
export const createPost = asyncHandler(async (req, res, next) => {
  const { username, text } = req.body;
  const user = await ProfileModel.findOne({ username: username });
  const newPost = await PostModel.create({
    text: text,
    username: username,
    profile: user._id,
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
