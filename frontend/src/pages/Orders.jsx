
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import generateInvoice from "../utils/generateInvoice";

function Orders() {
  const [orders, setOrders] = useState([]);

  // Status Badge Color
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning text-dark";

      case "Processing":
        return "bg-primary";

      case "Shipped":
        return "bg-info text-dark";

      case "Delivered":
        return "bg-success";

      case "Cancelled":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/orders`
    );

    setOrders(res.data);
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

  return (
    <>
      <Navbar />

      <div
        className="container-fluid py-5"
        style={{
          background: "#121212",
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        <div className="container">
          <h2 className="text-center text-warning mb-5">
            My Orders
          </h2>

          {orders.length === 0 ? (
            <div className="text-center">
              <h3>No Orders Found</h3>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="card border-0 shadow-lg mb-4"
                style={{
                  background: "#1f1f1f",
                  color: "#fff",
                }}
              >
                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-warning">
                      Order #{order._id.slice(-6)}
                    </h4>

                    <span
                      className={`badge ${getStatusBadge(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <hr className="text-secondary" />

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h5>Customer</h5>

                      <p>
                        <strong>Name:</strong> {order.customerName}
                      </p>

                      <p>
                        <strong>Email:</strong> {order.email}
                      </p>

                      <p>
                        <strong>Phone:</strong> {order.phone || "N/A"}
                      </p>
                    </div>

                    <div className="col-md-6">
                      <h5>Shipping Address</h5>

                      <p>{order.address}</p>

                      <p>
                        {order.city || "-"}, {order.state || "-"}
                      </p>

                      <p>{order.pincode || "-"}</p>

                      <p>
                        <strong>Payment:</strong>{" "}
                        {order.paymentMethod || "Razorpay"}
                      </p>
                    </div>
                  </div>

                  <h5 className="mb-3">
                    Ordered Products
                  </h5>

                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center border rounded p-3 mb-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        width="80"
                        height="80"
                        style={{
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />

                      <div className="ms-3 flex-grow-1">
                        <h6>{item.name}</h6>

                        <p className="mb-1">
                          Qty : {item.quantity}
                        </p>

                        <strong>
                          ₹{Number(item.price || 0).toLocaleString()}
                        </strong>
                      </div>
                    </div>
                  ))}

                  <hr className="text-secondary" />

                  <div className="d-flex justify-content-between align-items-center">
                    <h4>Total Amount</h4>

                    <h4 className="text-warning">
                      ₹{Number(order.totalPrice || 0).toLocaleString()}
                    </h4>
                  </div>

                  <small className="text-secondary d-block mt-2">
                    Ordered on{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </small>

                  {/* Download Invoice Button */}
                  <div className="mt-4">
                    <button
                      className="btn btn-success"
                      onClick={() => generateInvoice(order)}
                    >
                      📄 Download Invoice
                    </button>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Orders;