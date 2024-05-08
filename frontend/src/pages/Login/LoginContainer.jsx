import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import styles from "./style.module.css"; // Importing CSS module
import foto24LogoWhite from "./images/foto24-logo-white.png";
import Alert from "../components/Alert.jsx";

const LoginContainer = ({ isLoginFormProp }) => {
  const [isLoginForm, setIsLoginForm] = useState(isLoginFormProp);
  const [showSuccessRegistrationAlert, setShowSuccessAlert] = useState(false);
  const [showErrorRegistrationAlert, setShowRegErrorAlert] = useState(false);
  const [showErrorLoginAlert, setShowLogErrorAlert] = useState(false);

  const handleSuccessfulRegistration = () => {
    setIsLoginForm(true);
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 8000);
  };

  const handleRegistrationError = () => {
    setShowRegErrorAlert(true);
    setTimeout(() => {
      setShowRegErrorAlert(false);
    }, 8000);
  };

  const handleLoginError = () => {
    setShowLogErrorAlert(true);
    setTimeout(() => {
      setShowLogErrorAlert(false);
    }, 8000);
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <>
      <div className={styles["login-container"]}>
        <div className={styles.wrapper}>
          <div
            className={`${styles.container} ${
              isLoginForm ? "" : styles.active
            } ${styles["main-container"]}`}
          >
            {isLoginForm ? (
              <>
                <Login onErrorLogin={handleLoginError} />
                <div className={styles["toggle-container"]}>
                  <div className={styles.toggle}>
                    <div
                      className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}
                    >
                      <img src={foto24LogoWhite} alt></img>
                      <h1 className={styles["h1-login"]}>Hello, Friend!</h1>
                      <p>
                        You don't have an account? Register with your personal
                        details to use all of site features
                      </p>
                      <Link to="/register">
                        <button
                          className={styles["button-form"]}
                          id="register"
                          onClick={toggleForm}
                        >
                          Sign Up
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                {showErrorLoginAlert && (
                  <Alert
                    message="Please verify your email and password and try again"
                    result={false}
                    onClose={() => setShowSuccessAlert(false)}
                  />
                )}
              </>
            ) : (
              <>
                <Register
                  onSuccessfulRegistration={handleSuccessfulRegistration}
                  onErrorRegistration={handleRegistrationError}
                />
                <div className={styles["toggle-container"]}>
                  <div className={styles.toggle}>
                    <div
                      className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}
                    >
                      <img src={foto24LogoWhite} alt></img>
                      <h1 className={styles["h1-login"]}>Welcome Back!</h1>
                      <p>
                        You already have an account? Enter your personal details
                        to use all of site features
                      </p>
                      <Link to="/login">
                        <button
                          className={styles["button-form"]}
                          id="login"
                          onClick={toggleForm}
                        >
                          Sign In
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {showSuccessRegistrationAlert && (
          <Alert
            message="Registration successful! You can log in now!"
            result={true}
            onClose={() => setShowSuccessAlert(false)}
          />
        )}
        {showErrorRegistrationAlert && (
          <Alert
            message="Registration failed! This email is already assigned to an account"
            result={false}
            onClose={() => setShowRegErrorAlert(false)}
          />
        )}
      </div>
    </>
  );
};

export default LoginContainer;
