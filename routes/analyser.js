const express = require("express");
const router = express.Router();
const analyserCtrl = require("../controllers/analyser");
const { isAuth } = require("../controllers/isAuth");

router.get("/", analyserCtrl.showQns);
router.get("/response/:userId", analyserCtrl.getUserResponse);
router.put("/response/:userId", analyserCtrl.saveResponse);

module.exports = router;
