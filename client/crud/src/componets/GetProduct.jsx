import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function GetProduct() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ productName: "", quantity: "" });
  const [editId, setEditId] = useState(null); // store the _id of product being edited
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/products/myproduct", {
        withCredentials: true,
      });
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/products/deleteproduct/${id}`, {
        withCredentials: true,
      });
      alert("Product deleted");
      fetchProducts();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = (product) => {
    setFormData({ productName: product.productName, quantity: product.quantity });
    setEditId(product._id); // switch to edit mode
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productName || !formData.quantity) {
      alert("All fields are required");
      return;
    }

    try {
      if (editId) {
        // Edit existing product
        await axios.put(
          `http://localhost:5000/api/v1/products/editproduct/${editId}`,
          formData,
          { withCredentials: true }
        );
        alert("Product updated");
        setEditId(null);
      } else {
        // Add new product
        await axios.post("http://localhost:5000/api/v1/products/addproduct", formData, {
          withCredentials: true,
        });
        alert("Product added");
      }

      setFormData({ productName: "", quantity: "" });
      fetchProducts();
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  const logout = async()=>{
    try {
      await axios.get("http://localhost:5000/api/v1/users/logout", {
        withCredentials: true,
      });
      alert("User logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="border-2 w-full p-4 rounded-md bg-gray-100 flex flex-col gap-3"
      >
        <h2 className="text-lg font-semibold mb-2">
          {editId ? "Edit Product" : "Add Product"}
        </h2>
        <input
          type="text"
          placeholder="Enter Product Name"
          className="border p-2 rounded bg-white"
          value={formData.productName}
          onChange={(e) =>
            setFormData({ ...formData, productName: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Enter Quantity"
          className="border p-2 rounded bg-white"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* logout */}
      <div>
        <button className="border-2 mt-2 p-2 p-y-2 rounded bg-blue-500 text-white" onClick={logout}>Logout</button>
      {/* <h1>Welcome to Product Page</h1> */}
    </div>



      {/* Product List */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-center mb-4">Product List</h3>
        {products.length === 0 && (
        <p className="text-center text-gray-500">No products found.</p>
      )}
        {products.map((product) => (
          <div
            key={product._id}
            className="flex justify-between items-center border p-3 rounded mb-3 bg-white shadow"
          >
            <div>
              <p className="font-medium">{product.productName}</p>
              <p className="text-sm text-gray-600">
                Quantity: {product.quantity}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="px-3 py-1 bg-blue-400 hover:bg-blue-500 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="px-3 py-1 bg-blue-400 hover:bg-blue-500 text-white rounded"
              >
                Delete
              </button>
            </div>  
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetProduct;
