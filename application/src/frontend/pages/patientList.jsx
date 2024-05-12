import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../App.css";
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const PatientList = ({ apiLink }) => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
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
                
                if (data.user_id){
                const apiRes = await axios.post(apiLink + '/showpatients', data);
                if (apiRes.status === 200) {
                    setAccountList(apiRes.data);
                } else if (apiRes.status === 204) {
                    console.log("There are no patients for this user");
                } else {
                    console.log("Something went wrong with the backend...");
                }
            }
            } catch (error) {
                console.error(error);
            }
        
        };
            fetchAccountList();
    }, [userId]);

    return (
        <div>
            <h2>Patient List:</h2>
             <div className="linkedAccountsContainer">
                {AccountList.map((accountLink, index) => (
                    <div key={index} className="account">
                        <div className="account-data">
                        <strong>Name: </strong> <span>{accountLink.first_name} {accountLink.last_name}</span>
                        </div>
                        <div className="account-data">
                            <strong>Email: </strong> <span>{accountLink.email}</span>
                        </div>
                        <div className="account-data">
                            <strong>Address: </strong> <span>{accountLink.address_1}</span>
                        </div>
                        <div className="account-data">
                            <strong>City: </strong> <span>{accountLink.city}</span>
                        </div>
                        <div className="account-data">
                            <strong>Phone: </strong> <span>{accountLink.phone}</span>
                        </div>
                        <button>Unlink</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default PatientList;
