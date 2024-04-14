import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useSessionCheck from '../Components/UseSessionCheck';
import axios from 'axios';
import "../App.css";
import { useEffect } from 'react';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [email, setLinkEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [accountType, setAccountType] = useState("");
    const [isAccountLinked, setAccountLink] = useState(false);
    const [AccountList, setAccountList] = useState([]);

    const sessionUserId = useSessionCheck();

    // from yakbranch
    useEffect(() => {
        if (sessionUserId === "") {
            alert("No session found! Please relog in")
            navigate('/');
        } else {
            setUserId(sessionUserId[0]);
        }

        axios.post('http://localhost:8000/api/accountLink',{ user_id: userId })
            .then((apiRes) => {
                const accountLinked = apiRes.data;
                if (accountLinked) {
                    setAccountLink(true);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    });

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

    // from yakbranch
    function handleAccountPairClick(event) {
        event.preventDefault();
        let data = {
            user_id: userId, 
            email: email, 
            account_type: accountType
        }
        axios.post('http://localhost:8000/api/linkAccounts', data)
            .then((apiRes) => { //apiRes.status = 201 if the link is successful || 500 if somethingn went wrong
                const accountLink = apiRes.status; 
                if (accountLink === 201) {
                    setAccountLink(true);
                    alert("Account linked successfully!");
                    navigate('/');
                } else {
                    alert("Invalid input");
                }
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    };

    const renderAccountLink = () => {
        if (isAccountLinked) {
            return (
                <div className="account-linked">
                    
                <p>Linked Account Infomation</p><br></br>
                <p>Email: {email}</p>
                <p>Account Type: {accountType}</p>
                
            </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <label>Email:</label>
                        <input type="text" value={email} onChange={(e) => setLinkEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Account Type:</label>
                        <input type="text" value={accountType} onChange={(e) => setAccountType(e.target.value)} />
                    </div>
                    <button onClick={handleAccountPairClick}>
                        Pair Account
                    </button>
                
                </div>
            );
        }
    };

    const handleBackClick = () => {
        window.history.go(-1);
    };

    // This is now returning the correct data from the backend api
    // TODO: FRONTEND DESIGN - Displaying some stuff~
    const displayAccountLinkData = () => {
        //axios post needs to be updated instead of dummy data
        let data = {
            user_id: userId
        }
        axios.post('http://localhost:8000/api/accountLink', data)
        .then((apiRes) => { 
            console.log(apiRes.data);
            // You can do apiRes.data.<almost any column from the user table>
            if (apiRes.status === 200) {
                console.log("Showing the patients here")
                setAccountList(apiRes.data);
            } else if (apiRes.status === 204) {
                console.log("There are no paients for this user")
            } else {
                console.log("Something went wrong with the backend...")
            }

        })
        .catch((error) => {
            console.error(error);
            alert(error);
        });

        return AccountList.map((accountLink, index) => (
            <div key={index} className="account">
                {/* <h3>{accountLink.name}</h3> */}
                {/* <p>{accountLink.account_type}</p> */}
                <p>{accountLink.email}</p>
                <button>Unlink</button>
            </div>
        ));
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
                <input type="text" placeholder="Email" id="email-input" name="email" value={email} onChange={(e) => setLinkEmail(e.target.value)} />
                <div id="account-type-input">
                    <label>
                        <input type="radio" name="accountType" value="Caregiver" checked={accountType === 'Caregiver'} onChange={(e) => setAccountType(e.target.value)} required />
                        Caregiver
                    </label>
                    <label>
                        <input type="radio" name="accountType" value="Patient" checked={accountType === 'Patient'} onChange={(e) => setAccountType(e.target.value)} required />
                        Patient
                    </label>
                </div>
                <button className="button" type="submit" id="accountLinkSubmit">submit</button>
            </form>
            <h2>Linked Accounts:</h2>
            <div className="linkedAccountsContainer">
                {displayAccountLinkData() }
            </div>
            <button className="backButton" onClick={handleBackClick}>Back</button>
        </div>
    );
};

export default SettingsPage;
