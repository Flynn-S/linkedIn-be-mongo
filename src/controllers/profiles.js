import Profile from '../models/Profile.js';
import asyncHandler from '../utilities/asyncHandler.js';

import Experience from '../models/Experience.js';
import { generatePdf } from '../utilities/pdf.js';
import { pipeline } from 'stream';

// - GET https://yourapi.herokuapp.com/api/profile/me
// Retrieves current logged user
export const getLoggedUser = asyncHandler(async (req, res, next) => {
  const user = await Profile.findById(req.user.id);
  res.send(user);
});

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
  // if (!modified) {
  //   return next(new ErrorResponse(`resource not found with that id`, 404));
  // }
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

// - POST https://yourapi.herokuapp.com/api/profile/:profileId/picture
// Replace user profile picture (name = profile)
export const uploadProfilePic = asyncHandler(async (req, res, next) => {
  const modified = await Profile.findByIdAndUpdate(
    req.params.profileId,
    {
      image: req.file.path,
    },
    { runValidators: true, new: true }
  );
  res.status(200).send(modified);
});

// - GET https://yourapi.herokuapp.com/api/profile/:profileId/CV
// Generates and download a PDF with the CV of the user (details, picture, experiences)
export const getProfilePdfCV = asyncHandler(async (req, res, next) => {
  //find the object and populate it
  const data = await Profile.findById(req.params.profileId).populate({
    path: 'experiences',
    model: Experience,
  });
  const sourceStream = await generatePdf(data);
  res.attachment(`${data.name} ${data.surname} CV.pdf`);
  // res.setHeader('Content-Type', 'application/pdf');
  pipeline(sourceStream, res, () => console.log('done'));
  // res.status(200).send(data);
});
