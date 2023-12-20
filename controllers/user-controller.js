  const User = require("../models/user-model");

  const getUsers = async (req, res) => {
    try {
      const users = await User.find({});
      res.status(404).send(users);
    } catch (err) {
      res.status(404).send({ msg: err.message });
    }
  };

  const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).send(user);
    } catch (err) {
      res.status(404).send({ msg: err.message });
    }
  };
  const updateUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      console.log(user);
      if (user) {
        user.fullName = req.body.fullName || user.fullName;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.address = req.body.address || user.address;
        user.phone = req.body.phone || user.phone;
        user.gender = req.body.gender || user.gender;
        user.isAdmin = req.body.isAdmin || user.isAdmin;
        user.updatedAt = req.body.updatedAt || Date.now();
        const updatedUser = await user.save();
        res.status(200).send(updatedUser);
      }
    } catch (err) {
      res.status(404).send({ msg: err.message });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (user) {
        res.status(200).send({ msg: "User removed" });
      }else{
        res.status(404).send({ msg: "User not found" });
      }
    } catch (err) {
      res.status(404).send({ msg: err.message });
    }
  };

  module.exports = { getUsers, getUserById, updateUser, deleteUser };
