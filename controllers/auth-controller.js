const User = require("../models/user-model");

const home = async (req, res) => {
  try {
    res.status(200).send("Hello from auth-controller");
  } catch (err) {
    res.status(404).send({ msg: err.message });
  }
};

const register = async (req, res) => {
  try {
    const { fullName, email, password, address, phone, gender} = req.body;
    let profileImage  = null;
    if(req.file){
      profileImage = req.file.path;
      
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send({ msg: "User already exist" });
    }
    console.log(profileImage);
    const user = await User.create({  
      fullName,
      email,
      password,
      address,
      phone,
      gender,
      profileImage
    });
    res.status(200).json({
      user,
      token: await user.generateToken(),
      userId: user._id.toString(),
    });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    res.status(200).send("hello from auth-controller Login");
  } catch (err) {
    res.status(404).send({ msg: err.message });
  }
};

module.exports = { home, register, login };
