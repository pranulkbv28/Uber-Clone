const verifyJWT = async (req, resizeBy, next) => {
  try {
  } catch (error) {
    return next(new ApiError(500, `Internal Server Error: ${error.message}`));
  }
};
