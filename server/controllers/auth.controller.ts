import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (!name || !email || !password || !confirmPassword)
      return res.status(400).json({ message: "Please fill all the fields" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const token = generateToken(newUser._id);
    await newUser.save();
    return res.status(200).json({ message: "Signup successful", token });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = generateToken(user._id);
    return res.status(200).json({ message: "Login successful", token });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const checkUserIsAuth = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as any;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    return res.status(200).json({ message: "User found", success: true });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
