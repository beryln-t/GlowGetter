const express = require("express");
const router = express.Router();
const skintypeCtrl = require("../controllers/skintypes");

router.get("/:skintypeId/member/:userId", skintypeCtrl.showST);

module.exports = router;
