import jwt from "jsonwebtoken";
import { User } from '../models/user.js'
import { CustomError } from '../utils/customError.js'

const isLoggedIn = async (req, res, next) => {

  try {
    // const token = req.cookies.token || req.headers['x-access-token'] || req.header("Authorization")?.replace("Bearer", "")
    const token = req.header("Authorization")?.replace("Bearer", "")
    // const token = req.header("Authorization")

    if (!token) {
      return next(new CustomError("Login first to access this page", 400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id)

    next();
  } catch (err) {
    res.status(400).json({ message: "unauthorised" });
  }
}

export { isLoggedIn }
