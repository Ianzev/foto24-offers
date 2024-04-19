import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './style.css';
import { Link, useLocation } from 'react-router-dom';

const LoginContainer = ({isLoginFormProp}) => {

    const [isLoginForm, setIsLoginForm] = useState(isLoginFormProp);
    const [showAlert, setShowAlert] = useState(false);
    const location = useLocation();

    const handleSuccessfulRegistration = () => {
        setIsLoginForm(true); // Update isLoginForm to true
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false); // Hide the alert after 5 seconds
        }, 5000); // 5000 milliseconds = 5 seconds
    };

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm); // Toggle the isActive state
    };

    return (
        <>
        <div className='wrapper'>
        <div className={`container ${isLoginForm ? '' : 'active'} main-container`}>
            {isLoginForm ? (
                <>
                <Login />
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-right">
                            <h1 className='h1-login'>Hello, Friend!</h1>
                            <p>You don't have an account? Register with your personal details to use all of site features</p>
                            <Link to='/register'><button className="button-form" id="register" onClick={toggleForm}>Sign Up</button></Link>
                        </div>
                    </div>
                </div>
                </>
            ) : (
                <>
                <Register onSuccessfulRegistration={handleSuccessfulRegistration}/>
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
        {(showAlert && (location.pathname === '/register' || location.pathname === '/login')) && (
                <div className="custom-alert">
                    <span className="close" onClick={() => setShowAlert(false)}>&times;</span>
                    Registration successful!
                </div>
            )}
        </>
       
    );
};

export default LoginContainer;
