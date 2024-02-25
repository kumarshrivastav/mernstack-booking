// const express = require("express");
import express from "express";
// const { check } = require("express-validator");
import { check } from "express-validator";
const router = express.Router();
// const AuthController = require("../controller/AuthController");
import AuthController from "../controller/AuthController.js";
// const verifyToken = require("../middleware/verifyToken");
import verifyToken from "../middleware/verifyToken.js"
const loginCredentials = [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").isLength({ min: 5 }),
];
const registerCredentials = [
  check("firstName", "FirstName is required").isString(),
  check("lastName", "LastName is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password is required with minimum 6 letters").isLength({
    min: 5,
  }),
];



router.post("/register", registerCredentials, AuthController.register);
router.post("/login", loginCredentials, AuthController.login);
// router.get("/refresh", AuthController.refresh);
router.get("/validate-token", verifyToken, AuthController.verifyToken);
router.get("/logout",AuthController.logout)
router.get('/me',verifyToken,AuthController.me)
// module.exports = router;
export default router
