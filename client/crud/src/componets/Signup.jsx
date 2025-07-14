import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import  {BsPersonCircle}  from "react-icons/bs";


export default function Signup() {

  const [avatar, setAvatar] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: ""
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {

    e.preventDefault();
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (avatar) data.append("avatar", avatar);
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
        method="post" 
        enctype="multipart/form-data"
        className="bg-white p-8 rounded-lg shadow-lg w-96 flex-col flex items-center justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        
        {/* Avatar */}
       <label htmlFor="profile_uploads" className="cursor-pointer m-3" >
        { avatar ? (<img src= {avatar} className="w-24 h-24 rounded-full m-auto" />): 
        (<BsPersonCircle className="w-24 h-24 rounded-full m-auto" /> )}
       </label>

       <input 
        type="file"
        name="profile_uploads"
        className="hidden" 
        id="profile_uploads" 
        // accept=".jpg, .jpeg, .png,"
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
