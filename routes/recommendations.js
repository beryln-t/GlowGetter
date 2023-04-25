const express = require("express");
const router = express.Router();
const recommendationsCtrl = require("../controllers/recommendations");

router.get("/", recommendationsCtrl.showAllProducts);
router.get("/:skintypeId", recommendationsCtrl.showSkintypeProducts);

module.exports = router;
