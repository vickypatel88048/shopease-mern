const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/OrderController");

// Place Order
router.post("/", placeOrder);

// Get All Orders
router.get("/", getOrders);

// Get Single Order
router.get("/:id", getOrderById);

// Update Order Status
router.put("/:id", updateOrderStatus);

module.exports = router;