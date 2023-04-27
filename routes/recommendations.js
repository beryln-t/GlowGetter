const express = require("express");
const router = express.Router();
const recommendationsCtrl = require("../controllers/recommendations");
const { isAuth } = require("../controllers/isAuth");

router.get("/:skintypeId", isAuth, recommendationsCtrl.showSkintypeProducts);
router.get(
  "/:skintypeId/category/:category",
  isAuth,
  recommendationsCtrl.showSkintypeCategory
);

module.exports = router;
