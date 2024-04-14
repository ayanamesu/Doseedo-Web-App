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

    // Previously had via github commit e462e7b (the pervious change to this)
    // const [isSessionActive] = UseSessionCheck();

    // const sessionUserId = useSessionCheck();
    
    // from yakbranch
    useEffect(() => {
        
        // Previously had via github commit e462e7b (the pervious change to this)
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
        if (Cookies.get('user_id') && Cookies.get('session_id')) {
            setUserId(Cookies.get('user_id'));
            console.log("User id has been set!")
        } else {
            alert("You need to relog in!")
            navigate('/');
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

    // const dummyAccountLinkData = [
    //     {
    //         user_id: 1,
    //         email: 'YakAttack@gmail.com',
    //         name: 'Yak Attack',
    //         account_type: 'patient'
    //     },
    //     {
    //         user_id: 2,
    //         email: 'Aleia420@gmail.com',
    //         name: 'Viper Main',
    //         account_type: 'patient'
    //     },
    //     {
    //         user_id: 3,
    //         email: 'Ayana@gmail.com',
    //         name: 'Wing Lee',
    //         account_type: 'patient'
    //     },
    //     {
    //         user_id: 4,
    //         email: 'OnikaBurgers@gmail.com',
    //         name: 'Carlos Minaj',
    //         account_type: 'patient'
    //     },
    //     {
    //         user_id: 5,
    //         email: 'YutoTypeBeat@gmail.com',
    //         name: 'Yuto nator',
    //         account_type: 'patient'
    //     },
    //     {
    //         user_id: 6,
    //         email: 'Paige@gmail.com',
    //         name: 'Paige turn',
    //         account_type: 'patient'
    //     }
    // ];

    // This is now returning the correct data from the backend api
    // TODO: FRONTEND DESIGN - Displaying some stuff~
    const displayAccountLinkData = () => {
        //axios post needs to be updated instead of dummy data
        let data = {
            user_id: userId
        }
        axios.post('http://localhost:8000/api/accountLink', data)
        .then((apiRes) => { 
            console.log(apiRes.data) 
            // You can do apiRes.data.<almost any column from the user table>
            if (apiRes.status == 200) {
                console.log("Showing the patients here")
            } else if (apiRes.status == 204) {
                console.log("There are no linked accounts for this user")
            } else {
                console.log("Something went wrong with the backend...")
            }

        })
        .catch((error) => {
            console.error(error);
            alert(error);
        });

        // return dummyAccountLinkData.map((accountLink, index) => {
            return (
                // <div key={index} className="account">
                //     <h3>{accountLink.name}</h3>
                //     <p>{accountLink.account_type}</p>
                //     <p>{accountLink.email}</p>
                //     <button>Unlink</button>
                // </div>
                <div> peepee </div>
            );
        // });
    };
      
    return (
        // <>
        //     <div className="div">
        //         <div className="div-9">
        //             <div className="div-10">
        //                 <div className="column">
        //                     <div className="div-11">
        //                         <button className="div-12" onClick={handleGeneralClick}>
        //                             General
        //                         </button>
        //                         <button className="div-13" onClick={handleAccountSettingsClick}>
        //                             Account Settings
        //                         </button>
        //                         <button className="div-14" onClick={handleAccessibilityClick}>
        //                             Accessibility
        //                         </button>
        //                         <button className="div-15" onClick={handleLanguageClick}>
        //                             Language
        //                         </button>
        //                     </div>
        //                 </div>
        //                 <div className="column-2">
        //                     <div className="div-16">
        //                         <div className="div-17">
        //                             <div className="div-18">Settings</div>
        //                             <div className="div-19">
                             

        //                                 {renderAccountLink()}
        //                             </div>
        //                         </div>
        //                         <div className="div-20">
        //                             <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e31d2be7c77610d6400102080925ce4e35aacd83d0fdd1f225d703c78a19475?apiKey=fed26b027e8440e388870d08a2f64afd&" className="img" />
        //                             <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/018433aa7d732e186206fdb2a934e2148ae8bd84632a8e23ec9029e84b1a76d0?apiKey=fed26b027e8440e388870d08a2f64afd&" className="img-2" />
        //                             <button className="div-21" onClick={handleBackClick}>
        //                                 Back
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </>
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
                {displayAccountLinkData()}
            </div>
            <button className="backButton" onClick={handleBackClick}>Back</button>
        </div>
    );
};

export default SettingsPage;
