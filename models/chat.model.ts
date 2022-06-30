import { Schema, model } from "mongoose";
import crypto from "crypto";
import { User, UserModel } from "./interfaces";
const schema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: false,
    },
    id_type: { type: String, required: true },
    id_proof: { type: String, required: true },

    number: { type: String, required: true },
    expiry: {
      type: Date,
      required: false,
    },
    role: { type: String, required: true, default: "user" },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

schema.statics.isEmailTaken = async function (email: string) {
  const user = await this.findOne({ email });
  return !!user;
};

schema.methods.isPasswordMatch = async function (password: string) {
  const user = this;
  const hash = crypto.createHash("sha256").update(password).digest("base64");
  return hash === user.password;
};

schema.pre("save", async function (next: any) {
  const user = this;
  if (user.isModified("password")) {
    user.password = crypto
      .createHash("sha256")
      .update(user.password)
      .digest("base64");
  }
  next();
});

const userModel = model<User, UserModel>("users", schema);
export default userModel;
