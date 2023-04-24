const express = require("express");
const router = express.Router();
const analyserCtrl = require("../controllers/analyser");

router.get("/", analyserCtrl.showQns);
router.get("/response/:userId", analyserCtrl.getUserResponse);
router.post("/response/:userId", analyserCtrl.saveResponse);

module.exports = router;
