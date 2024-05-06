import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import Cookies from 'js-cookie';

const CareGiverRxListPage= () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [viewClicked, setViewClicked] = useState(false);
    const [patientList, setPatientList] = useState([]);
    const [userId, setUserId] = useState("");
    const [MedList, setMedList] = useState([]);
    const navigate = useNavigate();

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
                const apiRes = await axios.post('http://localhost:8000/showpatients', data);
                if (apiRes.status === 200) {
                        setPatientList(apiRes.data);
                } else if (apiRes.status === 204) {
                    console.log("There are no patients for this user");
                } else {
                    console.log("Something went wrong with the backend...");
                }
                }
            }
        catch (error) {
            console.error(error);
        }
    
    };
        fetchAccountList();
        

}, [userId, selectedUserId, viewClicked]);


const renderMedicationList = (selectedUserId) => {
    try{

        if(selectedUserId && viewClicked){
            const data = {
                user_id: selectedUserId
            };
            const apiRes =  axios.post('http://localhost:8000/viewmedicine', data )
        // axios.post('http://ec2-3-144-15-61.us-east-2.compute.amazonaws.com/api/viewmedicine', data )
            .then((apiRes) => {
            console.log("apiRes.data ");
            console.log( apiRes.data);
            setMedList(apiRes.data);
            console.log(" med list: " + MedList);
            })
            .catch((error) => {
                console.error('Error fetching medications:', error);
            });

            if (MedList.length > 0 ){
                return(
                ( // Check if MedList has data
                MedList.filter(medication => medication.userId === selectedUserId)
                .map((medication, index) => (
                    <div key={index} className="medication-list-container">
                        <p>{medication.name}</p>
                        <p>{medication.dosage}</p>
                        <p>{medication.frequency}</p>
                        <p>{medication.time}</p>
                    </div>
                ))
                )
            )
        }
        setViewClicked(false);
        }
    }  catch (error) {
        console.error(error);
    }

};

//const renderMedList =() => {
    return (
        <div className="caregiver-rxlist">
            <div className="patient-list-container">
                <h1>List of patients:</h1>
                <div className="rxlist-account">
                    {patientList.map((patient, index) => (
                        <div key={index} className="patient">
                            <p>{patient.name}</p>
                            <p>{patient.email}</p>
                            <button onClick={() => {
                                setSelectedUserId(patient.id);
                                setViewClicked(true);
                            }}>
                                View Medication List
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="caregiver-medicationlist">
                <h1>Medication List</h1>
                {viewClicked ? (
                    <div>
                        {renderMedicationList(selectedUserId)}
                    </div>
                ) : <p>Click on a patient to view their medication list</p>}
            </div>
        </div>
    );

};
export default CareGiverRxListPage;
