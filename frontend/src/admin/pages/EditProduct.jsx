import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/products/${id}`
  );

      setProduct({
        name: res.data.name || "",
        price: res.data.price || "",
        category: res.data.category || "",
        brand: res.data.brand || "",
        stock: res.data.stock || "",
        image: res.data.image || "",
        description: res.data.description || "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to load product");
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   try {
  await axios.put(
    `${import.meta.env.VITE_API_URL}/api/products/${id}`,
    product
  );

      alert("Product Updated Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert("Failed to update product");
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
          className="card border-0 shadow-lg p-4"
          style={{
            background: "#1f1f1f",
            color: "#fff",
          }}
        >
          <h2 className="text-warning text-center mb-4">
            Edit Product
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
                  required
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
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <label>Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-warning w-100"
                >
                  Update Product
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;