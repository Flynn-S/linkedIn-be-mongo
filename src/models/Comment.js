import mongoose from 'mongoose';
const { model, Schema } = mongoose;

export const CommentSchema = new Schema(
  {
    comment: { type: String, trim: true, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    userWhoCommented: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Profile',
    },
  },
  { timestamps: true }
);

export default model('Comment', CommentSchema);
