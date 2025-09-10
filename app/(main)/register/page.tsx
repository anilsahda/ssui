"use client";
import { useState } from "react";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import API from "api";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/users", formData);
      alert("✅ User registered successfully");
      console.log(res.data);
    } catch (err: any) {
      alert("❌ " + (err.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "350px", borderRadius: "12px" }}>
        <h3 className="text-center mb-4">Register</h3>

        <form onSubmit={handleRegister}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter name"
              required
            />
          </div>

          {/* Mobile */}
          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter mobile"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Register Button */}
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}






// "use client";
// import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";

// export default function Login() {
//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="card shadow p-4" style={{ width: "350px", borderRadius: "12px" }}>
//         <h3 className="text-center mb-4">Register</h3>

//         {/* Name */}
//         <div className="mb-3">
//           <label className="form-label">Name</label>
//           <input type="email" className="form-control" placeholder="Enter name" />
//         </div>

//         {/* Mobile */}
//         <div className="mb-3">
//           <label className="form-label">Mobile</label>
//           <input type="text" className="form-control" placeholder="Enter mobile" />
//         </div>

//         {/* Email */}
//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input type="email" className="form-control" placeholder="Enter your email" />
//         </div>

//         {/* Password */}
//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input type="password" className="form-control" placeholder="Enter your password" />
//         </div>

//         {/* Login Button */}
//         <a href="admin" className="btn btn-primary w-100 mb-3">Register</a>

//       </div>
//     </div>
//   );
// }
