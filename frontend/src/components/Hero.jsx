import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      style={{
        minHeight: "85vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#111827)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">

        <div className="row align-items-center">

          {/* Left Side */}

          <div className="col-lg-6">

            <span
              className="badge bg-warning text-dark px-3 py-2 mb-3"
            >
              🔥 BIG BILLION SALE
            </span>

            <h1
              className="display-3 fw-bold text-white"
            >
              Shop Smart,
              <br />

              Live Better.
            </h1>

            <p
              className="text-light mt-4"
              style={{
                fontSize: "20px",
                lineHeight: "35px",
              }}
            >
              Discover the latest Mobiles,
              Laptops, Watches and Accessories
              at the best prices.

              Enjoy secure payments,
              fast delivery and easy returns.
            </p>

            <div className="mt-5 d-flex gap-3">

              <Link
                to="/products"
                className="btn btn-warning btn-lg px-5"
              >
                Shop Now
              </Link>

              <Link
                to="/products"
                className="btn btn-outline-light btn-lg px-5"
              >
                Explore
              </Link>

            </div>

            <div className="row mt-5">

              <div className="col-4">

                <h2 className="text-warning">
                  50K+
                </h2>

                <p className="text-light">
                  Happy Customers
                </p>

              </div>

              <div className="col-4">

                <h2 className="text-warning">
                  500+
                </h2>

                <p className="text-light">
                  Products
                </p>

              </div>

              <div className="col-4">

                <h2 className="text-warning">
                  24/7
                </h2>

                <p className="text-light">
                  Support
                </p>

              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-6 text-center">

            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900"
              alt="Hero"
              className="img-fluid"
              style={{
                maxHeight: "600px",
                borderRadius: "25px",
                boxShadow:
                  "0 30px 60px rgba(0,0,0,.4)",
              }}
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;