const HomePage = () => {
    return (
        <div className="main-content">
            <div className="homepage-container">
                <div className="home-content-left">
                    <h1 id="homepage-logo">Dosedo</h1>
                    <p id="homepage-description">Keep track of the ones you love</p>
                </div>
                <div className="signup-box">
                    <form className ="homepage-form" action="/index" method="GET">
                        <h2>Welcome</h2>
                        <div className="btn-field">
                            <button type="submit">Register</button>
                            <button type="button" onClick={() => window.location.href = '/login'}>Login</button>
                        </div>
                        <input type="text" placeholder="First name" />
                        <input type="text" placeholder="Last name" />
                        <input type="text" placeholder="Phone, email or username" />
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Confirm Password" />
                        {/* 
                            this is a quick test to see functionality - wing can change later
                        */}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default HomePage;