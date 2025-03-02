import { cookieOptions } from "../constants.js";
import User from "../models/user.model.js";
import {
  ErrorApiResponse,
  SuccessApiResponse,
} from "../services/ApiResponse.service.js";
import fieldValidation from "../services/fieldsValidator.service.js";

export const createUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const { firstname, lastname } = fullname;

    const validRequest = fieldValidation({
      firstname,
      lastname,
      email,
      password,
    });

    if (!validRequest) {
      throw new ErrorApiResponse(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ErrorApiResponse(409, "User with email already exists");
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await User.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashedPassword,
    });

    const token = await user.generateAuthToken();

    const createdUser = await User.findById(user._id).select("-password");

    return res
      .status(201)
      .cookie("token", token, cookieOptions)
      .json(
        new SuccessApiResponse(
          201,
          { createdUser, token },
          "User created successfully"
        )
      );
  } catch (error) {
    throw new ErrorApiResponse(
      500,
      `Something went wrong while creating a user: ${error.message}`
    );
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validRequest = fieldValidation({ email, password });

    if (!validRequest) {
      throw new ErrorApiResponse(400, "All fields are required");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ErrorApiResponse(404, "User not found");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new ErrorApiResponse(401, "Invalid credentials");
    }

    const token = await user.generateAuthToken();

    const loggedInUser = await User.findById(user._id).select("-password");

    return res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json(
        new SuccessApiResponse(
          200,
          { loggedInUser, token },
          "User logged in successfully"
        )
      );
  } catch (error) {
    throw new ErrorApiResponse(
      500,
      `Something went wrong while logging in: ${error.message}`
    );
  }
};

export const logoutUser = async (req, res) => {
  try {
    if (!req.user) {
      throw new ErrorApiResponse(401, "Unauthorized request");
    }

    return res
      .status(200)
      .clearCookie("token")
      .json(new SuccessApiResponse(200, {}, "User logged out successfully"));
  } catch (error) {
    throw new ErrorApiResponse(
      500,
      `Something went wrong while logging out: ${error.message}`
    );
  }
};
