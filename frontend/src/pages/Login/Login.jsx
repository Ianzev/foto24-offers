import './style.css';

function Login(){
    return(
        <div className="form-container sign-in">
            <form>
                <h1 className='h1-login'>Sign In</h1>
                <span>or use your email password</span>
                <input type="email" placeholder="Email" id='email'/>
                <input type="password" placeholder="Password" id='password'/>
                <a href="#">Forget Your Password?</a>
                <button>Sign In</button>
            </form>
        </div>
    );
};

export default Login;