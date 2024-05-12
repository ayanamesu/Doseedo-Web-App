import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import useSessionCheck from '../Components/UseSessionCheck';
import axios from 'axios';
import "../App.css";
import { useEffect } from 'react';
import Cookies from 'js-cookie';

// Previously had via github commit e462e7b (the pervious change to this)
// import UseSessionCheck from '../Components/UseSessionCheck';

const SettingsPage = ({ apiLink }) => {
    const navigate = useNavigate();
    const [email, setLinkEmail] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (Cookies.get('user_id') && Cookies.get('session_id')) {
            setUserId(Cookies.get('user_id'));
            console.log("User id has been set!" + userId);
        } else {
            alert("You need to relog in!")
            navigate('/');
        }
    }, [userId]);

    const handleGeneralClick = () => {
        navigate("/settings/General", { replace: true }); 
    };

    const handleAccountSettingsClick = () => {
        navigate("/settings/AccountSettings", { replace: true }); 
    };

    const handleAccessibilityClick = () => {
        navigate("/settings/Accessibility", { replace: true }); 
    };

    const handleLanguageClick = () => {
        navigate("/settings/Language", { replace: true }); 
    };

    function handleAccountPairClick(event) {
        event.preventDefault();
        let data = {
            user_id: userId, 
            email: email, 
        }
        axios.post(apiLink + '/linkAccounts', data)
            .then((apiRes) => { 
                const accountLink = apiRes.status; 
                if (accountLink === 201) {
                    alert("Account linked successfully!");
                } 
                else if(accountLink === 409){
                    alert("Account already linked");
                    window.alert("Account already linked");
                }
                else {
                    alert("Account link failed- invalid input");
                    window.alert("Account link failed- invalid input");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <div className="settings-field">
                <h1>Settings</h1>
                    <div className="settings-field-buttons">
                        <button onClick={handleGeneralClick}>General</button>
                        <button onClick={handleAccountSettingsClick}>Account Settings</button>
                        <button onClick={handleAccessibilityClick}>Accessibility</button>
                        <button onClick={handleLanguageClick}>Language</button>
                    </div>
            </div>
            <form className="account-link-form" onSubmit={handleAccountPairClick}>
                <h2>Account Link</h2>
                <p>Link accounts</p>
                <input type="text" placeholder="Email to connect to" id="email-input" name="email" value={email} onChange={(e) => setLinkEmail(e.target.value)} />
                <button className="button" type="submit" id="accountLinkSubmit">submit</button>
            </form>
        </div>
    );
};

export default SettingsPage;
