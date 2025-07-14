import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


export default function Signup() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {

    e.preventDefault();
    console.log("Signup form submitted");

    try {
        const res = await axios.post("http://localhost:5000/api/v1/users/register",
        formData,
    // { withCredentials: true }
  );

        console.log("Response:", res.data); // ✅ now this works
        alert("User registered successfully!");
        navigate("/product");
} catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      alert("Registration failed");
}
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        enctype="multipart/form-data"
        className="bg-white p-8 rounded-lg shadow-lg w-96 border-2 flex-col flex items-center justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        
        {/* Avatar */}
        <input type="file" name="uploadfile" 
         className="m-auto border-2 border-black-800 w-20 h-20 rounded-full mb-2"
          />
          

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-4 border rounded"
          value={formData.fullname}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>
         <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
                Login
            </Link>
        </p>
      </form>
    </div>
  );
}
