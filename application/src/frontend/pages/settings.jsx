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
    const [isAccountLinked, setAccountLink] = useState(false);
    const [AccountList, setAccountList] = useState([]);

    useEffect(() => {
        if (Cookies.get('user_id') && Cookies.get('session_id')) {
            setUserId(Cookies.get('user_id'));
            console.log("User id has been set!" + userId);
        } else {
            alert("You need to relog in!")
            navigate('/');
        }

        const fetchAccountList = async () => {
            try {
                const data = {
                    user_id: userId
                };
                const apiRes = await axios.post(apiLink + '/accountLink', data);
                if (apiRes.status === 200) {
                    setAccountList(apiRes.data);
                } else if (apiRes.status === 204) {
                    console.log("There are no patients for this user");
                } else {
                    console.log("Something went wrong with the backend...");
                }
            } catch (error) {
                console.error(error);
            }
        };
            fetchAccountList();
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

        if (!userId || !email ) {
            // Display an error message or perform any necessary actions
            alert('Please fill out all required fields.');
            return; // Prevent the form from being submitted
        }

        event.preventDefault();
        let data = {
            user_id: userId, 
            email: email, 
        }
        axios.post(apiLink + '/linkAccounts', data)
            .then((apiRes) => { //apiRes.status = 201 if the link is successful || 500 if somethingn went wrong
                const accountLink = apiRes.status; 
                if (accountLink === 201) {
                    setAccountLink(true);
                    alert("Account linked successfully!");
                    // navigate('/');
                } 
                else if(accountLink === 409){
                    setAccountLink(true);
                    alert("Account already linked");
                }
                else {
                    alert("Invalid input");
                }
            })
            .catch((error) => {

                console.error(error);
                // alert(error);
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
