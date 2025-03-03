import { Schema, model } from "mongoose";

const vehicleSchema = new Schema(
  {
    vehicleType: {
      type: String,
      enum: ["Car", "Auto", "Bike"],
      default: "Car",
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    numberPlate: {
      type: String,
      required: true,
      unique: true,
      minlength: [8, "Number plate should be at least 8 characters long"],
      index: true,
    },
    capacity: {
      type: Number,
      required: true,
      minlength: [1, "Capacity should be at least 1"],
    },
  },
  { timestamps: true }
);

const Vehicle = model("Vehicle", vehicleSchema);

export default Vehicle;
