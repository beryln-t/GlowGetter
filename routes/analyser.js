const express = require("express");
const router = express.Router();
const analyserCtrl = require("../controllers/analyser");

router.get("/", analyserCtrl.showQns);

module.exports = router;
