const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create payment order",
    });
  }
};

// Verify Razorpay Payment
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id +
          "|" +
          razorpay_payment_id
      )
      .digest("hex");

    if (
      generatedSignature === razorpay_signature
    ) {
      return res.json({
        success: true,
        message: "Payment Verified",
      });
    }

    res.status(400).json({
      success: false,
      message: "Invalid Signature",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Verification Failed",
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};