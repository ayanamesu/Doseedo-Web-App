import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import Cookies from 'js-cookie';
import BackButton from "../Components/BackButton";

function RxListPage() {

    const [medications, setMedications] = useState([]);
    const [selectedMedicationId, setSelectedMedicationId] = useState(0);
    const [showMedList, setShowMedList] = useState(true); // Define state variables
    const [showMedsforTheDay, setShowMedsforTheDay] = useState(false);
    const [showAddMed, setShowAddMed] = useState(false);

    const [user_id, setUserId] = useState("");
    const [medName, setMedName] = useState("");
    const [description, setDescription] = useState("");
    const [doseAmt, setDoseAmt] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [doctorFirstName, setDoctorFirstName] = useState("");
    const [doctorLastName, setDoctorLastName] = useState("");
    const [doctorPhone, setDoctorPhone] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('user_id') && Cookies.get('session_id')) {
            setUserId(Cookies.get('user_id'));
            console.log("User id has been set!" + user_id)
        } else {
            alert("You need to relog in!")
            navigate('/');
        }
        //What is this api is it to view medicine?
        axios.post('http://localhost:8000/api/viewmedicine')
            .then(response => {
                setMedications(response.data);//list
            })
            .catch(error => {
                console.error('Error fetching medications:', error);
            });

        const dummyData = [
            {
                id: 1,
                med_name: "Medication 1",
                dosage: "10mg",
                description: "Description 1",
                start_date: "2022-01-01",
                end_date: "2022-01-30",
                doctor_first_name: "John",
                doctor_last_name: "Doe"
            },
            {
                id: 2,
                med_name: "Medication 2",
                dosage: "20mg",
                description: "Description 2",
                start_date: "2022-02-01",
                end_date: "2022-02-28",
                doctor_first_name: "Jane",
                doctor_last_name: "Smith"
            },
            {
                id: 3,
                med_name: "Medication 3",
                dosage: "30mg",
                description: "Description 3",
                start_date: "2022-03-01",
                end_date: "2022-03-31",
                doctor_first_name: "Michael",
                doctor_last_name: "Johnson"
            }
        ];

        // Simulate loading delay
        setTimeout(() => {
            setMedications(dummyData);
        }, 1000); // Delay for 1 second
    }, []);

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

    function handleAddMedication(event) {
        event.preventDefault();
        setShowMedList(false);
        setShowAddMed(true);
        setShowMedsforTheDay(false);
        let userData = {
            user_id: user_id,
            med_name: medName,
            description: description,
            dose_amt: doseAmt,
            start_date: startDate,
            end_date: endDate,
            doctor_first_name: doctorFirstName,
            doctor_last_name: doctorLastName,
            doctor_phone: doctorPhone
        }

        axios.post('http://localhost:8000/api/addmedicine', userData)
            .then(response => {
                console.log("Medication added successfully:", response.data);
                setShowAddMed(false);
                setShowMedList(true); // Switch back to the medication list page
            })
            .catch(error => {
                console.error('Error adding medication:', error);
                alert("Error adding medication:");
                setShowAddMed(false);
                setShowMedList(true);
            });
    }

    const handleAddMedicationClick = () => {

        console.log("handleAddMed");
        setShowMedList(false);
        setShowAddMed(true);
        setShowMedsforTheDay(false);
    }

    const handleDeleteMedicationClick = (medicationId) => {
        axios.post('http://localhost:8000/api/deletemedicine', { id: medicationId })
            .then(response => {
                setMedications(response.data);
            })
            .catch(error => {
                console.error('Error deleting medication:', error);
            });
    };
    const handleMedsForTheDayClick =()=>{
        setShowMedList(false);
        setShowAddMed(false);
        setShowMedsforTheDay(true);
    }
    const  handleMedListClick =()=>{
        setShowMedList(true);
        setShowAddMed(false);
        setShowMedsforTheDay(false);
    }
    const handleNextClick = () => {
        console.log(selectedMedicationId);
        if (medications.length > selectedMedicationId + 1) {//index0=1,1=2
            setSelectedMedicationId(prevCount => prevCount + 1);
        }
    };

    const handleCancelClick = () => {//for now it is "back"
        console.log(selectedMedicationId);
        if (-1 < selectedMedicationId - 1) {//index0=1,1=2
            setSelectedMedicationId(prevCount => prevCount- 1);
        }
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
                                        <div className="prescription-underline" />
                                    </div>
                                </div>
                                <div className="column medication-name-info">
                                    <div className="medication-name-container">
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
                            <button className="med-for-day-button" onClick={handleCancelClick}>back</button>
                            <button className="med-for-day-button" onClick={handleNextClick}>Next</button>
                        </div>
                        <div className="medication-notes" />
                    </div>
                </div>
            );
        } else if (showMedsforTheDay) {
            return (
                <div>
                    <h2 className="section-title">Meds <br></br>for<br></br>The Day</h2>

                    <div className="medication-list-header" />
                    <div className="medication-list-item" />
                    <div className="medication-details">
                        <div className="medication-info-container">
                            <div className="medication-info-columns">
                                <div className="column prescription-info">
                                    <div className="prescription-label">
                                        <div className="prescription-underline" />
                                    </div>
                                </div>
                                <div className="column medication-name-info">
                                    <div className="medication-name-container">
                                        <div className="medication-name-underline" />
                                    </div>
                                </div>



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


                            </div>
                        </div>
                        <div className="medication-actions">
                            <button className="med-for-day-button-button" onClick={handleCancelClick}>back</button>
                            <button className="med-for-day-button-button" onClick={handleNextClick}>Next</button>
                        </div>
                        <div className="medication-notes" />
                    </div>
                </div>
            );
        } else if (showAddMed) {

            return (
                <div>
                    <h2>Add Medication</h2>
                    <section className = "pill">
                        <form className ="rx-pill-bottle-form" onSubmit={handleAddMedication}>
                            <div className="input-group">
                                <input type="text" placeholder="Medicine Name" id="medName-input" name="medName" onChange={e => setMedName(e.target.value)}/>
                            </div>
                            <div className="input-group">
                                <input type="text" placeholder="Description" id="description-input" name="description" onChange={e => setDescription(e.target.value)}/>
                            </div>
                            <div className="input-group">
                                <input type="text" placeholder="Dose Amount" id="doseAmt-input" name="doseAmt" onChange={e => setDoseAmt(e.target.value)}/>
                            </div>
                            <div className="input-group1">
                                <input type="date" placeholder="Start Date" id="startDate-input" name="startDate" onChange={e => setStartDate(e.target.value)}/>
                                <input type="date" placeholder="End Date" id="endDate-input" name="endDate" onChange={e => setEndDate(e.target.value)}/>
                            </div>
                            <div className="input-group2">
                                <input type="text" placeholder="Doctor's First Name" id="doctorFirstName-input" name="doctorFirstName" onChange={e => setDoctorFirstName(e.target.value)}/>
                                <input type="text" placeholder="Doctor's Last Name" id="doctorLastName-input" name="doctorLastName" onChange={e => setDoctorLastName(e.target.value)}/>
                            </div>
                            <div className="input-group">
                                <input type="text" placeholder="Doctor's Phone" id="doctorPhone-input" name="doctorPhone" onChange={e => setDoctorPhone(e.target.value)}/>
                            </div>
                            <div className="input-group3">
                                <button className="med-for-day-button" type="button" onClick={() => handleMedListClick()}>Cancel</button>
                                <button className="med-for-day-button" type="submit" id="submit">submit</button>
                            </div>
                        </form>
                    </section>
                </div>
            );
        }
    };
    const renderMedList = () => {
        if (showMedList) {
            return <button className="med-for-day-button" onClick={handleMedsForTheDayClick}>Meds for <br /> the day</button>;
        } else if (showMedsforTheDay) {
            return <button className="med-for-day-button" onClick={handleMedListClick}>Medication list</button>;
        } else if (showAddMed) {
            return (
                <div className="meds-buttons">
                    <button className="med-for-day-button" onClick={handleMedsForTheDayClick}>Meds for <br /> the day</button>
                    <button className="med-for-day-button" onClick={handleMedListClick}>Medication list</button>
                </div>
            );
        }
    };

    const renderAddDeleteButton = () => {
        if (!showAddMed) {
            return (
                <>
                    <button className="delete-medication-button" onClick={handleDeleteMedicationClick}>Delete medication</button>
                    <button className="add-medication-button" onClick={handleAddMedicationClick}>Add medication</button>
                </>
            );
        }
        return null; // If showAddMed is true, return null (no buttons rendered)
    };

    return (
        <div className="app-container">
            <main className="main-content">
                <div className="columns-container">
                    <section className="column medication-actions">
                        <div className="meds-buttons">
                            {renderMedList()}
                            {renderAddDeleteButton()}
                        </div>
                    </section>
                    <section className="column medication-list">
                        <div className="medication-list-container">
                            {switchPage(showMedList, medications)}
                        </div>
                    </section>
                </div>
            </main>
            <BackButton />
        </div>
    );
}

export default RxListPage;