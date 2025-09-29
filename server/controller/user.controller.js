const User = require("../model/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const Signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(500)
        .json({ success: false, meessage: "Please enter all required fields" });
    }

    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res
        .status(500)
        .json({ success: false, message: "User already present" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(200)
      .json({
        success: false,
        message: "User registered successfully",
        newUser,
      });
  } catch (err) {
    console.log("Error in Signup controller: ", err.message);
    res.status(500).json({ success: false, message: "Interanl server error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(500)
        .json({ success: false, message: "Please enter all required fields" });
    }

    const alreadyUser = await User.findOne({ email });
    if (!alreadyUser) {
      return res
        .status(500)
        .json({ success: false, message: "User is not present" });
    }

    // Decrypt the hashed password
    const isPassword = await bcrypt.compare(password, alreadyUser.password);

    if (!isPassword) {
      return res
        .status(500)
        .json({ success: false, message: "email or password is not correct" });
    }

    // JWT Token + Cookie
    const token = await jwt.sign(
      { _id: alreadyUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token);

    res
      .status(200)
      .json({ success: true, message: "User login successfully", token });
  } catch (err) {
    console.log("Error in Login Controller: ", err.meessage);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(500)
        .json({ success: false, message: "Please enter the required fields" });
    }
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "User not found" });
    }

    // Generate a unique JWT token for the user that contains the user's id
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    // Send the token to the user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP_EMAIL,
      },
    });

    // Email configuration
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a>
    <p>The link will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (err,info)=>{
        if(err){
            return res.status(500).json({success:false, message:err.message})
        }
        res.status(200).json({success:true, message:"Email Sent"})
    })
  } catch (err) {
    console.log("Error in the forgetPassword Controller: ", err.meessage);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const {password, confirmPassword} = req.body;

    if(password !== confirmPassword){
        return res.status(500).json({success:false, message:"password does not match"});
    }

    // Verify the token sent by the user
    const decodedToken = jwt.verify(req.params.token, process.env.JWT_SECRET)

    // if the token is invalid, return an error
    if(!decodedToken){
        return res.status(401).json({success:false, message:"Invalid Token"})
    }

    // find the user with the id from the token
    const user = await User.findById({_id:decodedToken.userId});
    if(!user){
        return res.status(401).json({success:false, message:"No user found"});
    }

    // Hash the new Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user's password, clear reset token and expiration time
    user.password = hashedPassword;
    await user.save();

    // Send success response
    res.status(200).json({success:true, message:"Password updated successfully"})

  } catch (err) {
    console.log("Error in the resetPassword Controller: ", err.meessage);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { Signup, Login, forgetPassword, resetPassword };
