import userModel from "../models/user.model.js";
import tokenService from "../service/generateTokens.js";
import sendEmail from "../service/mail-service.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: `User not exist.` });

    const { resetToken } = tokenService.generateResetToken({ data: user.id });
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
    await user.save();

    const message = `<div>
    <h2>Please follow this link to reset Your Password. This link is valid till 10 minutes from now.</h2>
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}/">${resetToken}</a>
          </div>`;

    sendEmail(email, message);
    res.status(200).json("Password reset link is sent to your email.");
  } catch (err) {
    res.status(500).send({ message: "Oops! Something went wrong!" });
  }
};

export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const user = await userModel.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json("Token Expired, Please try again later");

  const hashPassword = await bcrypt.hash(password, 3);
  user.password = hashPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.json(user);
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies["refreshToken"];

    if (!refreshToken) {
      return res.status(401).json("Access Denied:Not authorized!");
    }

    const verifyRefreshToken = jsonwebtoken.verify(
      refreshToken,
      process.env.TOKEN_REFRESH_SECRET
    );
    const user = await userModel.findOne({ refreshToken });

    if (!verifyRefreshToken || !user)
      return res.status(401).json("Access Denied:Not authorized!");

    const tokens = tokenService.generateTokens({
      data: user.id,
    });

    user.refreshToken = tokens.refreshToken;

    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.status(200).json({
      id: user.id,
      ...user._doc,
      accessToken: tokens.accessToken,
    });
  } catch (err) {
    res.status(500).json("Error refreshing access token");
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) return res.status(404).json("user not found");

    res.status(200).json(user);
  } catch {
    res.status(500).json("Something went wrong");
  }
};


