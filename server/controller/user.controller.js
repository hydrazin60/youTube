import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
        message: `Account already exists with ${email}  please login!!`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // const user = new User({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });
    // await user.save();
    const user = User.create({
      name,
      email,
      password: hashedPassword,
    });

    const userData = (await user).toObject();
    delete userData.password;
    return res.status(201).json({
      success: true,
      message: `Welcome ${user.name} in our youTube clone! you have successfully created an account.`,
      userData,
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

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with this email!! please register first",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "incorrect password!! please try again",
      });
    }

    const userData = user.toObject();
    delete userData.password;

    const Token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "360d",
    });
    return res
      .cookie("Token", Token, {
        httpOnly: true,
        samesite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 360,
      })
      .json({
        success: true,
        message: `Welcome ${user.name} in our youTube clone! you have successfully logged in.`,
        userData,
      });
  } catch (error) {
    console.log(
      `Something went wrong on Register User! err : ${error.message}`
    );
    return res.status(500).json({
      success: false,
      message: `Something went wrong on Register User! err : ${error.message}`,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    return res
      .clearCookie("Token", "", {
        httpOnly: true,
        samesite: "none",
        secure: true,
      })
      .json({
        success: true,
        message: "you have successfully logged out",
      });
  } catch (error) {
    console.log(`Something went wrong on logout User! err : ${error.message}`);
    return res.status(500).json({
      success: false,
      message: `Something went wrong on logout User! err : ${error.message}`,
    });
  }
};


 
