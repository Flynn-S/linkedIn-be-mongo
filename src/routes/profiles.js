import { Router } from "express";
import {
  createExperience,
  deleteExperience,
  getExperciencesCSV,
  getSingleExperience,
  getUserExperiences,
  modifyExperience,
  uploadExperiencePic,
} from "../controllers/experiences.js";
import {
  createProfile,
  getProfile,
  getProfilePdfCV,
  getProfiles,
  modifyProfile,
  uploadProfilePic,
  getLoggedUser,
} from "../controllers/profiles.js";
import { protect } from "../middlewares/auth.js";

import multerUpload from "../middlewares/pictures/pictureUpload.js";
const upload = multerUpload();

const router = Router();

router.route("/me").get(protect, getLoggedUser);

router.route("/").get(getProfiles).post(createProfile);
// GET POST AND UPDATE PROFILE

router.route("/:profileId").get(getProfile).put(modifyProfile);
// GET 1 PROFILE WHICH MATCHES USERID

router.route("/:profileId/picture").post(upload, uploadProfilePic);
// Uploads a profile photo

router.route("/:profileId/CV").get(getProfilePdfCV);
//Generates and download a PDF with the CV of the user (details, picture, experiences)

router.route("/:profileId/experiences");

router
  .route("/:profileId/experiences")
  .get(getUserExperiences)
  .post(createExperience);
// GET POST AND UPDATE PROFILE

router
  .route("/:profileId/experiences/:expId")
  .get(getSingleExperience)
  .put(modifyExperience)
  .delete(deleteExperience);

router
  .route("/:profileId/experiences/:expId/picture")
  .post(uploadExperiencePic);
// Uploads an experience photo

router.route("/:profileId/experiences/CSV").get(getExperciencesCSV);
// Uploads an experience photo

//Download user experiences as a CSV file

export default router;
