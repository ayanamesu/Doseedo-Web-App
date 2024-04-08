import React, {useState} from 'react';
import axios from 'axios';
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    function handleLoginForm(event) {
        event.preventDefault();
        let userData = {
            email: email,
            password: password
        }

        axios.post('http://localhost:8000/api/login', userData)
        .then(res => {
            console.log(res.data.message);
            if (res.data.message === "Credentials are good") {
                console.log("successfully logged in")
            } else {
                console.log("You need to make an account")
            }
        })
        .catch(err => console.log(err));
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