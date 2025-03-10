const express = require("express");
const router = express.Router();
const controller = require("../controller/loginController");


router.route("/")
    .post(controller.canUserLogIn)

module.exports = router;