import asyncHandler from "../utilities/asyncHandler.js";
import mongoose from "mongoose";

import ExperienceModel from "../models/Experience.js";
import ProfileModel from "../models/Profile.js";
import ErrorResponse from "../utilities/errorResponse.js";

// - GET https://yourapi.herokuapp.com/api/profile/:profileId/experiences
// Get user experiences
export const getUserExperiences = asyncHandler(async (req, res, next) => {
  const allUserExperiences = await ExperienceModel.find({
    profileId: { $eq: req.params.profileId },
  });
  res.status(200).send({ success: true, data: allUserExperiences });
});

// - POST https://yourapi.herokuapp.com/api/profile/:profileId/experiences
// Create an experience.
export const createExperience = asyncHandler(async (req, res, next) => {
  const data = new ExperienceModel({
    ...req.body,
    profileId: req.params.profileId,
  });
  const newExp = await data.save();

  console.log(newExp);

  const profiles = await ProfileModel.findOneAndUpdate(
    { _id: req.params.profileId },
    { $push: { experiences: newExp._id } },
    { runValidators: true, new: true, projection: { experiences: 1 } }
  );

  res.status(201).send(newExp);
});

// - GET https://yourapi.herokuapp.com/api/profile/:profileId/experiences/:expId
// Get a specific experience
export const getSingleExperience = asyncHandler(async (req, res, next) => {
  const userExperience = await ExperienceModel.findOne({
    _id: mongoose.Types.ObjectId(req.params.expId),
  });
  if (userExperience) {
    res.send(userExperience);
  }
});

// - PUT https://yourapi.herokuapp.com/api/profile/:profileId/experiences/:expId
// Edit a specific experience
export const modifyExperience = asyncHandler(async (req, res, next) => {});

// - DELETE https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId
// Delete a specific experience
export const deleteExperience = asyncHandler(async (req, res, next) => {
  const experienceToDelete = await ExperienceModel.findOneAndDelete({
    _id: mongoose.Types.ObjectId(req.params.expId),
  });
  if (experienceToDelete) {
    res.status(202).send("deleted successfully");
  } else {
    const error = new ErrorResponse(
      `Experience with id ${req.params.expId} not found`,
      404
    );
    next(error);
  }
});

// - POST https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId/picture
// Change the experience picture
export const uploadExperiencePic = asyncHandler(async (req, res, next) => {});

// - GET https://yourapi.herokuapp.com/api/profile/userName/experiences/CSV
// Download the experiences as a CSV
export const getExperciencesCSV = asyncHandler(async (req, res, next) => {});
