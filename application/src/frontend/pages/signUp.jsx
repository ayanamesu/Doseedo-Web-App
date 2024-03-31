import React, {useState} from 'react';

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function handleRegisterForm(event) {
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
        }).then(response => response.json()).then(data => {
            console.log(data);
        });
        console.log("Button has been clicked!");
    }

    return (
        <>
            <div className="signup-box">
                <h2>Sign Up</h2>
                
               
                <form action="/index" onSubmit={handleRegisterForm}>
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