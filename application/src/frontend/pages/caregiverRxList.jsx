import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import Cookies from 'js-cookie';

const CareGiverRxListPage = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [viewClicked, setViewClicked] = useState(false);
    const [patientList, setPatientList] = useState([]);
    const [userId, setUserId] = useState("");
   
    const [selectedMedicationId, setSelectedMedicationId] = useState(0);
    const [medications, setMedications] = useState([]);
    const navigate = useNavigate();
    const MedicationItem = ({ med_name, dosage, description, start_date, end_date, doctor_first_name, doctor_last_name }) => (
        <div className="medication-item">
            <div className="medication-name">Medication Name: {med_name}</div>
            <div className="medication-dosage">Dosage: {dosage}</div>
            <div className="medication-description">Description: {description}</div>
            <div className="medication-start-date">Start Date: {start_date}</div>
            <div className="medication-end-date">End Date: {end_date}</div>
            <div className="medication-doctor-first-name">Doctor First Name: {doctor_first_name}</div>
            <div className="medication-doctor-last-name">Doctor Last Name: {doctor_last_name}</div>
            <div className="medication-quantity-info">quantity: 30 </div>
        </div>
        //quantity
        //med for the day
    );
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
                if (data.user_id) {
                    const apiRes = await axios.post('http://localhost:8000/showpatients', data);
                    if (apiRes.status === 200) {
                        setPatientList(apiRes.data);
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
    }, [userId, navigate]);
    const handleNextClick = () => {
        console.log(selectedMedicationId);
        if (medications.length > selectedMedicationId + 1) {//index0=1,1=2
            setSelectedMedicationId(prevCount => prevCount + 1);
        }
    };
    
    const handleBackClick = () => {//for now it is "back"
        console.log(selectedMedicationId);
        if (-1 < selectedMedicationId - 1) {//index0=1,1=2
            setSelectedMedicationId(prevCount => prevCount- 1);
        }
    };

    useEffect(() => {
        const fetchMedicationList = async () => {
            try {
                if (selectedUserId && viewClicked) {
                    const data = {
                        user_id: selectedUserId
                    };
                    const apiRes = await axios.post('http://localhost:8000/viewmedicine', data);
                    console.log("apiRes.data ");
                    console.log(apiRes.data);
                    setMedications(apiRes.data);//list
                   
                }
            } catch (error) {
                console.error('Error fetching medications:', error);
            }
        };

        fetchMedicationList();
    }, [selectedUserId, viewClicked]);

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
                        {medications.length > 0? (  <MedicationItem
                    key={medications[selectedMedicationId].id}
                    med_name={medications[selectedMedicationId].med_name}
                    dosage={medications[selectedMedicationId].dose_amt}
                    description={medications[selectedMedicationId].description}
                    start_date={medications[selectedMedicationId].start_date}
                    end_date={medications[selectedMedicationId].end_date}
                    doctor_first_name={medications[selectedMedicationId].doctor_first_name}
                    doctor_last_name={medications[selectedMedicationId].doctor_last_name}
                    
                />
                
) : (
    <p>No medication list available</p>
)}
  <div className="medication-actions">
                                <button className="navButtons" onClick={handleBackClick}>back</button>
                                <button className="navButtons" onClick={handleNextClick}>Next</button>
                            </div>
                    </div>
                ) : <p>Click on a patient to view their medication list</p>}
            </div>
            
        </div>
    );
};

export default CareGiverRxListPage;
