import Profile from '../models/Profile.js';
import asyncHandler from '../utilities/asyncHandler.js';

// - GET https://yourapi.herokuapp.com/api/profile/
// Retrieves list of profiles
export const getProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find({}, { experiences: 0 });

  res.status(200).send(profiles);
});

// - GET https://yourapi.herokuapp.com/api/profile/{userId}
// Retrieves the profile with userId = {userId}
export const getProfile = asyncHandler(async (req, res, next) => {});

// - POST https://yourapi.herokuapp.com/api/profile/
// Create the user profile with all his details
export const createProfile = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.insertMany(req.body);
  res.send('ok');
});

// - PUT https://yourapi.herokuapp.com/api/profile/
// Update current user profile details
export const modifyProfile = asyncHandler(async (req, res, next) => {});

// - POST https://yourapi.herokuapp.com/api/profile/{userId}/picture
// Replace user profile picture (name = profile)
export const uploadProfilePic = asyncHandler(async (req, res, next) => {});

// - GET https://yourapi.herokuapp.com/api/profile/{userId}/CV
// Generates and download a PDF with the CV of the user (details, picture, experiences)
export const getProfilePdfCV = asyncHandler(async (req, res, next) => {});
