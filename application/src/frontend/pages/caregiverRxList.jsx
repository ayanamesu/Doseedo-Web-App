import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import Cookies from 'js-cookie';

function CareGiverRxListPage({ apiLink }) {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [viewClicked, setViewClicked] = useState(false);
    const [patientList, setPatientList] = useState([]);
    const [userId, setUserId] = useState("");
    const [showMedList, setShowMedList] = useState(true);
    const [selectedMedicationId, setSelectedMedicationId] = useState(0);
    const [medications, setMedications] = useState([]);
   
    const [medName, setMedName] = useState("");
    const [description, setDescription] = useState("");
    const [doseAmt, setDoseAmt] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [doctorFirstName, setDoctorFirstName] = useState("");
    const [doctorLastName, setDoctorLastName] = useState("");
    const [doctorPhone, setDoctorPhone] = useState("");
    const navigate = useNavigate();

    // useEffect for setting user id
    useEffect(() => {
        if (Cookies.get('user_id') && Cookies.get('session_id')) {
            setUserId(Cookies.get('user_id'));
            console.log("User id has been set!" + userId);
        } else {
            alert("You need to relog in!")
            navigate('/');
        }
    }, [userId, navigate]);

    // useEffect for fetching patient list
    useEffect(() => {
   
        fetchAccountList();
    }, [userId, navigate]);

    const fetchAccountList = async () => {
        try {
            const data = {
                user_id: userId
            };
            if (data.user_id) {
                const apiRes= await axios.post(apiLink + '/showpatients', data);
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
    const fetchMedicationList = async () => {
        try {
            if (selectedUserId && viewClicked) {
                const data = {
                    user_id: selectedUserId
                };
                const apiRes = await axios.post(apiLink + '/viewmedicine', data);
                setMedications(apiRes.data);
            }
        } catch (error) {
            console.error('Error fetching medications:', error);
        }
    };
    // Fetch medication list on user selection
    useEffect(() => {
        
        fetchMedicationList();
    }, [selectedUserId, viewClicked]);
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
    const handleDeleteClick = () => {
        console.log("med list length: " + medications.length);
        if (medications.length > 0){
        let toDelete = medications[selectedMedicationId].id;
        axios.post(apiLink + '/deletemedicine', { id: toDelete })
          .then(response => {
              setMedications(response.data);
              console.log("Medication deleted successfully:", response.data);
              window.alert("Medication deleted successfully");
              fetchMedicationList();
            })
          .catch(error => {
              console.error('Error deleting medication:', error);
          });
      }
    }

    const renderDeleteButton = () => {
        if (medications.length > 0) { 
            return (
                <div>
                    <button className="delete-medication-button" onClick={handleDeleteClick}>Delete medication</button>
                </div>
            );
        }
    };

    // Handle click for adding medication
    const handleAddClick = (event) => {
        event.preventDefault();
        if (!userId || !medName || !doseAmt || !startDate || !doctorFirstName || !doctorLastName || !doctorPhone) {
            alert("Please fill out userID, Medicine name, dose amount, start date, doctor name, and phone number.");
            return;
        }
        let userData = {
            user_id: selectedUserId,//selected patient id
            med_name: medName,
            description: description,
            dose_amt: doseAmt,
            start_date: startDate,
            end_date: endDate,
            doctor_first_name: doctorFirstName,
            doctor_last_name: doctorLastName,
            doctor_phone: doctorPhone
        };
        console.log(userData);
        axios.post(apiLink + '/addmedicine', userData)
            .then(response => {
                console.log(selectedUserId);
                console.log("Medication added successfully:", response.data);
                fetchMedicationList();
                window.alert("Medication added successfully");
                setShowMedList(true);

            })
            .catch(error => {
                console.error('Error adding medication:', error);
                alert("Error adding medication:");
            });
    };

    // JSX for medication item
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
    );

    // JSX for rendering medication list
    if (showMedList) {
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
                            {medications.length > 0 ? (
                                <MedicationItem
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
                                 {renderDeleteButton()}
                                <button className="navButtons" onClick={() => setShowMedList(false)}>Add Medicine</button>
                                <button className="navButtons" onClick={handleBackClick}>Back</button>
                                <button className="navButtons" onClick={handleNextClick}>Next</button>
                            </div>
                        </div>
                    ) : <p>Click on a patient to view their medication list</p>}
                </div>
            </div>
        );
    } else  {
        return (
            <div className="add-form">
            <h2>Add Medication</h2>
            <form className ="rx-list" onSubmit={handleAddClick}>
                    <input type="text" placeholder="Medicine Name" id="medName-input" name="medName" onChange={e => setMedName(e.target.value)}/>
                    <input type="text" placeholder="Description" id="description-input" name="description" onChange={e => setDescription(e.target.value)}/>
                    <input type="text" placeholder="Dose Amount" id="doseAmt-input" name="doseAmt" onChange={e => setDoseAmt(e.target.value)}/>
                    <input type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} placeholder="Start Date" id="startDate-input" name="startDate" onChange={e => setStartDate(e.target.value)}/>
                    <input type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} placeholder="End Date" id="endDate-input" name="endDate" onChange={e => setEndDate(e.target.value)}/>
                    <input type="text" placeholder="Doctor's First Name" id="doctorFirstName-input" name="doctorFirstName" onChange={e => setDoctorFirstName(e.target.value)}/>
                    <input type="text" placeholder="Doctor's Last Name" id="doctorLastName-input" name="doctorLastName" onChange={e => setDoctorLastName(e.target.value)}/>
                    <input type="text" placeholder="Doctor's Phone" id="doctorPhone-input" name="doctorPhone" onChange={e => setDoctorPhone(e.target.value)}/>
                    <button type="button" onClick={() => setShowMedList(true)}>Cancel</button>
                    <button type="submit">submit</button>
                
                </form>
        </div>
        );
    }
}

export default CareGiverRxListPage;
