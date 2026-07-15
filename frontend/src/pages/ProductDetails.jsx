import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "../components/Navbar";
import { addToCart } from "../redux/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/products/${id}`
  );

      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <div
          className="container-fluid d-flex justify-content-center align-items-center"
          style={{
            background: "#0f172a",
            minHeight: "100vh",
            color: "#fff",
          }}
        >
          <h2>Loading...</h2>
        </div>
      </>
    );
  }

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
          <div
            className="card border-0 shadow-lg p-4"
            style={{
              background: "#1e293b",
              borderRadius: "20px",
            }}
          >
            <div className="row align-items-center">
              {/* Image */}

              <div className="col-lg-6 text-center mb-4 mb-lg-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{
                    maxHeight: "500px",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Details */}

              <div className="col-lg-6">
                <span className="badge bg-secondary mb-3">
                  {product.category}
                </span>

                <h2 className="text-white fw-bold">{product.name}</h2>

                <h5 className="text-info">{product.brand || "ShopEase"}</h5>

                <div className="my-3">
                  <span className="text-warning fs-5">★★★★★</span>

                  <span className="text-light ms-2">(4.8)</span>
                </div>

                <h2 className="text-warning fw-bold">
                  ₹{Number(product.price).toLocaleString()}
                </h2>

                <div className="my-3">
                  {product.stock > 0 ? (
                    <span className="badge bg-success">In Stock</span>
                  ) : (
                    <span className="badge bg-danger">Out of Stock</span>
                  )}
                </div>

                <p
                  className="text-light"
                  style={{
                    lineHeight: "30px",
                  }}
                >
                  {product.description}
                </p>

                <div className="d-flex align-items-center gap-3 my-4">
                  <button
                    className="btn btn-outline-light"
                    onClick={() => qty > 1 && setQty(qty - 1)}
                  >
                    −
                  </button>

                  <h4 className="text-white m-0">{qty}</h4>

                  <button
                    className="btn btn-outline-light"
                    onClick={() => qty < product.stock && setQty(qty + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="d-grid gap-3">
                  <button
                    className="btn btn-warning btn-lg fw-bold"
                    disabled={product.stock <= 0}
                    onClick={() => {
                      for (let i = 0; i < qty; i++) {
                        dispatch(addToCart(product));
                      }

                      alert("Product Added To Cart");
                    }}
                  >
                    🛒 Add To Cart
                  </button>

                  <button
                    className="btn btn-success btn-lg fw-bold"
                    disabled={product.stock <= 0}
                    onClick={() => {
                      for (let i = 0; i < qty; i++) {
                        dispatch(addToCart(product));
                      }

                      if (!userInfo) {
                        alert("Please login to continue.");
                        navigate("/login");
                        return;
                      }

                      navigate("/checkout");
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
