import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import "../App.css";

function RxListPage() {

    const [medications, setMedications] = useState([]);
    const [selectedMedicationId, setSelectedMedicationId] = useState(0);
    const [showMedList, setShowMedList] = useState(true); // Define state variables
    const [showMedsforTheDay, setShowMedsforTheDay] = useState(false);
    const [showAddMed, setShowAddMed] = useState(false);
    const [newMedication, setNewMedication] = useState({
        med_name: "",
        dosage: "",
        descrpiton: "",
        start_date: "",
        end_date: "",
        doctor_first_name: "",
        doctor_last_name: ""
    });
    useEffect(() => {
        // Fetch medications data from API and set it to the state
        axios.get('http://localhost:8000/api/Medication_list')
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
                descrpiton: "Description 1",
                start_date: "2022-01-01",
                end_date: "2022-01-30",
                doctor_first_name: "John",
                doctor_last_name: "Doe"
            },
            {
                id: 2,
                med_name: "Medication 2",
                dosage: "20mg",
                descrpiton: "Description 2",
                start_date: "2022-02-01",
                end_date: "2022-02-28",
                doctor_first_name: "Jane",
                doctor_last_name: "Smith"
            },
            {
                id: 3,
                med_name: "Medication 3",
                dosage: "30mg",
                descrpiton: "Description 3",
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

    const MedicationItem = ({ med_name, dosage, descrpiton, start_date, end_date, doctor_first_name, doctor_last_name }) => (
        <div className="medication-item">
            <div className="medication-name">Medication Name: {med_name}</div>
            <div className="medication-dosage">Dosage: {dosage}</div>
            <div className="medication-description">Description: {descrpiton}</div>
            <div className="medication-start-date">Start Date: {start_date}</div>
            <div className="medication-end-date">End Date: {end_date}</div>
            <div className="medication-doctor-first-name">Doctor First Name: {doctor_first_name}</div>
            <div className="medication-doctor-last-name">Doctor Last Name: {doctor_last_name}</div>
            <div className="medication-quantity-info">quantity: 30 </div>
        </div>
        //quantity
        //med for the day
    );


    const  handleMedListClick =()=>{
        setShowMedList(true);
        setShowAddMed(false);

        setShowMedsforTheDay(false);
    }

    const handleMedsForTheDayClick =()=>{
        setShowMedList(false);
        setShowAddMed(false);

        setShowMedsforTheDay(true);


        /* axios.get('http://localhost:8000/api/Medication_list/medForTheDay')
         .then(response => {
             setMedications(response.data);//list
         })
         .catch(error => {
             console.error('Error fetching medications:', error);

         });*/



    }
    const handleAddMedicationClick = (medication) => {
        setShowMedList(false);
        setShowAddMed(true);

        setShowMedsforTheDay(false);
        axios.post('http://localhost:8000/api/AddMedication_list', medication)
            .then(response => {
                setMedications(response.data);

            })
            .catch(error => {
                console.error('Error adding medication:', error);

            });
    };

    const handleDeleteMedicationClick = (medicationId) => {
        axios.post('http://localhost:8000/api/DeleteMedication_list', { id: medicationId })
            .then(response => {
                setMedications(response.data);

            })
            .catch(error => {
                console.error('Error deleting medication:', error);

            });
    };
    const handleNextClick =()=>{
        console.log(selectedMedicationId);
        if (medications.length > selectedMedicationId + 1) {//index0=1,1=2
            setSelectedMedicationId(prevCount => prevCount + 1);
        }

    };
    const handleCancelClick =()=>{//for now it is "back"
        console.log(selectedMedicationId);
        if (-1 < selectedMedicationId - 1) {//index0=1,1=2
            setSelectedMedicationId(prevCount => prevCount- 1);
        }

    };
    const switchPage = (showMedList, medications) => {
        if (showMedList) {
            return (
                <div>
                    <h2 className="med-page-section-title">Medication List</h2>
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
                            <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
                            <button className="next-button" onClick={handleNextClick}>Next</button>
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
                            <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
                            <button className="next-button" onClick={handleNextClick}>Next</button>
                        </div>
                        <div className="medication-notes" />
                    </div>
                </div>
            );
        } else if (showAddMed) {


            const handleAddMedication = () => {
                // Call API to add new medication using the data in newMedication state
                axios.post('http://localhost:8000/api/AddMedication_list', newMedication)
                    .then(response => {
                        // Update state or perform any necessary actions after adding the medication
                        console.log("Medication added successfully:", response.data);
                        alert("Medication added successfully:");
                        // Optionally, you can reset the form state after successful addition
                        setNewMedication({
                            med_name: "",
                            dosage: "",
                            descrpiton: "",
                            start_date: "",
                            end_date: "",
                            doctor_first_name: "",
                            doctor_last_name: ""
                        });
                        // Optionally, you can switch to another page after successful addition
                        setShowAddMed(false);
                        setShowMedList(true); // Switch back to the medication list page
                    })
                    .catch(error => {
                        console.error('Error adding medication:', error);
                        alert("Error adding medication:");
                        setShowAddMed(false);
                        setShowMedList(true);
                    });

            };

            return (
                <div>
                    <h2>Add Medication</h2>
                    <section className="pill">
                        <form className="rx-pill-bottle-form" onSubmit={handleAddMedication}>
                            <div>
                                <label>Medication Name:</label>
                                <input
                                    type="text"
                                    value={newMedication.med_name}
                                    onChange={(e) => setNewMedication({...newMedication, med_name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label>Dosage:</label>
                                <input
                                    type="text"
                                    value={newMedication.dosage}
                                    onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                                />
                            </div>
                            <div>
                                <label>Description:</label>
                                <input
                                    type="text"
                                    value={newMedication.descrpiton}
                                    onChange={(e) => setNewMedication({...newMedication, descrpiton: e.target.value})}
                                />
                            </div>
                            <div>
                                <label>Start Date:</label>
                                <input
                                    type="text"
                                    value={newMedication.start_date}
                                    onChange={(e) => setNewMedication({...newMedication, start_date: e.target.value})}
                                />
                            </div>
                            <div>
                                <label>End Date:</label>
                                <input
                                    type="text"
                                    value={newMedication.end_date}
                                    onChange={(e) => setNewMedication({...newMedication, end_date: e.target.value})}
                                />
                            </div>
                            <div>
                                <label>Doctor First Name:</label>
                                <input
                                    type="text"
                                    value={newMedication.doctor_first_name}
                                    onChange={(e) => setNewMedication({
                                        ...newMedication,
                                        doctor_first_name: e.target.value
                                    })}
                                />
                            </div>
                            <div>
                                <label>Doctor Last Name:</label>
                                <input
                                    type="text"
                                    value={newMedication.doctor_last_name}
                                    onChange={(e) => setNewMedication({...newMedication, doctor_last_name: e.target.value})}
                                />
                            </div>
                            <button type="submit">Add Medication</button>
                        </form>
                    </section>
                </div>
            );
        }
    };
    const handleBackClick = () => {
        window.history.go(-1);
    };
    const renderMedList = () => {
        if (showMedList){
            return <button className="med-for-day-button" onClick={handleMedsForTheDayClick}>Meds for <br /> the day</button>
        }else{
            return   <button className="med-for-day-button" onClick={handleMedListClick}>Medication list</button>

        }

    }
    const renderAddDeleteButton = () => {
        if (!showAddMed) {
            return (
                <>
                    <button className="delete-medication-button" onClick={() => handleDeleteMedicationClick(medications.medicationId)}>Delete medication</button>
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
                    <section className="column-medication-actions">
                        <h1>RX List</h1>
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
            <button className="backButton" onClick={handleBackClick}>Back</button>
        </div>
    );
}

export default RxListPage;