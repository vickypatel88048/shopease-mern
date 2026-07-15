import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { clearCart } from "../redux/cartSlice";




function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux Cart
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Calculate Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Shipping Form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Loading State
  const [loading, setLoading] = useState(false);

  // Error Message
  const [error, setError] = useState("");

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
    // Load Razorpay SDK
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  // Place Order
  const handlePayment = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    try {
      const sdkLoaded = await loadRazorpay();

      if (!sdkLoaded) {
        alert("Razorpay SDK failed to load.");
        setLoading(false);
        return;
      }

      // Create Razorpay Order
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          amount: totalPrice,
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "ShopEase",
        description: "Order Payment",
        order_id: data.id,

        handler: async function (response) {
          try {
            // Verify Payment
            const verify = await axios.post(
              "http://localhost:5000/api/payment/verify",
              response
            );

            if (verify.data.success) {
              // Save Order
              await axios.post("http://localhost:5000/api/orders", {
                customerName: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                items: cartItems,
                totalPrice,
                paymentId: response.razorpay_payment_id,
              });

              dispatch(clearCart());

              alert("Payment Successful");

            navigate("/payment-success", {
  state: {
    paymentId: response.razorpay_payment_id,
  },
});
            } else {
              alert("Payment Verification Failed");
            }
          } catch (err) {
            console.error(err);
            alert("Payment Error");
          }
        },

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },

        theme: {
          color: "#0d6efd",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };  return (
    <>
      <Navbar />

      <div className="container my-5">
        <div className="row">

          {/* Shipping Form */}
          <div className="col-md-7">
            <div className="card shadow-sm p-4">
              <h3 className="mb-4">Shipping Details</h3>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <textarea
                className="form-control mb-3"
                rows="3"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />

              <div className="row">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-md-5">
            <div className="card shadow-sm p-4">
              <h3 className="mb-4">Order Summary</h3>

              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="d-flex justify-content-between align-items-center border-bottom py-2"
                    >
                      <div>
                        <h6 className="mb-1">{item.name}</h6>
                        <small>Qty: {item.quantity}</small>
                      </div>

                      <strong>
                        ₹{item.price * item.quantity}
                      </strong>
                    </div>
                  ))}

                  <hr />

                  <div className="d-flex justify-content-between">
                    <h5>Total</h5>
                    <h5>₹{totalPrice}</h5>
                  </div>

                  <button
                    className="btn btn-primary w-100 mt-4"
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading
                      ? "Processing..."
                      : "Pay with Razorpay"}
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Checkout;