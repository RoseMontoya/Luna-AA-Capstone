const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, handleValidationErrors } = require("../../utils");
const { User } = require("../../db/models");

const { check } = require("express-validator");

const router = express.Router();

// Validate Login
const validateLogin = [
  check("email")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

// Restore session user
router.get("/", (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    return res.json({
      user: safeUser,
    });
  } else return res.json({ user: null });
});

// Log in
router.post("/", validateLogin, async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.unscoped().findOne({
    where: { email: email },
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    err.title = "Login failed";
    err.errors = { credentials: "Invalid credentials" };

    return next(err);
  }

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

// Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
