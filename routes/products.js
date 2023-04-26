const express = require("express");
const router = express.Router();
const productsCtrl = require("../controllers/products");

router.get("/", productsCtrl.showProducts);
router.get("/:productId", productsCtrl.showProdDetail);

module.exports = router;
