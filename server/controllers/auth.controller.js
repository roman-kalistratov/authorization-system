import userModel from "../models/user.model.js";
import tokenService from "../service/generateTokens.js";
import bcrypt from "bcryptjs";
import sendEmail from "../service/mail-service.js";
import generateNumericCode from "../service/generateNumericCode.js";

export const register = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    const fileName = (req.file && req.file.filename) || "";

    const isEmailCorrect = await userModel.findOne({ email: data.email });
    if (isEmailCorrect)
      return res.status(400).json({ message: "Email already exists" });

    const hashPassword = await bcrypt.hash(data.password, 3);

    const newUser = await userModel.create({
      ...data,
      password: hashPassword,
      avatar: fileName,
    });

    await newUser.save();
    res.status(200).send("User successfully registered.");
  } catch {
    res.status(500).send("Oops! Something went wrong!");
  }
};

export const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Wrong password!" });

    const { accessToken, refreshToken } = tokenService.generateTokens({
      data: user.id,
    });

    await userModel.findByIdAndUpdate(
      user.id,
      { refreshToken: refreshToken },
      { new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    const {
      password,
      role,
      refreshToken: userRefreshToken,
      ...otherDetails
    } = user._doc;

    res.status(200).json({
      id: user.id,
      ...otherDetails,
      token: accessToken,
    });
  } catch {
    res.status(500).send("Oops! Something went wrong!");
  }
};

export const sendLoginCode = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const code = generateNumericCode();

    user.verificationCode = code;
    user.verificationCodeExpires = Date.now() + 1 * 60 * 1000; // 1 minutes
    await user.save();

    const message = `<div>
        <h2>Your verification code is:</h2>
        <p>${code}</p>    
      </div>`;

    sendEmail(req.body.email, message);

    res.status(200).json("Verification code is sent to your email.");
  } catch (err) {
    console.log(err);
  }
};

export const loginWithCode = async (req, res) => {
  try {

    const user = await userModel.findOne({
      email: req.body.email,
      verificationCodeExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Code Expired, Please try again later!" });

    if (user.verificationCode !== req.body.code)
      return res.status(404).json({ message: "Code is not valid!" });

    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    const { accessToken, refreshToken } = tokenService.generateTokens({
      data: user.id,
    });

    await userModel.findByIdAndUpdate(
      user.id,
      { refreshToken: refreshToken },
      { new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    const {
      password,
      role,
      refreshToken: userRefreshToken,
      ...otherDetails
    } = user._doc;

    res.status(200).json({
      id: user.id,
      ...otherDetails,
      token: accessToken,
    });
  } catch (err) {
    res.status(500).send("Oops! Something went wrong!");
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken").status(200).json("Logout Succeeded");
  } catch (err) {
    res.status(500).send("Oops! Something went wrong!");
  }
};
