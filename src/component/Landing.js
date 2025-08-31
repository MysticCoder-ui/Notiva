import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();
    const containerStyle = {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6B46C1, #4F46E5, #3B82F6)",
        color: "#fff",
        textAlign: "center",
        padding: "0 20px",
        position: "relative",
        overflow: "hidden",
    };

    const headingStyle = {
        fontSize: "3rem",
        fontWeight: "bold",
        marginBottom: "20px",
    };

    const paragraphStyle = {
        fontSize: "1.2rem",
        marginBottom: "30px",
    };

    const buttonContainer = {
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "center",
    };

    const buttonPrimary = {
        padding: "12px 30px",
        backgroundColor: "#FACC15",
        color: "#000",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        textDecoration: "none",
    };

    const buttonSecondary = {
        padding: "12px 30px",
        backgroundColor: "transparent",
        color: "#fff",
        border: "2px solid #fff",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        textDecoration: "none",
    };

    const footerStyle = {
        position: "absolute",
        bottom: "10px",
        fontSize: "0.9rem",
        color: "rgba(255,255,255,0.7)",
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Welcome to <span style={{ color: "#FBBF24" }}>Notiva</span></h1>
            <p style={paragraphStyle}>
                Organize your notes, track your tasks, and boost your productivity effortlessly.
            </p>
            <div style={buttonContainer}>
                <Link to="/signup" style={buttonPrimary} >Get Started</Link>
                <Link to="/login" style={buttonSecondary} >Login</Link>
            </div>
            <div style={footerStyle}>
                &copy; 2025 Notiva. All rights reserved.
            </div>
        </div>
    );
};

export default Landing;
