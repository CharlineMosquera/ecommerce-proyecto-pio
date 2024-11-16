const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/", cartController.createCart);
router.get("/userId", cartController.getCart);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);

module.exports = router;