// LoginForm.jsx
import React from 'react';
import './style.css';

const LoginForm = ({ isLoginForm }) => {
    return (
        <div className="form-container.sign-up">
            {isLoginForm ? (
                <form>
                    <h1>Sign In</h1>
                    <span>or use your email password</span>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <a href="#">Forget Your Password?</a>
                    <button>Sign In</button>
                </form>
            ) : (
                <form>
                    <h1>Create Account</h1>
                    <div className="social-icons">
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign Up</button>
                </form>
            )}
        </div>
    );
};

export default LoginForm;
