const express = require("express");
const router = express.Router();
const skintypeCtrl = require("../controllers/skintypes");

router.get("/", skintypeCtrl.showST);

module.exports = router;
