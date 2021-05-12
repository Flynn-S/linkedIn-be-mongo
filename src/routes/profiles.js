import { Router } from 'express';
import {
  createExperience,
  deleteExperience,
  getExperciencesCSV,
  getSingleExperience,
  getUserExperiences,
  modifyExperience,
  uploadExperiencePic,
} from '../controllers/experiences.js';
import {
  createProfile,
  getProfile,
  getProfilePdfCV,
  getProfiles,
  modifyProfile,
  uploadProfilePic,
  getLoggedUser,
} from '../controllers/profiles.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.route('/me').get(protect, getLoggedUser);

router.route('/').get(getProfiles).post(createProfile).put(modifyProfile);
// GET POST AND UPDATE PROFILE

router.route('/:userId').get(getProfile);
// GET 1 PROFILE WHICH MATCHES USERID

router.route('/:userId/picture').post(uploadProfilePic);
// Uploads a profile photo

router.route('/:userId/CV').get(getProfilePdfCV);
//Generates and download a PDF with the CV of the user (details, picture, experiences)

router
  .route('/userName/experiences')
  .get(getUserExperiences)
  .post(createExperience);
// GET POST AND UPDATE PROFILE

router
  .route('/userName/experiences/:expId')
  .get(getSingleExperience)
  .put(modifyExperience)
  .delete(deleteExperience);

router.route('/userName/experiences/:expId/picture').post(uploadExperiencePic);
// Uploads an experience photo

router.route('/userName/experiences/CSV').get(getExperciencesCSV);
//Download user experiences as a CSV file

export default router;
