import { Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullName: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "First Name must be at least 3 characters long"],
      },
      lastname: {
        type: String,
        minlength: [3, "Last Name must be at least 3 characters long"],
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
    },
    // role: {
    //   type: String,
    //   enum: ["user", "admin"],
    //   default: "user",
    // },
    // avatar: {
    //   type: String,
    // },
    // contact: {
    //   type: String,
    // },
    // about: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET
    // {
    //     expiresIn: "1d"
    // }
  );

  return token;
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const User = Model("User", userSchema);

export default User;
