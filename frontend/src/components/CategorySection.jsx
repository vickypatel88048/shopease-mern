import { Link } from "react-router-dom";

function CategorySection() {
  const categories = [
    {
      name: "Mobile",
      icon: "📱",
      count: "120+ Products",
      color: "#0d6efd",
    },
    {
      name: "Laptop",
      icon: "💻",
      count: "80+ Products",
      color: "#198754",
    },
    {
      name: "Watch",
      icon: "⌚",
      count: "40+ Products",
      color: "#dc3545",
    },
    {
      name: "Headphone",
      icon: "🎧",
      count: "75+ Products",
      color: "#6f42c1",
    },
    {
      name: "Fashion",
      icon: "👕",
      count: "200+ Products",
      color: "#fd7e14",
    },
    {
      name: "Accessories",
      icon: "🎮",
      count: "150+ Products",
      color: "#20c997",
    },
  ];

  return (
    <section
      style={{
        background: "#0f172a",
        padding: "80px 0",
      }}
    >
      <div className="container">

        <div className="text-center mb-5">

          <h2
            className="fw-bold text-white"
            style={{ fontSize: "42px" }}
          >
            Shop By Category
          </h2>

          <p
            className="text-secondary"
            style={{ fontSize: "18px" }}
          >
            Discover thousands of products across
            our most popular categories.
          </p>

        </div>

        <div className="row g-4">

          {categories.map((category) => (

            <div
              key={category.name}
              className="col-lg-4 col-md-6"
            >
              <Link
                to={`/products?category=${category.name}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <div
                  className="card h-100 border-0 shadow-lg"
                  style={{
                    background: "#1e293b",
                    borderRadius: "20px",
                    transition: "0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(245,158,11,.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "";
                  }}
                >
                  <div className="card-body text-center p-5">

                    <div
                      style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "50%",
                        background: category.color,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "42px",
                        margin: "auto",
                      }}
                    >
                      {category.icon}
                    </div>

                    <h3
                      className="text-white mt-4"
                    >
                      {category.name}
                    </h3>

                    <p className="text-secondary">
                      {category.count}
                    </p>

                    <button
                      className="btn btn-warning mt-3 px-4"
                    >
                      Explore
                    </button>

                  </div>
                </div>
              </Link>
            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default CategorySection;