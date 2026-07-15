import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("admin", "true");

      alert("Admin Login Successful");

      navigate("/admin/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#121212",
      }}
    >
      <div
        className="card p-4 shadow"
        style={{
          width: "420px",
          background: "#1f1f1f",
          color: "#fff",
        }}
      >
        <h2 className="text-center text-warning mb-4">
          Admin Login
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Admin Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            className="form-control mb-4"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            className="btn btn-warning w-100"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
         
          <br />
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;