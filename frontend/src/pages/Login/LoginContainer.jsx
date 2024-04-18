// LoginContainer.jsx
import React, { useState } from 'react';
import LoginForm from './Login';
import './style.css';

const LoginContainer = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };
    

    return (
        <div className='container'>
            <div className="form-container sign-in">
                <LoginForm isLoginForm={isLoginForm} />
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className={`toggle-panel toggle-left`}>
                        <h1>{isLoginForm ? "Welcome Back!" : "Hello, Friend!"}</h1>
                        <p>{isLoginForm ? "Enter your personal details to use all site features." : "Register with your personal details to use all site features."}</p>
                        <button className={`hidden`} onClick={toggleForm}>
                            {isLoginForm ? "Sign In" : "Register"}
                        </button>
                    </div>
                    <div className={`toggle-panel toggle-right`}>
                        <h1>{isLoginForm ? "Hello, Friend!" : "Welcome Back!"}</h1>
                        <p>{isLoginForm ? "Register with your personal details to use all site features." : "Enter your personal details to use all site features."}</p>
                        <button className="register" onClick={toggleForm}>
                            {isLoginForm ? "Register" : "Sign In"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginContainer;
