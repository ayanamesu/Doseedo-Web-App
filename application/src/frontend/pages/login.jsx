import React, {useState} from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);

    function handleLoginForm(event) {
        event.preventDefault();
        let userData = {
            email: email,
            password: password
        }

        axios.post('http://localhost:8000/api/login', userData)
        .then(res => {
            console.log(res.status); 
            //res = backend res.status(200).json(req.session.id); from the post
            if (res.status === 200) {
                console.log(res.data);

                // This sets a cookie in the browser
                /*
                 * To see this:
                 * 1) Make sure you have some log in data (if not make a account via the sign up)
                 * 2) Go to the login page
                 * 3) Open Inspect --> and look for where the cookies are (might be in 'Application' or ' Storage')
                 * 4) Log in --> AND BAM cookies show up (you'll see session_id and a very long thing as the value)
                */
                setCookie("session_id", res.data, { sameSite: 'lax'});

                // TODO: Frontend - do whatever you gotta do with this information

            } else {
                console.log("Something weird happened...");

                // TODO: Frontend - do whatever for error handling
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