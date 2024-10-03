import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.Token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access!  Please login first",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token!!  Please login first",
      });
    }
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log(`Something went wrong on login User! err : ${error.message}`);
    return res.status(500).json({
      success: false,
      message: `Something went wrong on login User! err : ${error.message}`,
    });
  }
};

export default isAuthenticated;

 