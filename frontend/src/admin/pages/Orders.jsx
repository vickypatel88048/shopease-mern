import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

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
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
  await axios.put(
    `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
    {
      status,
    }
  );

      alert("Order Status Updated");

      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Failed to Update Status");
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "#121212",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <div className="container">

        <h2 className="text-warning mb-4">
          Manage Orders
        </h2>

        <div className="table-responsive">

          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {orders.map((order) => (

                <tr key={order._id}>

                  <td>{order.customerName}</td>

                  <td>{order.email}</td>

                  <td>{order.phone}</td>

                  <td>
                    ₹{order.totalPrice.toLocaleString()}
                  </td>

                  <td>{order.paymentMethod}</td>

                  <td>

                    <select
                      className="form-select"
                      defaultValue={order.status}
                      id={order._id}
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>

                  </td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() =>
                        updateStatus(
                          order._id,
                          document.getElementById(
                            order._id
                          ).value
                        )
                      }
                    >
                      Update
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}

export default AdminOrders;