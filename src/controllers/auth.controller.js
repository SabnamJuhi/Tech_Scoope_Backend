const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../utils/jwt");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user)
    return res.status(400).json({
      message: "User not found",
    });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid)
    return res.status(400).json({
      message: "Wrong password",
    });

  const token = generateToken(user);

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};

exports.logout = async (req, res) => {
  res.clearCookie("accessToken");

  res.json({
    success: true,
  });
};

exports.me = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ["id", "name", "email"],
  });

  res.json({
    success: true,
    data: user,
  });
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email"],
    });

    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};
