// still debugging skeleton code
import React from "react";
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "../App.css";

function PatientProfilePage() {
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
                <div className="div-2">
                    <div className="div-3">Doseedo</div>
                    <div className="div-4">
                        <button className="div-5">Contacts</button>
                        <button className="div-6">Notifications</button>
                        <button className="div-7">About Us</button>
                        <button className="div-8">Sign Out</button>
                    </div>
                </div>
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
                                                <button className="div-20">First Name</button>
                                                <button className="div-21">Last Name</button>
                                            </div>
                                            <div className="div-22"/>
                                        </div>
                                    </div>
                                    <div className="column-4">
                                        <div className="div-23">
                                            <div className="div-24">
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d63a287b7c394963961210f49cf139ba60d1a70cb28ccc97209569b57650c86d?apiKey=fed26b027e8440e388870d08a2f64afd&"
                                                    className="img"
                                                    alt="Profile Icon"
                                                />
                                                Profile Icon
                                                <br/>
                                                Picture
                                            </div>
                                            <button className="div-26" onClick={handleBack}>
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e31d2be7c77610d6400102080925ce4e35aacd83d0fdd1f225d703c78a19475?apiKey=fed26b027e8440e388870d08a2f64afd&"
                                                    className="img"
                                                    alt="Background"
                                                />
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/018433aa7d732e186206fdb2a934e2148ae8bd84632a8e23ec9029e84b1a76d0?apiKey=fed26b027e8440e388870d08a2f64afd&"
                                                    className="img-2"
                                                    alt="Arrow"
                                                />
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