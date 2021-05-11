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
} from "../controllers/profiles.js";

const router = Router();

router.route("/").get(getProfiles).post(createProfile).put(modifyProfile);
// GET POST AND UPDATE PROFILE

router.route("/:profileId").get(getProfile);
// GET 1 PROFILE WHICH MATCHES profileId

router.route("/:profileId/picture").post(uploadProfilePic);
// Uploads a profile photo

router.route("/:profileId/CV").get(getProfilePdfCV);
//Generates and download a PDF with the CV of the user (details, picture, experiences)

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
//Download user experiences as a CSV file

export default router;
