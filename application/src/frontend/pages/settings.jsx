import React from "react";
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "../App.css";
import Sidebar from "../Components/Sidebar";

const settingsPage = () => {
    const handleBackClick = () => {
        window.history.go(-1);
    };
      
    return (
        <div className="main-content">
            {/*main setting page content */}
            <div className="div-16">
                <div className="div-17">
                    <div className="div-18">Settings</div>
                    <div className="div-19" />
                </div>
                <div className="div-20">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e31d2be7c77610d6400102080925ce4e35aacd83d0fdd1f225d703c78a19475?apiKey=fed26b027e8440e388870d08a2f64afd&" className="img" />
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/018433aa7d732e186206fdb2a934e2148ae8bd84632a8e23ec9029e84b1a76d0?apiKey=fed26b027e8440e388870d08a2f64afd&" className="img-2" />
                    <button className="div-21" onClick={handleBackClick}>
                        Back{" "}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default settingsPage;