import asyncHandler from '../utilities/asyncHandler.js';
import Profile from '../models/Profile.js';
import ErrorResponse from '../utilities/errorResponse.js';

// register user
// GET /api/auth/register
// access user

export const register = asyncHandler(async (req, res, next) => {
  const { name, surname, email, password } = req.body;

  //create user
  const user = await Profile.create({
    name,
    surname,
    email,
    password,
  });

  //create token
  const token = user.getSignedJwtToken();

  res.status(200).send({ success: true, token });
});
