import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "Firstname should be at least 3 characters long"],
      },
      lastname: {
        type: String,
        minlength: [3, "Lastname should be at least 3 characters long"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    socketId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    location: {
      lat: {
        type: Number,
      },
      long: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

captainSchema.methods.generateAuthToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

captainSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const Captain = model("Captain", captainSchema);

export default Captain;
