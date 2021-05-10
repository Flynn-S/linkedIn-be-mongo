import asyncHandler from '../utilities/asyncHandler.js';

// - GET https://yourapi.herokuapp.com/api/profile/userName/experiences
// Get user experiences
export const getUserExperiences = asyncHandler(async (req, res, next) => {});

// - POST https://yourapi.herokuapp.com/api/profile/userName/experiences
// Create an experience.
export const createExperience = asyncHandler(async (req, res, next) => {});

// - GET https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId
// Get a specific experience
export const getSingleExperience = asyncHandler(async (req, res, next) => {});

// - PUT https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId
// Edit a specific experience
export const modifyExperience = asyncHandler(async (req, res, next) => {});

// - DELETE https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId
// Delete a specific experience
export const deleteExperience = asyncHandler(async (req, res, next) => {});

// - POST https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId/picture
// Change the experience picture
export const uploadExperiencePic = asyncHandler(async (req, res, next) => {});

// - GET https://yourapi.herokuapp.com/api/profile/userName/experiences/CSV
// Download the experiences as a CSV
export const getExperciencesCSV = asyncHandler(async (req, res, next) => {});
