import { Router } from 'express';
import {
  createProfile,
  getProfile,
  getProfilePdfCV,
  getProfiles,
  modifyProfile,
  uploadProfilePic,
} from '../controllers/profiles.js';

const router = Router();

router.route('/').get(getProfiles).post(createProfile).put(modifyProfile);
// GET POST AND UPDATE PROFILE

router.route('/:userId').get(getProfile);
// GET 1 PROFILE WHICH MATCHES USERID

router.route('/:userId/picture').post(uploadProfilePic);
// Uploads a profile photo

router.route('/:userId/CV').get(getProfilePdfCV);
//Generates and download a PDF with the CV of the user (details, picture, experiences)

export default router;
