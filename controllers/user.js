require("dotenv").config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const sendMail = require("../utility/email");

//TODO: Implement Global Error Handling

/*
  * Reister: It is used to register new user
  * If Email ID is already registered then exit
  * Hashing the password and inserting the details in User Collection
  * Status 0 indiacte Not Verified User
  * Status 1 indicate Verified User
  * Error handling
*/
const register = async (req, res) => {
  //TODO 01: Validate request param to check name, email and password are in expected format
  //TODO 02: Generate Activation Link and Send email
  try {
    let activationCode = Math.floor(100000 + Math.random() * 900000);
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      status: 0
    };
    const mailObj = {
      to: data.email,
      name: data.name,
      activationCode: activationCode
    };
    const existingUser = await User.findOne({email: data.email});
    if(existingUser) {
      res.status(403).json({ msg: "Email already Registered" });
      return;
    } 
    data.password = await bcrypt.hash(data.password, parseInt(process.env.SALT_ROUNDS));
    data.activationCode = await bcrypt.hash(activationCode.toString(), parseInt(process.env.SALT_ROUNDS));

    const userData = await User.insertMany(data);
    console.log(userData);
    const info = await sendMail.sendMail(mailObj);
    console.log(info);
    console.log("Email sent successfully");
    res.status(200).json({ msg: "Registered Successfully" });
  } catch(error) {
    console.log("User::register", error);
    res.status(500).json({ msg: "Internal error" });
  }
};

const activate = async (req, res) => {
  console.log(req.params);
  const myData = await User.find({});
  res.status(200).json({ myData });
};

const login = async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password
    };
    const check = await User.findOne({email: data.email});
    if(!check) {
      res.send("Credentials not match");
    } else {
      const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
      if(isPasswordMatch) {
        res.status(200).json({ check });
      } else {
        res.send("Credentials not match");
      }
    }
  } catch(error) {
    console.log(error);
    res.send("Something wrong occured!");
  }
};

const getUserDetails = async (req, res) => {
  const myData = await User.find({});
  res.status(200).json({ myData });
};

const updateUserDetails = async (req, res) => {
  const myData = await User.find({});
  res.status(200).json({ myData });
};

const getAllUserDetails = async (req, res) => {
  const myData = await User.find({});
  res.status(200).json({ myData });
};

module.exports = {register, activate, login, getUserDetails, updateUserDetails, getAllUserDetails};