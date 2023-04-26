const express = require("express");
const router = express.Router();
const recommendationsCtrl = require("../controllers/recommendations");

router.get("/:skintypeId", recommendationsCtrl.showSkintypeProducts);
router.get(
  "/:skintypeId/category/:category",
  recommendationsCtrl.showSkintypeCategory
);

module.exports = router;
