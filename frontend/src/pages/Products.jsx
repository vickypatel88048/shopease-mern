import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function Products() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/products`
  );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <div
        className="container-fluid py-5"
        style={{
          background: "#0f172a",
          minHeight: "100vh",
        }}
      >
        <div className="container">

          <h2 className="text-center text-warning mb-4">
            All Products
          </h2>

          <div className="row mb-4">

            <div className="col-md-8 mb-3">

              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="🔍 Search Products..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <div className="col-md-4">

              <select
                className="form-select form-select-lg"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                <option value="All">
                  All Categories
                </option>

                <option value="Mobile">
                  Mobile
                </option>

                <option value="Laptop">
                  Laptop
                </option>

                <option value="Watch">
                  Watch
                </option>

                <option value="Headphone">
                  Headphone
                </option>

                <option value="Fashion">
                  Fashion
                </option>

              </select>

            </div>

          </div>

          <p className="text-light mb-4">
            {filteredProducts.length} Products Found
          </p>

          <div className="row g-4">

            {filteredProducts.map((product) => (

              <div
                key={product._id}
                className="col-lg-3 col-md-6"
              >

                <div
                  className="card border-0 h-100 shadow"
                  style={{
                    background: "#1e293b",
                    borderRadius: "18px",
                    overflow: "hidden",
                    transition: ".3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-8px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                  }}
                >

                  <Link
                    to={`/product/${product._id}`}
                    className="text-decoration-none"
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-100"
                      style={{
                        height: "230px",
                        objectFit: "cover",
                      }}
                    />

                    <div className="card-body">

                                            <h5 className="text-white fw-bold">
                        {product.name}
                      </h5>

                      <p className="text-secondary mb-2">
                        {product.brand || "ShopEase"}
                      </p>

                      <span className="badge bg-secondary mb-3">
                        {product.category}
                      </span>

                      <div className="mt-3">
                        <h4 className="text-warning fw-bold">
                          ₹
                          {Number(
                            product.price
                          ).toLocaleString()}
                        </h4>
                      </div>

                      <div className="my-3">

                        {product.stock > 0 ? (
                          <span className="badge bg-success">
                            In Stock
                          </span>
                        ) : (
                          <span className="badge bg-danger">
                            Out of Stock
                          </span>
                        )}

                      </div>

                    </div>

                  </Link>

                  <div className="card-footer bg-transparent border-0 pb-3 px-3">

                    <div className="d-grid gap-2">

                      <Link
                        to={`/product/${product._id}`}
                        className="btn btn-outline-light"
                      >
                        View Details
                      </Link>

                      <button
                        className="btn btn-warning fw-semibold"
                        disabled={product.stock <= 0}
                        onClick={() => {
                          dispatch(addToCart(product));
                          alert(
                            "Product Added To Cart"
                          );
                        }}
                      >
                        🛒 Add To Cart
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </>
  );
}

export default Products;