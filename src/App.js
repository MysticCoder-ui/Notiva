import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import Notestate from './context/notes/Notestate';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Verify from './component/Verify';
import Landing from './component/Landing';

function App() {
  // token state
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <Notestate>
        {!token ? (
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp setToken={setToken} />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
          </Routes>
        ) : (
          <>
            <Navbar setToken={setToken}/>
            <Routes>
              <Route path="/" element={<Navigate to="/home"/>} />
              <Route path="/home" element={<Home />} />
              <Route path="/verify/:token" element={<Verify />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </>
        )}
      </Notestate>
    </BrowserRouter>
  );
}

export default App;
