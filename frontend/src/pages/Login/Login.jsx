import './style.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({onErrorLogin}){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Login successful
                console.log('Login successful');
                navigate('/');
            } else {
                // Login failed
                console.error('Login failed');
                onErrorLogin();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="form-container sign-in">
            <form onSubmit={handleLogin}>
                <h1 className='h1-login'>Sign In</h1>
                <span>or use your email password</span>
                <input 
                    type="email" 
                    placeholder="Email" 
                    id='email'
                    value={formData.email} 
                    onChange={handleInputChange} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    id='password' 
                    value={formData.password} 
                    onChange={handleInputChange} 
                />
                <a href="#">Forget Your Password?</a>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
    
};

export default Login;