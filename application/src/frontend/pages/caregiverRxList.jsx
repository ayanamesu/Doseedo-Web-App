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
    const [showMedList, setShowMedList] = useState(true); // Define state variables
    const [showAddMed, setShowAddMed] = useState(false);
    const [showDeleteMed, setShowDeleteMed]= useState(false);
  
    const [id, setPrescriptionId]= useState("");
    const [medName, setMedName] = useState("");
    const [description, setDescription] = useState("");
    const [doseAmt, setDoseAmt] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [doctorFirstName, setDoctorFirstName] = useState("");
    const [doctorLastName, setDoctorLastName] = useState("");
    const [doctorPhone, setDoctorPhone] = useState("");

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

    const  handleMedListClick =()=>{
        setShowMedList(true);
        setShowAddMed(false);
    }

    const handleAddMedicationClick = () => {
        console.log("handleAddMed");
        setShowMedList(false);
        setShowAddMed(true);
    }

        const handleDeleteMedicationClick = () => {
          console.log("med list length: " + medications.length);
          if (medications.length != 0){
          let toDelete = medications[selectedMedicationId].id;
          axios.post('http://localhost:8000/deletemedicine', { id: toDelete })
            .then(response => {
                setMedications(response.data);
                console.log("Medication deleted successfully:", response.data);
                navigate('/rxlist');
                setShowDeleteMed(false);
            })
            .catch(error => {
                console.error('Error deleting medication:', error);
            });
   
        }
        };

    const renderMedList = () => {
        if (showMedList) {
            // return <button className="section-title" onClick={handleMedsForTheDayClick}>Meds for <br /> the day</button>;
        }
         if (showAddMed) {
            return (
                <div> 
                    <button className="section-title" onClick={handleMedListClick}>Medication list</button>
                </div>
            );
        }
    };

    const renderAddDeleteButton = () => {
        if (!showDeleteMed && (medications.length > 0) ) { 
            return (
                <>
                    <button className="delete-medication-button" onClick={handleDeleteMedicationClick}>Delete medication</button>
                    <button className="add-medication-button" onClick={handleAddMedicationClick}>Add medication</button>
 
                </>
            );
        }
        else if (!showAddMed) {
            return (
                <>
                    <button className="add-medication-button" onClick={handleAddMedicationClick}>Add medication</button>
                </>
            );

        }
        return null; // If showAddMed is true, return null (no buttons rendered)
    };

    
    const switchPage = (showMedList, medications) => {
        if (showMedList) {
            return (
                <div>
                <h2 className="section-title">Medication List</h2>
                
                <div className="medication-list-header" />
                <div className="medication-list-item" />
                <div className="medication-details">
                    <div className="medication-info-container">
                        <div className="medication-info-columns">
                            <div className="column prescription-info">
                                <div className="prescription-label">
                                    <h3 className="prescription-text">RX</h3>
                                    <div className="prescription-underline" />
                                </div>
                            </div>
                            <div className="column medication-name-info">
                                <div className="medication-name-container">
                                    <h3 className="medication-name-text">DOSEEDO <br />& CO.</h3>
                                    <div className="medication-name-underline" />
                                </div>
                            </div>
                           
    
                            {medications.length > 0 && (
        <MedicationItem
            key={medications[selectedMedicationId].id}
            med_name={medications[selectedMedicationId].med_name}
            dosage={medications[selectedMedicationId].dosage}
            descrpiton={medications[selectedMedicationId].descrpiton}
            start_date={medications[selectedMedicationId].start_date}
            end_date={medications[selectedMedicationId].end_date}
            doctor_first_name={medications[selectedMedicationId].doctor_first_name}
            doctor_last_name={medications[selectedMedicationId].doctor_last_name}
        />
    )}
    
                        </div>
                 
                    </div>
                    <div className="medication-actions">
                                <button className="back-button" onClick={handleBackClick}>back</button>
                                <button className="next-button" onClick={handleNextClick}>Next</button>
                            </div>
                    <div className="medication-notes" />
                </div>
            </div>
            );
        } else if (showAddMed) {
            
            return (
                <div>
                    <h2>Add Medication</h2>
                    <form className ="rx-list" onSubmit={handleAddMedicationClick}>
                            <input type="text" placeholder="Medicine Name" id="medName-input" name="medName" onChange={e => setMedName(e.target.value)}/>
                            <input type="text" placeholder="Description" id="description-input" name="description" onChange={e => setDescription(e.target.value)}/>
                            
                            <input type="text" placeholder="Dose Amount" id="doseAmt-input" name="doseAmt" onChange={e => setDoseAmt(e.target.value)}/>
                            
                            <input type="date" placeholder="Start Date" id="startDate-input" name="startDate" onChange={e => setStartDate(e.target.value)}/>
                            <input type="date" placeholder="End Date" id="endDate-input" name="endDate" onChange={e => setEndDate(e.target.value)}/>
                            <input type="text" placeholder="Doctor's First Name" id="doctorFirstName-input" name="doctorFirstName" onChange={e => setDoctorFirstName(e.target.value)}/>
                            <input type="text" placeholder="Doctor's Last Name" id="doctorLastName-input" name="doctorLastName" onChange={e => setDoctorLastName(e.target.value)}/>
                            <input type="text" placeholder="Doctor's Phone" id="doctorPhone-input" name="doctorPhone" onChange={e => setDoctorPhone(e.target.value)}/>
                            <button type="button" onClick={() => handleMedListClick()}>Back</button>
                            <button type="submit" id="submit">submit</button>
                        
                        </form>
                </div>
            );
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
             <div className="meds-for-the-day">
             {renderMedList()}
             {renderAddDeleteButton()}
             {switchPage(showMedList, medications)}
         </div>
) : (
    <p>No medication list available</p>
)}
  <div className="medication-actions">
                                <button className="navButtons" onClick={handleBackClick}>back</button>
                                <button className="navButtons" onClick={handleNextClick}>Next</button>
                            </div>
                    </div>
                 <p>Click on a patient to view their medication list</p>
            </div>
            
    );
};

export default CareGiverRxListPage;
