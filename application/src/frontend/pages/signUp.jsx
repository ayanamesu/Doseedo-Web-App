const SignUpPage = () => {
    return (
        <>
            <div className="signup-box">
                <h2>Sign Up</h2>
                
               
                <form action="/index" method="GET">
                    <input type="text" placeholder="First name" />
                    <input type="text" placeholder="Last name" />
                    <input type="text" placeholder="Phone, email or username" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    {/* 
                        this is a quick test to see functionality - wing can change later
                    */}
                    <div className="btn-field">
                    <button type="submit">Register</button>
                    <button type="button" onClick={() => window.location.href = '/login'}>Login</button>
                    </div>
                </form>
                
            </div>
        </>
    );
};

export default SignUpPage;