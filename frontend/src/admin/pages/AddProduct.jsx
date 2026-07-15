import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
try {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  await axios.post(
    `${import.meta.env.VITE_API_URL}/api/products`,
    product,
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );
      alert("Product Added Successfully");

      setProduct({
        name: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
        image: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to Add Product");
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "#121212",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <div
          className="card shadow-lg border-0 p-4"
          style={{
            background: "#1f1f1f",
            color: "#fff",
          }}
        >
          <h2 className="text-warning text-center mb-4">
            Add Product
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Brand</label>
                <input
                  type="text"
                  className="form-control"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Stock</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 mb-3">
                <label>Description</label>
                <textarea
                  rows="4"
                  className="form-control"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-12">
                <button
                  className="btn btn-warning w-100"
                >
                  Add Product
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;