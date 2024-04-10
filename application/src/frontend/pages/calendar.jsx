// still debugging skeleton code

import React from "react";
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "../App.css";

function Header() {
    const handleSignOut = () => {
        // Sign out logic here
        console.log("Sign out clicked");
    };

    return (
        <header className="header">
            <button className="logo">Doseedo</button>
            <nav className="navigation">
                <button className="nav-item">Contacts</button>
                <button className="nav-item">Notifications</button>
                <div className="nav-group">
                    <button className="nav-item">About Us</button>
                    <button className="sign-out-button" onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
            </nav>
        </header>
    );
}

function CurrentDay() {
    return (
        <div className="current-day">
            <button className="current-day-text">Current Day</button>
        </div>
    );
}

function Calendar() {
    const handleBack = () => {
        // Back navigation logic here
        console.log("Back clicked");
    };

    return (
        <div className="calendar">
            <h2 className="calendar-title">Calendar</h2>
            <button className="calendar-placeholder">
                Still thinking how to fill this box in with our calendar style{" "}
            </button>
            <div className="calendar-navigation">
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e31d2be7c77610d6400102080925ce4e35aacd83d0fdd1f225d703c78a19475?apiKey=fed26b027e8440e388870d08a2f64afd&" alt="" className="calendar-background" />
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/018433aa7d732e186206fdb2a934e2148ae8bd84632a8e23ec9029e84b1a76d0?apiKey=fed26b027e8440e388870d08a2f64afd&" alt="" className="calendar-arrow" />
                <button className="calendar-back-text" onClick={handleBack}>
                    Back
                </button>
            </div></div>
    );
}

function CalendarPage() {
    return (
        <>
            <div className="container">
                <Header />
                <main className="main-content">
                    <CurrentDay />
                    <Calendar />
                </main>
            </div>
        </>
    );
}

export default CalendarPage;