const express = require("express");
const router = express.Router();
const membersCtrl = require("../controllers/members");
const { isAuth } = require("../controllers/isAuth");

router.put("/:userId", isAuth, membersCtrl.editProfile);
router.put("/:userId/wishlist/:productId", isAuth, membersCtrl.addWishlist);
router.get("/:userId/wishlist/", isAuth, membersCtrl.showWishlist);
router.delete("/:userId/wishlist/:productId", isAuth, membersCtrl.delWishlist);

module.exports = router;
