import User from "../models/user.model.js";
import bcrypt from "bcrypt";
export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "username is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `Account already exists with ${email} !  please login`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).json({
      success: true,
      message: `Welcome ${user.name} in our youTube clone! you have successfully created an account.`,
    });
  } catch (error) {
    console.log(
      `Something went wrong on Register User ! err : ${error.message}`
    );
    return res.status(500).json({
      success: false,
      message: `Something went wrong on Register User ! err : ${error.message}`,
    });
  }
};
