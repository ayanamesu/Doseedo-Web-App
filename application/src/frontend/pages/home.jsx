import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import UseSessionCheck from '../Components/UseSessionCheck';
import { useEffect } from 'react';

const HomePage = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  let navigate = useNavigate();
  const [user_id, setUserId] = useState("");
  //shows notification
  const [showNotification, setShowNotification] = useState(false);
  //sets the notification message based on if the account was created or not
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
  const sessionUserId = UseSessionCheck();
  useEffect(() => {
    if (sessionUserId[0] === "") {
        navigate('/');
    } else {
        navigate('/dashboard');
        setUserId(sessionUserId);
    }
}, []);

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
            console.log("User crendentials are good and a session is created in the db");

            // This sets a cookie in the browser
            /*
             * To see this:
             * 1) Make sure you have some log in data (if not make a account via the sign up)
             * 2) Go to the login page
             * 3) Open Inspect --> and look for where the cookies are (might be in 'Application' or ' Storage')
             * 4) Log in --> AND BAM cookies show up (you'll see session_id and a very long thing as the value)
            */
            setCookie("session_id", res.data.session_id, { sameSite: 'lax'});
            alert("Successfuly logged In!");
            // TODO: Frontend - do whatever you gotta do with this information
            // change this to the dashboard page
            navigate('/dashboard');

        } else {
            console.log("Something weird happened...");

            // TODO: Frontend - do whatever for error handling
        }
    })
    .catch(err => console.log(err));

    console.log("Button has been clicked!");
}
  
  function handleRegisterForm(event) {
    event.preventDefault();
    if (password !== confPassword) {
        console.log("passwords do not match!");
        setNotificationType('error');
        setShowNotification(true);
        setNotificationMessage("Passwords do not match😕");
        setTimeout(() => setShowNotification(false), 4000);
        return;
    }
    let userData = {
        first_name: fname,
        last_name: lname,
        email: email,
        password: password
    }
   
    axios.post('http://localhost:8000/api/Register', userData)
        .then(res => {
            console.log(res.status);
            if (res.status === 201) {
                setNotificationType('success');
                console.log("They account successfully made!")
                setNotificationMessage("Account Creation was successful😀");
                setShowNotification(true);
                //this is only here so that it delays the redirect enough for the user to see the notification
                //insted of using a library like redux that can display the notification on the next page
                setTimeout(() => {
                    setShowNotification(false);
                    navigate('/');
                }, 200);
            } else if( res.status === 200){
                console.log("They already have an account")
                setNotificationType('error');
                setShowNotification(true);
                //this was to to test if the notification was showing up
                console.log(showNotification);
                setNotificationMessage("An Account is already associated with this email😕");
                setTimeout(() => setShowNotification(false), 5000);
            } else {
                console.log("Something weird happened...");
                setNotificationType('error');
                setShowNotification(true);
                setNotificationMessage("An error occured😕");
                setTimeout(() => setShowNotification(false), 5000);
            }
        })
        .catch(err => console.log(err));
    console.log("Button has been clicked!");
}
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
            {showNotification && <div className={`notification ${notificationType}`}>{notificationMessage}</div>}
            <div className="homepage-container">
                <div className="home-content-left">
                    <h1 id="homepage-logo">Doseedo</h1>
                    <p id="homepage-description">Keep track of the ones you love</p>
                </div>
                
                <div className="signup-box">
                    <h1>Welcome:</h1>
                    {isLoginForm ? (
                        <form className ="homepage-form" onSubmit={handleRegisterForm}>
                            <h2>Register</h2>
                            <div className="btn-field">
                                <button type="button" >Register</button>
                                <button type="button" onClick={(event) => {handleFormSwitch(); handleButtonClick(event);}}>Login</button>
                            </div>
                            <input type="text" placeholder="First name" id="firstname-input" name="firstName" onChange={e => setFname(e.target.value)}/>
                            <input type="text" placeholder="Last name" id="lastname-input" name="lastName" onChange={e => setLname(e.target.value)}/>
                            <input type="email" placeholder="Email" id="email-input" name="email" onChange={e => setEmail(e.target.value)}/>
                            <input type="password" placeholder="Password" id="password-input" name="password" onChange={e => setPassword(e.target.value)}/>
                            {/*keeping this feild without a name since im assuming we would check if the passwords
                            match on the front-end*/}
                            <input type="password" placeholder="Confirm Password" id="password-confirmation-input" onChange={e => setConfPassword(e.target.value)}/>
                            <button type="submit" id="submit">submit</button>
                            {/* 
                                this is a quick test to see functionality - wing can change later
                            */}
                        </form>
                    ) : (
                        <form className="homepage-form" action="/login" method="POST" onSubmit={handleLoginForm}>
                            <h2>Login</h2>
                            <div className="btn-field">
                                <button type="button" onClick={(event) => {handleFormSwitch(); handleButtonClick(event);}}>Register</button>
                                <button type="button" >Login</button>
                            </div>
                            <div className="login-input">
                                <input type="text" placeholder="Email" id="email-input" name="email" onChange={e => setEmail(e.target.value)}/>
                                <input type="password" placeholder="Password" id="password-input" name="password" onChange={e => setPassword(e.target.value)}/>
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