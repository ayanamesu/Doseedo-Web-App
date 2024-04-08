import React, {useState} from 'react';

const SignUpPage = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    
    function handleRegisterForm(event) {
        event.preventDefault();
        if (password !== confPassword) {
            console.log("passwords do not match!");
            return;
        }
        let userData = {
            fname: fname,
            lname: lname,
            email: email,
            password: password
        }
        fetch("http://localhost:8000/api/signup", {
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
                
               
                <form onSubmit={handleRegisterForm}>
                    <input type="text" placeholder="First name" onChange={e => setFname(e.target.value)}/>
                    <input type="text" placeholder="Last name" onChange={e => setLname(e.target.value)}/>
                    <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <input type="password" placeholder="Confirm Password" onChange={e => setConfPassword(e.target.value)}/>
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