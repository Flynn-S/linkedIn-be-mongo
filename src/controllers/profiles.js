import Profile from '../models/Profile.js';
import asyncHandler from '../utilities/asyncHandler.js';
import Experience from '../models/Experience.js';
// - GET https://yourapi.herokuapp.com/api/profile/
// Retrieves list of profiles
export const getProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find({}, { experiences: 0 });
  res.status(200).send(profiles);
});

// - GET https://yourapi.herokuapp.com/api/profile/:profileId
// Retrieves the profile with userId = :profileId
export const getProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.profileId).populate({
    path: 'experiences',
    model: Experience,
  });
  if (!modified) {
    return next(new ErrorResponse(`resource not found with that id`, 404));
  }
  res.status(200).send(profile);
});

// - POST https://yourapi.herokuapp.com/api/profile/
// Create the user profile with all his details
export const createProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.create(req.body);
  const { _id } = profile;
  res.status(201).send({ _id });
});

// - PUT https://yourapi.herokuapp.com/api/profile/:profileId
// Update current user profile details
export const modifyProfile = asyncHandler(async (req, res, next) => {
  const modified = await Profile.findByIdAndUpdate(
    req.params.profileId,
    req.body,
    { runValidators: true, new: true }
  );
  if (!modified) {
    return next(new ErrorResponse(`resource not found with that id`, 404));
  }
  res.status(200).send(modified);
});

// - POST https://yourapi.herokuapp.com/api/profile/{userId}/picture
// Replace user profile picture (name = profile)
export const uploadProfilePic = asyncHandler(async (req, res, next) => {});

// - GET https://yourapi.herokuapp.com/api/profile/{userId}/CV
// Generates and download a PDF with the CV of the user (details, picture, experiences)
export const getProfilePdfCV = asyncHandler(async (req, res, next) => {});
