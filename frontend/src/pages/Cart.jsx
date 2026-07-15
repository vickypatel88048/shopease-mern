import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

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

          <h2 className="text-warning fw-bold mb-5">
            🛒 Shopping Cart
          </h2>

          {cartItems.length === 0 ? (

            <div
              className="card border-0 shadow-lg text-center p-5"
              style={{
                background: "#1e293b",
                borderRadius: "20px",
              }}
            >
              <h3 className="text-white">
                Your Cart is Empty
              </h3>

              <p className="text-secondary">
                Looks like you haven't added
                anything yet.
              </p>

              <Link
                to="/products"
                className="btn btn-warning mt-3"
              >
                Continue Shopping
              </Link>

            </div>

          ) : (

            <div className="row">

              {/* Cart Items */}

              <div className="col-lg-8">

                {cartItems.map((item) => (

                  <div
                    key={item._id}
                    className="card border-0 shadow-lg mb-4"
                    style={{
                      background: "#1e293b",
                      borderRadius: "20px",
                    }}
                  >

                    <div className="row g-0 align-items-center">

                      <div className="col-md-3">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid"
                          style={{
                            height: "220px",
                            width: "100%",
                            objectFit: "cover",
                            borderRadius:
                              "20px 0 0 20px",
                          }}
                        />

                      </div>

                      <div className="col-md-9">

                        <div className="card-body">

                          <h4 className="text-white fw-bold">
                            {item.name}
                          </h4>

                          <p className="text-secondary">
                            {item.brand ||
                              "ShopEase"}
                          </p>

                          <span className="badge bg-success">
                            In Stock
                          </span>

                          <h3 className="text-warning mt-3">
                            ₹
                            {item.price.toLocaleString()}
                          </h3>

                          <div className="d-flex align-items-center gap-3 my-4">

                            <button
                              className="btn btn-outline-light"
                              onClick={() =>
                                dispatch(
                                  decreaseQty(
                                    item._id
                                  )
                                )
                              }
                            >
                              −
                            </button>

                            <h5 className="text-white m-0">
                              {item.quantity}
                            </h5>

                            <button
                              className="btn btn-outline-light"
                              onClick={() =>
                                dispatch(
                                  increaseQty(
                                    item._id
                                  )
                                )
                              }
                            >
                              +
                            </button>

                          </div>

                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              dispatch(
                                removeFromCart(
                                  item._id
                                )
                              )
                            }
                          >
                            🗑 Remove
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>
                            {/* Order Summary */}

              <div className="col-lg-4">

                <div
                  className="card border-0 shadow-lg"
                  style={{
                    background: "#1e293b",
                    borderRadius: "20px",
                    position: "sticky",
                    top: "100px",
                  }}
                >
                  <div className="card-body">

                    <h3 className="text-warning fw-bold mb-4">
                      Order Summary
                    </h3>

                    <div className="d-flex justify-content-between text-light mb-3">
                      <span>Total Items</span>
                      <span>
                        {cartItems.reduce(
                          (acc, item) =>
                            acc + item.quantity,
                          0
                        )}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between text-light mb-3">
                      <span>Subtotal</span>
                      <span>
                        ₹{totalPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between text-light mb-3">
                      <span>Delivery</span>
                      <span className="text-success">
                        FREE
                      </span>
                    </div>

                    <hr className="border-secondary" />

                    <div className="d-flex justify-content-between mb-4">
                      <h4 className="text-white">
                        Total
                      </h4>

                      <h4 className="text-warning">
                        ₹{totalPrice.toLocaleString()}
                      </h4>
                    </div>

                    <div className="d-grid gap-3">

                      <Link
                        to="/checkout"
                        className="btn btn-warning btn-lg fw-bold"
                      >
                        💳 Proceed To Checkout
                      </Link>

                      <Link
                        to="/products"
                        className="btn btn-outline-light"
                      >
                        Continue Shopping
                      </Link>

                    </div>

                  </div>
                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </>
  );
}

export default Cart;
