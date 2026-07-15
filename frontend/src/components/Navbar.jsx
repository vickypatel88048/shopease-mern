import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const navStyle = {
    background: "#131921",
    minHeight: "72px",
    boxShadow: "0 4px 12px rgba(0,0,0,.25)",
    position: "sticky",
    top: 0,
    zIndex: 999,
  };

  const logoStyle = {
    color: "#ff9900",
    fontWeight: "700",
    fontSize: "30px",
    textDecoration: "none",
    letterSpacing: "1px",
  };

  const menuStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
    padding: "8px 14px",
    borderRadius: "8px",
  };

  const iconBtn = {
    border: "1px solid #444",
    color: "#fff",
    background: "#1f2937",
    borderRadius: "10px",
    padding: "8px 12px",
    textDecoration: "none",
    position: "relative",
  };

  return (
    <nav style={navStyle}>
      <div className="container-fluid px-4">

        <div className="row align-items-center py-3">

          {/* Logo */}

          <div className="col-lg-2">

            <Link to="/" style={logoStyle}>
              <i className="bi bi-bag-fill"></i>{" "}
              ShopEase
            </Link>

          </div>

          {/* Search */}

          <div className="col-lg-5">

            <div className="input-group">

              <span className="input-group-text bg-warning border-0">
                <i className="bi bi-search"></i>
              </span>

              <input
                className="form-control border-0"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                style={{
                  height: "45px",
                }}
              />

              <button
                className="btn btn-warning px-4"
              >
                Search
              </button>

            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-5">

            <div className="d-flex justify-content-end align-items-center gap-3">

              <Link
                to="/"
                style={menuStyle}
              >
                <i className="bi bi-house-door-fill"></i>{" "}
                Home
              </Link>

              <Link
                to="/products"
                style={menuStyle}
              >
                <i className="bi bi-grid-fill"></i>{" "}
                Products
              </Link>

              <Link
                to="/cart"
                style={iconBtn}
              >
                <i className="bi bi-cart3 fs-5"></i>

                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                >
                  {cartItems.length}
                </span>

              </Link>

              {userInfo ? (
                <div className="dropdown">

                  <button
                    className="btn btn-warning dropdown-toggle"
                    onClick={() =>
                      setShowMenu(!showMenu)
                    }
                  >
                    <i className="bi bi-person-circle"></i>{" "}
                    {userInfo.name}
                  </button>

                  {showMenu && (
                    <div
                      className="dropdown-menu show"
                      style={{
                        right: 0,
                        left: "auto",
                        borderRadius: "12px",
                        minWidth: "220px",
                      }}
                    >
                                            <Link
                          className="dropdown-item"
                          to="/orders"
                          onClick={() => setShowMenu(false)}
                        >
                          <i className="bi bi-box-seam me-2"></i>
                          My Orders
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="/profile"
                          onClick={() => setShowMenu(false)}
                        >
                          <i className="bi bi-person me-2"></i>
                          My Profile
                        </Link>

                        <hr className="dropdown-divider" />

                        <button
                          className="dropdown-item text-danger"
                          onClick={logoutHandler}
                        >
                          <i className="bi bi-box-arrow-right me-2"></i>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="btn btn-outline-light"
                      style={{
                        borderRadius: "10px",
                        padding: "8px 18px",
                      }}
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="btn btn-warning"
                      style={{
                        borderRadius: "10px",
                        padding: "8px 18px",
                        fontWeight: "600",
                      }}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Menu */}

          <div
            className="row py-2 mt-2"
            style={{
              borderTop: "1px solid #2d3748",
            }}
          >
            <div className="col d-flex gap-4 flex-wrap">

              <Link
                to="/"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Home
              </Link>

              <Link
                to="/products"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Products
              </Link>

              <Link
                to="/cart"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Cart
              </Link>

              {userInfo && (
                <Link
                  to="/orders"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  My Orders
                </Link>
              )}

            </div>
          </div>

        </div> </nav>
  );
}

export default Navbar;