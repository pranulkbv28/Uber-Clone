import Blacklist from "../models/blacklist.model.js";
import User from "../models/user.model.js";
import { ErrorApiResponse } from "../services/ApiResponse.service.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, _res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization").split(" ")[1];

    if (!token) throw new ErrorApiResponse(401, "Unauthorized request!");

    const isBlacklisted = await Blacklist.findOne({ token });

    if (isBlacklisted) throw new ErrorApiResponse(401, "Unauthorized request!");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) throw new ErrorApiResponse(401, "Invalid Token!");

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(500, `User not found: ${error.message}`));
  }
};

export default verifyJWT;
