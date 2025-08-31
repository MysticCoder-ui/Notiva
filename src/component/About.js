import React from "react";

export default function About() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f5f7fa", minHeight: "100vh" }}>
      {/* Inline CSS inside the file */}
      <style>
        {`
          .about-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px;
          }
          .about-card {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0px 8px 20px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .about-card:hover {
            transform: translateY(-5px);
            box-shadow: 0px 12px 25px rgba(0,0,0,0.15);
          }
          .about-title {
            font-size: 2.2rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
            text-align: center;
          }
          .about-text {
            font-size: 1.1rem;
            line-height: 1.6;
            color: #555;
            text-align: justify;
          }
          .highlight {
            color: #007bff;
            font-weight: bold;
          }
        `}
      </style>

      <div className="about-container">
        <div className="about-card">
          <h1 className="about-title">About Notiva 📒</h1>
          <p className="about-text">
            Welcome to <span className="highlight">Notiva</span> — your modern and smart note-taking
            application designed to make organizing ideas simple and elegant.  
            With Notiva, you can <span className="highlight">create</span>, 
            <span className="highlight"> edit</span>, and <span className="highlight"> manage</span> 
            all your notes with ease.
          </p>

          <p className="about-text">
            Our mission is to provide a distraction-free, smooth, and delightful experience for
            students, professionals, and anyone who loves jotting down thoughts 💡.
          </p>

        </div>
      </div>
    </div>
  );
}
