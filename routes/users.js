const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");

router.post("/register", usersCtrl.create);
router.post("/signin", usersCtrl.signin);

module.exports = router;
