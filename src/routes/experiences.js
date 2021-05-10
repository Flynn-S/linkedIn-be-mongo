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

const router = Router();

router.route("/").get(getUserExperiences).post(createExperience);
// GET POST AND UPDATE PROFILE

router
  .route("/:expId")
  .get(getSingleExperience)
  .put(modifyExperience)
  .delete(deleteExperience);
// GET 1 PROFILE WHICH MATCHES USERID

router.route("/:expId/picture").post(uploadExperiencePic);
// Uploads an experience photo

router.route("/CSV").get(getExperciencesCSV);
//Download user experiences as a CSV file

export default router;
