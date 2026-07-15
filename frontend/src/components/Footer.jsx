import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="pt-5 pb-3"
      style={{
        background: "#0f172a",
        color: "#fff",
      }}
    >
      <div className="container">
        <div className="row g-4">

          {/* Logo */}

          <div className="col-lg-4">
            <h2 className="text-warning fw-bold">
              ShopEase
            </h2>

            <p className="text-secondary mt-3">
              ShopEase is your trusted online shopping
              destination for electronics, fashion and
              accessories at the best prices.
            </p>
          </div>

          {/* Quick Links */}

          <div className="col-lg-2 col-md-4">
            <h5 className="text-warning">Quick Links</h5>

            <ul className="list-unstyled mt-3">
              <li><Link className="text-secondary text-decoration-none" to="/">Home</Link></li>
              <li><Link className="text-secondary text-decoration-none" to="/products">Products</Link></li>
              <li><Link className="text-secondary text-decoration-none" to="/cart">Cart</Link></li>
              <li><Link className="text-secondary text-decoration-none" to="/orders">Orders</Link></li>
            </ul>
          </div>

          {/* Support */}

          <div className="col-lg-3 col-md-4">
            <h5 className="text-warning">Support</h5>

            <ul className="list-unstyled mt-3">
              <li className="text-secondary">Help Center</li>
              <li className="text-secondary">Privacy Policy</li>
              <li className="text-secondary">Terms & Conditions</li>
              <li className="text-secondary">Return Policy</li>
            </ul>
          </div>

          {/* Contact */}

          <div className="col-lg-3 col-md-4">
            <h5 className="text-warning">Contact</h5>

            <p className="text-secondary mt-3 mb-2">
              📧 support@shopease.com
            </p>

            <p className="text-secondary mb-2">
              📞 +91 9876543210
            </p>

            <p className="text-secondary">
              📍 Bihar, India
            </p>

            <div className="d-flex gap-3 mt-3 fs-4">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-twitter-x"></i>
              <i className="bi bi-linkedin"></i>
              <i className="bi bi-github"></i>
            </div>
          </div>

        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center text-secondary">
          © {new Date().getFullYear()} ShopEase. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;