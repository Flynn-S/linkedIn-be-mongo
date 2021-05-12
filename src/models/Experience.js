import mongoose from "mongoose";
const { Schema, model } = mongoose;
const ExperienceSchema = new Schema(
  {
    role: { type: String },
    company: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
    area: { type: String },
    profileId: { type: String },
    image: {
      type: String,
      default:
        "https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg",
    },
  },
  { timestamps: true }
);

export default model("Experience", ExperienceSchema);

/*{
    "_id": "5d925e677360c41e0046d1f5",  //server generated
    "role": "CTO",
    "company": "Strive School",
    "startDate": "2019-06-16T22:00:00.000Z",
    "endDate": "2019-06-16T22:00:00.000Z", //could be null
    "description": "Doing stuff here and there",
    "area": "Berlin",
    "username": "admin",
    "createdAt": "2019-09-30T19:58:31.019Z",  //server generated
    "updatedAt": "2019-09-30T19:58:31.019Z",  //server generated
    "image": ... //server generated on upload, set a default here
}*/
