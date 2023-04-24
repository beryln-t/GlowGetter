const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");

router.post("/register", usersCtrl.create);
router.post("/signin", usersCtrl.signin);
router.get("/:userId", usersCtrl.fetchUser);

module.exports = router;
