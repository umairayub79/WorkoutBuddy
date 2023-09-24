const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')

const createToken = (id,username) => {
    return jwt.sign({ _id: id, username }, process.env.SECRET, { expiresIn: '3d' })
}
// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Invalid credentials",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = createToken(user._id, user.username);

    return res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
// signup user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(email);
  // validation
  if (!username || !email || !password) {
    return res.status(400).json({
      error: "Bad Request, all fields are required",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: "Email is not valid",
    });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      error: "Password not strong enough",
    });
  }
  const emailExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });

  if (emailExists) {
    return res.status(400).json({
      error: "Email already in use",
    });
  }
  if (usernameExists) {
    return res.status(400).json({
      error: "Username already in use",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = createToken(user._id, user.username);
    return res.status(201).json({
      message: "Signed up successfully",
      token,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = {
    loginUser,
    signupUser
}