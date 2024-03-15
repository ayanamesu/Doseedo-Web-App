const LoginPage = () => {
    return (
        <>
            <div className="Login-box">
                <h2>Login</h2>
                
               
                <form action="/" method="GET">
                    <input type="text" placeholder="Phone, email or username" />
                    <input type="password" placeholder="Password" />
                    {/* 
                        this is a quick test to see functionality - wing can change later
                    */}
                    <button type="submit">Login</button>
                </form>
                <button>Forgot password?</button>
                <p>Don't have an account? <a id="signup-link" href="/signup">Sign up</a></p>
            </div>
        </>
    );
};

export default LoginPage;