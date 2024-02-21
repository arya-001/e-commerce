import mongoose from "mongoose";
import { comparePassword, hashPassword } from "../helpers/helper.js";
import userModel from "../models/userModel.js"; // adjust the path as needed
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//registerController//
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    console.log(req.body);
    //validation
    for (const [key, value] of Object.entries(req.body)) {
      if (!value) {
        return res.status(400).json({ error: `${key} is required` });
      }
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "Already Registered User Please Login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    }).save();
    res
      .status(201)
      .json({ success: true, message: "Registration Successfull", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: " Error in registration", error });
  }
};
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not registered" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      success: true,
      message: "Log successfull",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error Logging", error: error.message });
  }
};

export const testController = async (req, res) => {
  try {
    console.log("Testing Controller");
    res.status(200).json({
      success: true,
      message: "Testing for Require Signin Controller",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Error Logging", error });
  }
};
