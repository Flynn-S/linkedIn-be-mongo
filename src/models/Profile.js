import mongoose from 'mongoose';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { Schema, model } = mongoose;
const ProfileSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    surname: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },

    bio: { type: String },
    title: { type: String },
    image: {
      type: String,
      default:
        'https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg',
    },
    password: {
      type: String,
      required: [true, 'Please add a Password'],
      minlength: 6,
      select: false, //doesnt show the password when fetching profile
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    area: { type: String },
    username: { type: String },
    experiences: [{ type: Schema.Types.ObjectId, ref: 'Experience' }],
  },
  { timestamps: true }
);

/*{
    "_id": "5d84937322b7b54d848eb41b", //server generated
    "name": "Diego",
    "surname": "Banovaz",
    "email": "diego@strive.school",
    "bio": "SW ENG",
    "title": "COO @ Strive School",
    "area": "Berlin",
    "image": ..., //server generated on upload, set a default here
    "username": "admin",
    "createdAt": "2019-09-20T08:53:07.094Z", //server generated
    "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
}*/

// encrypt password using bcrypt
ProfileSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign JWT and return
ProfileSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Match user entered password to hashed password => true or false
ProfileSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default model('Profile', ProfileSchema);
