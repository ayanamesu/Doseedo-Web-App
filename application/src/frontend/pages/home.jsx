import React, { useState } from 'react';

const HomePage = () => {
    const [isLoginForm, setIsLoginForm] = useState(false);

    const handleFormSwitch = () => {
        setIsLoginForm(!isLoginForm);
    };

    const handleButtonClick = (event) => {
        const buttons = document.querySelectorAll('.btn-field button');
        buttons.forEach(button => button.classList.remove('active'));
        event.currentTarget.classList.add('active');
    };

    return (
        <div className="main-content">
            <div className="homepage-container">
                <div className="home-content-left">
                    <h1 id="homepage-logo">Dosedo</h1>
                    <p id="homepage-description">Keep track of the ones you love</p>
                </div>
                
                <div className="signup-box">
                    <h1>Welcome:</h1>
                    {isLoginForm ? (
                        <form className ="homepage-form" action="/index" method="POST">
                            <h2>Register</h2>
                            <div className="btn-field">
                                <button type="button" >Register</button>
                                <button type="button" onClick={(event) => {handleFormSwitch(); handleButtonClick(event);}}>Login</button>
                            </div>
                            <input type="text" placeholder="First name" id="firstname-input" name="firstName"/>
                            <input type="text" placeholder="Last name" id="lastname-input" name="lastName"/>
                            <input type="text" placeholder="Email" id="email-input" name="email"/>
                            <input type="password" placeholder="Password" id="password-input" name="password" />
                            {/*keeping this feild without a name since im assuming we would check if the passwords
                            match on the front-end*/}
                            <input type="password" placeholder="Confirm Password" id="password-confirmation-input" />
                            <button type="submit" id="submit">submit</button>
                            {/* 
                                this is a quick test to see functionality - wing can change later
                            */}
                        </form>
                    ) : (
                        <form className="homepage-form" action="/login" method="POST">
                            <h2>Login</h2>
                            <div className="btn-field">
                                <button type="button" onClick={(event) => {handleFormSwitch(); handleButtonClick(event);}}>Register</button>
                                <button type="button" >Login</button>
                            </div>
                            <div className="login-input">
                                <input type="text" placeholder="Email" id="email-input" name="email"/>
                                <input type="password" placeholder="Password" id="password-input" name="password"/>
                                <button type="submit" id="submit">submit</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;