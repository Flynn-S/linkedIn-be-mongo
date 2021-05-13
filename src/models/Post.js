import mongoose from 'mongoose';
const { Schema, model } = mongoose;
export const PostSchema = new Schema(
  {
    text: { type: String, required: true },
    username: { type: String },
    profile: { type: Schema.Types.ObjectId, required: true, ref: 'Profile' },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model('Post', PostSchema);

/*
TEXT USERNAME USER ID
PASS IN BODY THE TEXT; USERNAME
FIND OBJECT ID, EXTRACT THE USERNAME AND TEXT FROM REQ.BODY THEN WITH USERNAME PERFORM A QUERY ON PROFILE SO YOU GOT BACK THE PROFILE WITH THAT USERNAME FROM THAT PROFILE YOU GET ID = PROFILE
NOW YOU HAVE THE TEXT USER AND ID(PROFILE) 
POST CREATE; PAST AN OBJECT TEXT USERNAME, PRofile will be id

const {username, text}= req.body
userrname => query on profile => profile with that username and
{_id} = profile 
Post.create {{text: text,username: username,profile: id}}



//USER ARRAY SHOULD BE TAKEN FROM PROFILE SCHEMA
/*{
    "_id": "5d93ac84b86e220017e76ae1", //server generated
    "text": "this is a text 12312 1 3 1",  <<--- THIS IS THE ONLY ONE YOU'LL BE SENDING!!!
    "username": "admin",
    "user": {
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
    }
    "createdAt": "2019-10-01T19:44:04.496Z", //server generated
    "updatedAt": "2019-10-01T19:44:04.496Z", //server generated
    "image": ... //server generated on upload, set a default here
}*/
