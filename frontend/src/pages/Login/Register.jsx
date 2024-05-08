import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css"; // Importing CSS module

function Register({ onSuccessfulRegistration, onErrorRegistration }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      response.ok
        ? // Registration successful
          (console.log("Registration successful"),
          navigate("/login"),
          onSuccessfulRegistration())
        : // Registration failed
          (console.error("Registration failed"), onErrorRegistration());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={`${styles["form-container"]} ${styles["sign-up"]}`}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles["h1-login"]}>Create Account</h1>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Lastname"
            id="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
