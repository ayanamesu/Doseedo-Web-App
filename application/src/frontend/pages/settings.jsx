import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import useSessionCheck from '../Components/UseSessionCheck';
import axios from 'axios';
import "../App.css";
import { useEffect } from 'react';
import Cookies from 'js-cookie';

// Previously had via github commit e462e7b (the pervious change to this)
// import UseSessionCheck from '../Components/UseSessionCheck';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [email, setLinkEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [accountType, setAccountType] = useState("");
    const [isAccountLinked, setAccountLink] = useState(false);
    const [AccountList, setAccountList] = useState([]);

    // const sessionUserId = useSessionCheck();
    // Previously had via github commit e462e7b (the pervious change to this) all in 
        // axios.get('http://localhost:8000/api/isAccountLinked',{ params: { userId} })
        //     .then((apiRes) => {
        //         const accountLinked = apiRes.data;
        //         if (accountLinked) {
        //             setAccountLink(true);
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });


        // if (sessionUserId === "") {
        //     alert("No session found! Please relog in")
        //     navigate('/');
        // } else {
        //     setUserId(sessionUserId[0]);
        // }
    // from yakbranch
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
                const apiRes = await axios.post('http://localhost:8000/api/accountLink', data);
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

    // from yakbranch
    function handleAccountPairClick(event) {

        // Previously had via github commit e462e7b (the pervious change to this)
        // axios.get('http://localhost:8000/api/account_link', { params: { linkEmail, userId, accountType } })
        //     .then((apiRes) => {
        //         const accountLink = apiRes.data;
        //         setUserName=apiRes.data.userName;
        //         if (accountLink) {
        //             setAccountLink(true);
        //             alert("Account linked successfully!");
        //         } else {
        //             alert("Invalid input");
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

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
                    // navigate('/');
                } else {
                    alert("Invalid input");
                }
            })
            .catch((error) => {
                console.error(error);
                // alert(error);
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
                {AccountList.map((accountLink, index) => (
                    <div key={index} className="account">
                        <p>{accountLink.email}</p>
                        <button>Unlink</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SettingsPage;
