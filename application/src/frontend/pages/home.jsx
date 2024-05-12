import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import Topbar from '../Components/topbar';

const HomePage = ({ apiLink }) => {
    let navigate = useNavigate();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [user_id, setUserId] = useState("");
    //shows notification
    const [showNotification, setShowNotification] = useState(false);
    //sets the notification message based on if the account was created or not
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
    const [accountType, setAccountType] = useState("");

    useEffect(() => {
        if (!(Cookies.get('user_id') && Cookies.get('session_id'))) {
            setUserId(Cookies.get('user_id'));       
        } else{
            if(Cookies.get('accountType')==='patient'){
                navigate("/patient_dashboard", { replace: true }); // Programmatically navigate to "/"
                
            }else{
                navigate("/caregiver_dashboard", { replace: true }); // Programmatically navigate to "/"
            }
        }
    }, [user_id]);
    
  function handleLoginForm(event) {
    if ( !email || !password ) {
        event.preventDefault();
        alert("Please fill out all the fields.");
        return;
    }

    event.preventDefault();
    let userData = {
        email: email,
        password: password
    }

    axios.post(apiLink + '/login', userData)
        .then(res => {
            if (res.status === 200) {
                setCookie("session_id", res.data.session_id, { sameSite: 'lax'});
                setCookie("user_id", res.data.user_id, { sameSite: 'lax'});
                
                alert("Successfully logged In!");

                if(res.data.user_accountType==='patient'){
                    setCookie('accountType', res.data.user_accountType, { sameSite: 'lax'});
                    navigate('/patient_dashboard');
                }else{
                    setCookie('accountType', res.data.user_accountType, { sameSite: 'lax'});
                    navigate('/caregiver_dashboard');
                }
            }
        })
        .catch(err => alert("email and password combination is not correct or account doesn't exist"));
    }

    function handleRegisterForm(event) {
        event.preventDefault();
        if (!fname || !lname || !email || !password || !confPassword) {
            alert("Please fill out all the fields.");
            return;
        }

        if (password !== confPassword) {
            console.log("passwords do not match!");
            alert("Passwords do not match😕");
            return;
        }

        let userData = {
            first_name: fname,
            last_name: lname,
            email: email,
            account_type: accountType,
            password: password
        }
    
        axios.post(apiLink + '/register', userData)
            .then(res => {
                if (res.status === 201) {
                    alert("Account Creation was successful 😀!");
                } else if( res.status === 200){
                    console.log(showNotification);
                    alert("An Account is already associated with this email😕");
                } else {
                    alert("An error occured😕");
                }
            })
            .catch(err => console.log(err));
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
        <div className="">
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
                            {/*keeping this field without a name since im assuming we would check if the passwords
                            match on the front-end*/}
                            <input type="password" placeholder="Confirm Password" id="password-confirmation-input" onChange={e => setConfPassword(e.target.value)}/>
                            <p> Are you a Caregiver or Patient?</p>
                            <div id="account-type-input">
                                <label>
                                    <input required type="radio" name="accountType" value="caregiver" checked={accountType === 'caregiver'} onChange={(e) => setAccountType(e.target.value)} />
                                    Caregiver
                                </label>
                                <label>
                                    <input type="radio" name="accountType" value="patient" checked={accountType === 'patient'} onChange={(e) => setAccountType(e.target.value)} required />
                                    Patient
                                </label>
                            </div>
                            <button type="submit" id="submit">submit</button>
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