import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

function SignUp({setToken}) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent refresh

    let { name, email, password, confirmPassword } = credentials;

    // check confirm password BEFORE making request
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log("Signup response:", data);

      if (response.ok) {
        // success
        alert(data.message || "Signup successful!");
        localStorage.setItem("token", data.authToken);
        setToken(data.authToken);
        // go to /home since token is set
        navigate('/home');
      } else {
        if (data.errors) {
          alert(data.errors.join("\n"));
        } else {
          alert(data.error || "Something went wrong");
        }
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="card-title text-center mb-4">Sign Up</h3>

        <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter your name" onChange={onChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" onChange={onChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" onChange={onChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" onChange={onChange} />
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>

          <p className="text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
