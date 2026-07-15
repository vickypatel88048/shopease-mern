import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../redux/cartSlice";

function FeaturedProducts() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data.slice(0, 8));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="py-5" style={{ background: "#0f172a" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-warning">Featured Products</h2>
          <p className="text-light">Our Most Popular Products</p>
        </div>

        <div className="row g-4">
          {products.map((product) => (
            <div className="col-lg-3 col-md-6" key={product._id}>
              <div
                className="card border-0 h-100 shadow"
                style={{
                  background: "#1e293b",
                  borderRadius: "18px",
                  transition: "0.3s",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="position-relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-100"
                    style={{ height: 240, objectFit: "cover" }}
                  />

                  <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                    NEW
                  </span>
                </div>

                <div className="card-body d-flex flex-column">
                  <small className="text-warning">★★★★★</small>

                  <h5 className="text-white mt-2">{product.name}</h5>

                  <p className="text-secondary mb-1">
                    {product.brand || "ShopEase"}
                  </p>

                  <span className="badge bg-secondary mb-3">
                    {product.category}
                  </span>

                  <h4 className="text-warning">
                    ₹{Number(product.price).toLocaleString()}
                  </h4>

                  <div className="mb-3">
                    {product.stock > 0 ? (
                      <span className="badge bg-success">
                        {product.stock} In Stock
                      </span>
                    ) : (
                      <span className="badge bg-danger">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  <div className="mt-auto d-grid gap-2">
                    <Link
                      to={`/product/${product._id}`}
                      className="btn btn-outline-light"
                    >
                      <i className="bi bi-eye me-2"></i>
                      View Details
                    </Link>

                    <button
                      className="btn btn-warning fw-semibold"
                      disabled={product.stock <= 0}
                      onClick={() => {
                        dispatch(addToCart(product));
                        alert("Product added to cart");
                      }}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/products" className="btn btn-warning btn-lg px-5">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;