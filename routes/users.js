const express = require('express');
const router = express.Router();

const { register, activate, login, getUserDetails, updateUserDetails, getAllUserDetails } = require("../controllers/user");

router.route("/register").post(register);
router.route("/activate/:code").get(activate);
router.route("/login").post(login);
router.route("/details").get(getUserDetails);
router.route("/details").post(updateUserDetails);
router.route("/all").get(getAllUserDetails);

module.exports = router;
