
const User = require("../models/userSchema");
const genearteToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
    console.log(req.body)
  const { name, email, password} = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,

  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genearteToken(user._id),
      success:true
    });
  } else {
    res.status(400);
    throw new Error("error occured");
  }

  res.json({
    name,
    email,
    password,
  });
}

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genearteToken(user._id),
      success:true
    });
  } else {
    res.status(400);
    throw new Error("invalid email or password");
  }
}







module.exports = { registerUser, authUser};