import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import Cookies from 'js-cookie';

function CareGiverRxListPage() {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [viewClicked, setViewClicked] = useState(false);

    const paitentList = [
        {
            name: "wing lee",
            email: "amongus@gmail.com",
            id: 1,
        },
        {
            name: "yak attack",
            email: "sussy@gmail.com",
            id: 2,
        }
    ];
    const medicationList = [
        {
            userId: 1,
            name: "Tylenol",
            dosage: "500mg",
            frequency: "once a day",
            time: "8:00am"
        },
        {
            userId: 2,
            name: "Advil",
            dosage: "200mg",
            frequency: "twice a day",
            time: "8:00am, 8:00pm"
        },
        {
            userId: 1,
            name: "crack cocaine",
            dosage: "200mg",
            frequency: "twice a day",
            time: "8:00am, 8:00pm"
        },
        {
            userId: 1,
            name: "crack cocaine",
            dosage: "200mg",
            frequency: "twice a day",
            time: "8:00am, 8:00pm"
        },
        {
            userId: 1,
            name: "crack cocaine",
            dosage: "200mg",
            frequency: "twice a day",
            time: "8:00am, 8:00pm"
        },
        {
            userId: 1,
            name: "crack cocaine",
            dosage: "200mg",
            frequency: "twice a day",
            time: "8:00am, 8:00pm"
        }
    ];

const renderMedicationList = () => {
    return medicationList
        .filter(medication => medication.userId === selectedUserId)
        .map((medication, index) => (
            <div key={index} className="medication-list-container">
                <p>{medication.name}</p>
                <p>{medication.dosage}</p>
                <p>{medication.frequency}</p>
                <p>{medication.time}</p>
            </div>
        ));
};

    return (
        <div className="caregiver-rxlist">
            <div className="paitent-list-container">
                <h1>List of patients</h1>
                <div className="rxlist-account">
                    {paitentList.map((paitent, index) => (
                        <div key={index} className="paitent">
                            <p>{paitent.name}</p>
                            <p>{paitent.email}</p>
                            <button onClick={() => {
                                setSelectedUserId(paitent.id);
                                setViewClicked(true);
                            }}>View</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="medication-list-container">
            <h1>Medication List</h1>
                {viewClicked ? (
                    <div>
                        {renderMedicationList()}
                    </div>
                ) : <p>Click on a patient to view their medication list</p>} 
            </div>
        </div>
    );
}

export default CareGiverRxListPage;