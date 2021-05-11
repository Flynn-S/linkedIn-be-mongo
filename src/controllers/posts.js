import asyncHandler from '../utilities/asyncHandler.js';

//  - GET https://yourapi.herokuapp.com/api/posts/
// Retrieve posts
export const getPosts = asyncHandler(async (req, res, next) => {});

// - POST https://yourapi.herokuapp.com/api/posts/
// Creates a new post
export const createPost = asyncHandler(async (req, res, next) => {});

// - GET https://yourapi.herokuapp.com/api/posts/:postId
// Retrieves the specified post
export const getPost = asyncHandler(async (req, res, next) => {});

// - PUT https://yourapi.herokuapp.com/api/posts/:postId
// Edit a given post
export const modifyPost = asyncHandler(async (req, res, next) => {});

// - DELETE https://yourapi.herokuapp.com/api/posts/:postId
// Removes a post
export const deletePost = asyncHandler(async (req, res, next) => {});

// - POST https://yourapi.herokuapp.com/api/posts/:postId
// Add an image to the post under the name of "post"
export const uploadPostPic = asyncHandler(async (req, res, next) => {});
