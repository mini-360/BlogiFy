import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["like", "comment", "reply"],
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    notification_for: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    reply: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    replied_on_comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
