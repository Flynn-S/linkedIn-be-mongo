import asyncHandler from '../utilities/asyncHandler.js';
import Profile from '../models/Profile.js';
import ErrorResponse from '../utilities/errorResponse.js';

// register user
// POST /api/auth/register

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

// login user
// GET /api/auth/login

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validate email & pass
  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password!', 400));
  }

  //check for user
  const user = await Profile.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  //check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  //create token
  const token = user.getSignedJwtToken();

  res.status(200).send({ success: true, token });
});
