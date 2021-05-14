import mongoose from 'mongoose';
const { model, Schema } = mongoose;

export const LikeSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
    userWhoLiked: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Profile',
    },
  },
  { timestamps: true }
);

export default model('Like', LikeSchema);
