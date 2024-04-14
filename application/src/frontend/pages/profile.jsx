// still debugging skeleton code
import React from "react";
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "../App.css";

function PatientProfilePage() {
    const [user, setUser] = useState([]);

      
    useEffect(() => {
        // Fetch user profile data
        const sessionId = localStorage.getItem('session_id');
        axios.get('http://localhost:8000/api/profile', { params: { sessionid: sessionId } })
            .then((apiRes) => {
                const profile = apiRes.data;
                setUser(profile);
            })
            .catch((error) => {
                console.error(error);
            });
            const dummyData = [
                {
                    id: 1,
                    userFName: "John",
                    userLName: "Doe",
                    email: "sfsu@gmail.com",
                    address1: "San Francisco State University Dr",
                    address2: "unit 100",
                    state: "CA",
                    city: "San Francisco",
                    zip_code: "94122",
                    phone: "6669998888"
                }
            ]
            setTimeout(() => {
                console.log(dummyData[0]);
                setUser(dummyData[0]);
            }, 1000); 
    }, []);
                 
       
    const UserInfo = ({ id, userFName, userLName, email, address1, address2, city, zip_code, phone }) => (
        <div className="medication-item">
               <div className="userName">
                {userFName} {userLName}
            </div>
            <div className="userId">userID: {id}</div>
            <div className="email">email: {email}</div>
            <div className="address1">address1: {address1}</div>
            <div className="address2">address2: {address2}</div>
            <div className="city">city: {city}</div>
            <div className="zip_code">zip_code: {zip_code}</div>
            <div className="phone">phone: {phone}</div>
        </div>
    );
    const handleEditProfile = () => {
        console.log("Edit Profile clicked");

    };

    const handleShareProfile = () => {
        console.log("Share Profile clicked");

    };

    const handleAddConnections = () => {
        console.log("Add Connections clicked");

    };

    const handleBack = () => {
        console.log("Back clicked");
    };

    return (
        <>
            <div className="div">
             
                <div className="div-9">
                    <div className="div-10">
                        <div className="column">
                            <div className="div-11">
                                <button className="div-12" onClick={handleEditProfile}>
                                    Edit Profile
                                </button>
                                <button className="div-13" onClick={handleShareProfile}>
                                    Share Profile
                                </button>
                                <button className="div-14" onClick={handleAddConnections}>
                                    Add Conections
                                </button>
                            </div>
                        </div>
                        <div className="column-2">
                            <div className="div-15">
                                <div className="div-16">
                                    <div className="column-3">
                                        <div className="div-17">
                                            <div className="div-18">Profile Page</div>
                                            <div className="div-19">
                                            {user && <UserInfo {...user} />}
                                            </div>
                                            <div className="div-22"/>
                                        </div>
                                    </div>
                                    <div className="column-4">
                                        <div className="div-23">
                                            <div className="div-24">
                                               
                                              
                                                Profile Icon
                                                <br/>
                                                Picture
                                            </div>
                                            <button className="div-26" onClick={handleBack}>
                                             
                                                <div className="div-27">Back</div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PatientProfilePage;