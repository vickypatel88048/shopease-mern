import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "📊",
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: "📦",
    },
    {
      name: "Add Product",
      path: "/admin/add-product",
      icon: "➕",
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: "🛒",
    },
  ];

  return (
    <div
      style={{
        width: "260px",
        background: "#181818",
        minHeight: "100vh",
        color: "#fff",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "20px",
      }}
    >
      <h2
        className="text-warning mb-5"
        style={{ fontWeight: "bold" }}
      >
        ShopEase Admin
      </h2>

      {menu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`d-block mb-3 p-3 rounded text-decoration-none ${
            location.pathname === item.path
              ? "bg-warning text-dark"
              : "text-white"
          }`}
        >
          {item.icon} {item.name}
        </Link>
      ))}

      <hr />

      <button
        className="btn btn-danger w-100"
        onClick={() => {
          localStorage.removeItem("admin");
          window.location.href = "/admin";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;