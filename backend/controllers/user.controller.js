import { SuccessApiResponse } from "../services/ApiResponse.service"

export const getUserProfile = async (req, res) => {
    res.status(200).json(new SuccessApiResponse(200, { user: req.user }, "User profile fetched successfully!!"))
}