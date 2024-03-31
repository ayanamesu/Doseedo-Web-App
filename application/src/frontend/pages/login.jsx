import React, {useState} from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // Via fetch API
    function handleLoginForm(event) {
        event.preventDefault();
        let userData = {
            email: email,
            password: password
        }
        fetch("http://localhost:8000/api/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
        console.log("Button has been clicked!");
    }

    return (
        <>
            <div className="Login-box">
                <h2>Login</h2>
                
               
                <form onSubmit={handleLoginForm}>
                    <input type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    <input type="password" name="password" placeholder="Password"  onChange={e => setPassword(e.target.value)}/>
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