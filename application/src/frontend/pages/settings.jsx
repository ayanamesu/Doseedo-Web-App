import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import UseSessionCheck from '../Components/UseSessionCheck';
import axios from 'axios';
import "../App.css";
import { useEffect } from 'react';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [isSessionActive] = UseSessionCheck();
    const [linkEmail, setLinkEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [accountType, setAccountType] = useState("");
    const [isAccountLinked, setAccountLink] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/isAccountLinked',{ params: { userId} })
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

    const handleAccountPairClick = () => {
    
        axios.get('http://localhost:8000/api/account_link', { params: { linkEmail, userId, accountType } })
            .then((apiRes) => {
                const accountLink = apiRes.data;
                setUserName=apiRes.data.userName;
                if (accountLink) {
                    setAccountLink(true);
                    alert("Account linked successfully!");
                } else {
                    alert("Invalid input");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const renderAccountLink = () => {
        if (isAccountLinked) {
            return (
                <div className="account-linked">
                    
                <p>Linked Account Infomation</p><br></br>
                <p>User ID: {userId}</p>
                <p>User Name: {userName}</p>
                <p>Email: {linkEmail}</p>
                <p>Account Type: {accountType}</p>
                
            </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <label>Email:</label>
                        <input type="text" value={linkEmail} onChange={(e) => setLinkEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>User ID:</label>
                        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
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
        <>
            <div className="div">
                <div className="div-9">
                    <div className="div-10">
                        <div className="column">
                            <div className="div-11">
                                <button className="div-12" onClick={handleGeneralClick}>
                                    General
                                </button>
                                <button className="div-13" onClick={handleAccountSettingsClick}>
                                    Account Settings
                                </button>
                                <button className="div-14" onClick={handleAccessibilityClick}>
                                    Accessibility
                                </button>
                                <button className="div-15" onClick={handleLanguageClick}>
                                    Language
                                </button>
                            </div>
                        </div>
                        <div className="column-2">
                            <div className="div-16">
                                <div className="div-17">
                                    <div className="div-18">Settings</div>
                                    <div className="div-19">
                             

                                        {renderAccountLink()}
                                    </div>
                                </div>
                                <div className="div-20">
                                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e31d2be7c77610d6400102080925ce4e35aacd83d0fdd1f225d703c78a19475?apiKey=fed26b027e8440e388870d08a2f64afd&" className="img" />
                                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/018433aa7d732e186206fdb2a934e2148ae8bd84632a8e23ec9029e84b1a76d0?apiKey=fed26b027e8440e388870d08a2f64afd&" className="img-2" />
                                    <button className="div-21" onClick={handleBackClick}>
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsPage;
