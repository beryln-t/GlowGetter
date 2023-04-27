const express = require("express");
const router = express.Router();
const skintypeCtrl = require("../controllers/skintypes");
const { isAuth } = require("../controllers/isAuth");

router.get("/:skintypeId/member/:userId", isAuth, skintypeCtrl.showST);

module.exports = router;
