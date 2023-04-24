const express = require("express");
const router = express.Router();
const membersCtrl = require("../controllers/members");

router.put("/:userId", membersCtrl.editProfile);

module.exports = router;
