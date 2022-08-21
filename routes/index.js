var express = require("express");
var router = express.Router();
const mwAuth = require("../middleware/auth");
const auth = require("../controllers/auth");
const fileMgmt = require("../shared/fileMgmt");

router.options("*", function (req, res, next) {
  res.send();
});

router.get("/signin", function (req, res, next) {
  const filePath = fileMgmt.getHtmlFilePath("login.html");
  res.sendFile(filePath);
});

router.post("/register", auth.registerUser);

router.post("/login", auth.login);

router.get("/logout", mwAuth, function (req, res, next) {
  return res
    .clearCookie("access_token")
    .status(200)
    .send("Successfully logged out.");
});

module.exports = router;
