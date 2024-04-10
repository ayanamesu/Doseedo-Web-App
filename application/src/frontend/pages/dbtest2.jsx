import React, { useState} from 'react';
import axios from 'axios';

const Dbtest2 = () => {
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
        first_name: fname,
        last_name: lname,
        email: email,
        password: password
    }
   
    axios.post('http://localhost:8000/api/dbtest2', userData)
        .then(res => {
            console.log(res.data.data);
            if (res.data.data === "False") {
                console.log("They account successfully made!")
            } else {
                console.log("They already have an account")
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

export default Dbtest2;