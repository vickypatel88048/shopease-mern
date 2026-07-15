import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    recentOrders: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
 try {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/dashboard`
  );
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />

      <div
        style={{
          marginLeft: "270px",
          minHeight: "100vh",
          background: "#121212",
          color: "#fff",
          padding: "30px",
        }}
      >
        <h2 className="text-warning mb-4">
          📊 Admin Dashboard
        </h2>

        <div className="row g-4">

          <div className="col-md-3">
            <div className="card bg-dark text-white shadow border-0">
              <div className="card-body text-center">
                <h5>📦 Products</h5>
                <h2>{stats.totalProducts}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-dark text-white shadow border-0">
              <div className="card-body text-center">
                <h5>🛒 Orders</h5>
                <h2>{stats.totalOrders}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-dark text-white shadow border-0">
              <div className="card-body text-center">
                <h5>💰 Revenue</h5>
                <h2>
                  ₹
                  {Number(
                    stats.totalRevenue || 0
                  ).toLocaleString()}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-dark text-white shadow border-0">
              <div className="card-body text-center">
                <h5>⏳ Pending</h5>
                <h2>{stats.pendingOrders}</h2>
              </div>
            </div>
          </div>

        </div>

        <div className="card bg-dark text-white border-0 shadow mt-5">
          <div className="card-body">

            <h4 className="text-warning mb-4">
              🛍 Recent Orders
            </h4>

            {stats.recentOrders.length === 0 ? (
              <p>No Recent Orders</p>
            ) : (
              stats.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="d-flex justify-content-between align-items-center border-bottom py-3"
                >
                  <div>
                    <h6 className="mb-1">
                      {order.customerName}
                    </h6>

                    <small>
                      {order.email}
                    </small>
                  </div>

                  <div>
                    <strong>
                      ₹
                      {Number(
                        order.totalPrice || 0
                      ).toLocaleString()}
                    </strong>
                  </div>

                  <span className="badge bg-warning text-dark">
                    {order.status}
                  </span>
                </div>
              ))
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;