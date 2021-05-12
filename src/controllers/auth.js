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
  // const token = user.getSignedJwtToken();
  // res.status(200).send({ success: true, token });
  sendTokenResponse(user, 200, res);
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
  // const token = user.getSignedJwtToken();
  // res.status(200).send({ success: true, token });
  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //create token
  const token = user.getSignedJwtToken();

  //create cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), // => 30 days from now
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') {
    options.secure = true; // => send cookie with https in production
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .send({ success: true, token });
};
