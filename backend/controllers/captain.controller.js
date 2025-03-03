import Captain from "../models/captain.model.js";
import Vehicle from "../models/vehicle.model.js";
import {
  ErrorApiResponse,
  SuccessApiResponse,
} from "../services/ApiResponse.service.js";
import fieldValidation from "../services/fieldsValidator.service.js";

export const registerCaptain = async (req, res) => {
  try {
    const {
      fullname,
      email,
      password,
      vehicleType,
      color,
      numberPlate,
      capacity,
    } = req.body;
    const { firstname, lastname } = fullname;

    const isValidRequest = fieldValidation({
      firstname,
      lastname,
      email,
      password,
      vehicleType,
      color,
      numberPlate,
      capacity,
    });

    if (!isValidRequest) {
      throw res
        .status(400)
        .json(new ErrorApiResponse(400, "All fields are required"));
    }

    const existingCaptain = await Captain.findOne({ email });
    if (existingCaptain) {
      throw res
        .status(400)
        .json(new ErrorApiResponse(400, "Captain already exists"));
    }

    const existingVehicle = await Vehicle.findOne({ numberPlate });
    if (existingVehicle) {
      throw res
        .status(400)
        .json(new ErrorApiResponse(400, "Vehicle already exists"));
    }

    const hashedPassword = await Captain.hashPassword(password);

    const vehicle = await Vehicle.create({
      vehicleType,
      color,
      numberPlate,
      capacity,
    });

    const captain = await Captain.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashedPassword,
      vehicle: vehicle._id,
    });

    const token = await captain.generateAuthToken();

    const createdCaptain = Captain.findById(captain._id).select("-password");

    return res
      .status(201)
      .json(
        new SuccessApiResponse(
          201,
          { createdCaptain, token },
          "Captain created successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new ErrorApiResponse(
          500,
          `Something went wrong while creating a captain: ${error.message}`
        )
      );
  }
};

export const loginCaptain = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isValidRequest = fieldValidation({ email, password });

    if (!isValidRequest)
      throw res
        .status(400)
        .json(new ErrorApiResponse(400, "All fields are required!!"));

    const captain = await Captain.findOne({ email });

    if (!captain)
      throw res
        .status(404)
        .json(new ErrorApiResponse(404, "Captain not found!!"));

    const isPasswordValid = await captain.comparePassword(password);

    if (!isPasswordValid)
      throw res
        .status(401)
        .json(new ErrorApiResponse(401, "Invalid credentials!!"));

    const loggedInCaptain = await Captain.findById(captain._id).select(
      "-password"
    );

    const token = await captain.generateAuthToken();

    return res
      .status(200)
      .json(
        new SuccessApiResponse(
          200,
          { loggedInCaptain, token },
          "Captain logged in successfully!!"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new ErrorApiResponse(
          500,
          `Something went wrong while logging in a captain: ${error.message}`
        )
      );
  }
};

export const logoutCaptain = async (req, res) => {
  try {
    if (!req.user) {
      throw new ErrorApiResponse(401, "Unauthorized request");
    }

    const token =
      req.cookies?.token || req.header("Authorization").split(" ")[1];

    await Blacklist.create({ token });

    return res
      .status(200)
      .clearCookie("token")
      .json(new SuccessApiResponse(200, {}, "Captain logged out successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ErrorApiResponse(
          500,
          `Something went wrong while logging in a captain: ${error.message}`
        )
      );
  }
};

export const getCaptainProfile = async (req, res) => {
  res
    .status(200)
    .json(
      new SuccessApiResponse(
        200,
        { captain: req.user },
        "Captain profile retrieved successfully"
      )
    );
};
