const Product = require("../models/Product");
const Order = require("../models/Order");

const getDashboardStats = async (req, res) => {
  try {
    // Total Products
    const totalProducts = await Product.countDocuments();

    // Total Orders
    const totalOrders = await Order.countDocuments();

    // All Orders
    const orders = await Order.find();

    // Revenue
    const totalRevenue = orders.reduce(
      (total, order) => total + order.totalPrice,
      0
    );

    // Pending Orders
    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    // Recent Orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};