import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminProducts() {
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

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

   try {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );

      alert("Product Deleted Successfully");
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All"
        ? true
        : product.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <>
      <Sidebar />

      <div
        style={{
          marginLeft: "270px",
          minHeight: "100vh",
          background: "#121212",
          color: "#fff",
          padding: "30px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-warning">
            📦 Manage Products
          </h2>

          <Link
            to="/admin/add-product"
            className="btn btn-warning"
          >
            + Add Product
          </Link>
        </div>

        <div className="row mb-4">

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search Product..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
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

              <option value="Headphone">
                Headphone
              </option>

              <option value="Watch">
                Watch
              </option>

              <option value="Fashion">
                Fashion
              </option>
            </select>
          </div>

          <div className="col-md-3 text-end">
            <h5>
              Total Products :
              {" "}
              {filteredProducts.length}
            </h5>
          </div>

        </div>

        <div className="table-responsive">

          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th width="180">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {filteredProducts.length === 0 ? (

                <tr>
                  <td
                    colSpan="7"
                    className="text-center"
                  >
                    No Products Found
                  </td>
                </tr>

              ) : (

                filteredProducts.map((product) => (

                  <tr key={product._id}>

                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        width="70"
                        height="70"
                        style={{
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </td>

                    <td>{product.name}</td>

                    <td>
                      {product.brand || "-"}
                    </td>

                    <td>{product.category}</td>

                    <td>
                      ₹
                      {Number(
                        product.price
                      ).toLocaleString()}
                    </td>

                    <td>{product.stock}</td>

                    <td>

                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        className="btn btn-success btn-sm me-2"
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          deleteProduct(
                            product._id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>
      </div>
    </>
  );
}

export default AdminProducts;