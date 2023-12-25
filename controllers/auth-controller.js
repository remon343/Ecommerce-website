const User = require("../models/user-model");
const bcrypt = require("bcryptjs"); // npm i bcryptjs

const home = async (req, res) => {
  try {
    res.status(200).send("Hello from auth-controller");
  } catch (err) {
    res.status(404).send({ msg: err.message });
    next(err);
  }
};

const user = async (req, res) => {
  // give user data according to the token which comes with Authorization header
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const register = async (req, res) => {
  try {
    const { fullName, email, password, address, phone, gender } = req.body;
    let profileImage =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    if (req.file) {
      profileImage = req.file.path;
    }
    console.log(req.file);
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error("User already exists");
    }
    const user = await User.create({
      fullName,
      email,
      password,
      address,
      phone,
      gender,
      profileImage,
    });
    if (!user) {
      throw new Error("Registration failed");
    }
    res.status(200).json({
      user,
      token: await user.generateToken(),
      userId: user._id.toString(),
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Email or Password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Password");
    } else {
      res.status(200).json({
        user,
        token: await user.generateToken(),
        userId: user._id.toString(),
      });
    }
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports = { home, register, login, user };
