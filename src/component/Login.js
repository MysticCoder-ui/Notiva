import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login({setToken}) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials), // send actual input values
    });

    const data = await response.json();
    console.log(data); // handle login response

    if(response.ok){
      localStorage.setItem("token",data.authToken);
      setToken(data.authToken);
      navigate('/home');
    }
  };

  const onChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="card-title text-center mb-4">Login</h3>

        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <div className="d-grid mb-3">
            <button className="btn btn-primary" onClick={handleClick}>
              Login
            </button>
          </div>

          <p className="text-center">
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
