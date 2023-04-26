const express = require("express");
const router = express.Router();
const membersCtrl = require("../controllers/members");

router.put("/:userId", membersCtrl.editProfile);
router.put("/:userId/wishlist/:productId", membersCtrl.addWishlist);
router.get("/:userId/wishlist/", membersCtrl.showWishlist);
router.delete("/:userId/wishlist/:productId", membersCtrl.delWishlist);

module.exports = router;
