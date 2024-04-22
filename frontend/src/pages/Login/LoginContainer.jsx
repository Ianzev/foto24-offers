import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Alert from '../Components/Alert';
import './style.css';



const LoginContainer = ({isLoginFormProp}) => {

    const [isLoginForm, setIsLoginForm] = useState(isLoginFormProp);

    const [showSuccessRegistrationAlert, setShowSuccessAlert] = useState(false);
    const [showErrorRegistrationAlert, setShowRegErrorAlert] = useState(false);

    const [showErrorLoginAlert, setShowLogErrorAlert] = useState(false);

    const handleSuccessfulRegistration = () => {
        setIsLoginForm(true); // Update isLoginForm to true
        setShowSuccessAlert(true);
        setTimeout(() => {
            setShowSuccessAlert(false); // Hide the alert after 5 seconds
        }, 8000); // 5000 milliseconds = 5 seconds

    };

    const handleRegistrationError = () => {
        setShowRegErrorAlert(true);
        setTimeout(() => {
            setShowRegErrorAlert(false); // Hide the error alert after 5 seconds
        }, 8000); // 8000 milliseconds = 8 seconds
    };

    const handleLoginError = () => {
        setShowLogErrorAlert(true);
        setTimeout(() => {
            setShowLogErrorAlert(false); // Hide the error alert after 5 seconds
        }, 8000); // 8000 milliseconds = 8 seconds
    };

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm); // Toggle the isActive state
    };



    return (
        <>
        <div className='login-container'>
        <div className='wrapper'>
        <div className={`container ${isLoginForm ? '' : 'active'} main-container`}>
            {isLoginForm ? (
                <>
                <Login onErrorLogin={handleLoginError}/>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-right">
                            <h1 className='h1-login'>Hello, Friend!</h1>
                            <p>You don't have an account? Register with your personal details to use all of site features</p>
                            <Link to='/register'><button className="button-form" id="register" onClick={toggleForm}>Sign Up</button></Link>
                        </div>
                    </div>
                </div>
                {showErrorLoginAlert && (
                <Alert  message={
                    <>Please verify your email and password and try again </>} 
                        result={false} onClose={() => setShowSuccessAlert(false)} />
            )}
                </>
            ) : (
                <>
                <Register onSuccessfulRegistration={handleSuccessfulRegistration} onErrorRegistration={handleRegistrationError}/>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1 className='h1-login'>Welcome Back!</h1>
                            <p>You already have an account? Enter your personal details to use all of site features</p>
                            <Link to='/login'><button className="button-form" id="login" onClick={toggleForm} >Sign In</button></Link>
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
        </div>
        {showSuccessRegistrationAlert && (
                <Alert  message={
                    <>  Registration successful!<br />
                        You can log in now!</>} 
                        result={true} onClose={() => setShowSuccessAlert(false)} />
            )}
        {showErrorRegistrationAlert && (
                <Alert  message={
                    <>  Registration failed! <br />
                        This email is already assigned to an account</>} 
                        result={false} onClose={() => setShowRegErrorAlert(false)} />
            )}
            </div>
        </>
       
    );
};

export default LoginContainer;
