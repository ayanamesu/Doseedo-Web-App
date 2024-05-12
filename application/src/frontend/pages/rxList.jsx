import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import Cookies from 'js-cookie';
import BackButton from "../Components/BackButton";

function RxListPage({apiLink}) {
    const [user_id, setUserId] = useState("");
    //med
    const [medications, setMedications] = useState([]);
    const [selectedMedicationId, setSelectedMedicationId] = useState(0);
    const [showMedList, setShowMedList] = useState(true); // Define state variables
    const [showAddMed, setShowAddMed] = useState(false);
    const [showDeleteMed, setShowDeleteMed]= useState(false);
    const [medName, setMedName] = useState("");
    const [description, setDescription] = useState("");
    const [doseAmt, setDoseAmt] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [doctorFirstName, setDoctorFirstName] = useState("");
    const [doctorLastName, setDoctorLastName] = useState("");
    const [doctorPhone, setDoctorPhone] = useState("");
    const navigate = useNavigate();

    //reminder
    const [showReminderForm, setShowReminderForm] = useState(false);
    const [repeat, setRepeat] = useState("");
    const [frequency, setFrequency] = useState(1);
    const[isWeekly,setIsweekly]=useState(false);
    const[dayArray, setDayArray]=useState([]);
        const[dateArray, setDateArray]=useState([]);
        const[timeArray, setTimeArray]=useState([]);

    useEffect(() => {
        if (Cookies.get('user_id') && Cookies.get('session_id')) {
            setUserId(Cookies.get('user_id'));
           // console.log("User id has been set!" + user_id)
        } else {
            alert("You need to relog in!")
            navigate('/');
        }
        fetchMeds();
    }, [user_id]);

    const MedicationItem = ({ med_name, dosage, description, start_date, end_date, doctor_first_name, doctor_last_name }) => (
        <div className="medication-item">
            <div className="medication-name">Medication Name: {med_name}</div>
            <div className="medication-dosage">Dosage: {dosage}</div>
            <div className="medication-description">Description: {description}</div>
            <div className="medication-start-date">Start Date: {new Date(start_date).toISOString().slice(0, 10)}</div>
            <div className="medication-end-date">End Date: {new Date(end_date).toISOString().slice(0, 10)}</div>
            <div className="medication-start-date">Start Date: {new Date(start_date).toISOString().slice(0, 10)}</div>
            <div className="medication-end-date">End Date: {new Date(end_date).toISOString().slice(0, 10)}</div>
            <div className="medication-doctor-first-name">Doctor First Name: {doctor_first_name}</div>
            <div className="medication-doctor-last-name">Doctor Last Name: {doctor_last_name}</div>
        </div>
        //quantity
        //med for the day
    );
    
    function handleAddMedication(event) {

        if ( !user_id || !medName ||! doseAmt||!startDate||!doctorFirstName ||!doctorLastName||!doctorPhone) {
            alert("Please fill out userID, Medicine name, dose amount,start date, doctor name and phone number.");
            return;
        }
        if(doctorPhone.length > 10){
            event.preventDefault();
            alert("Invalid phone number length! Phone numbers should be 10 digits or less.");
            return;
        }
        

        event.preventDefault();
        setShowMedList(false);
        setShowAddMed(true);
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
        axios.post(apiLink + '/addmedicine', userData)
            .then(response => {
                console.log("Medication added successfully:", response.data);
                window.alert("Medication added successfully");
                setShowAddMed(false);
                setShowMedList(true); // Switch back to the medication list page
                fetchMeds();
            }, [user_id])
            .catch(error => {
                console.error('Error adding medication:', error);         
                alert("Error adding medication:");
                setShowAddMed(false);
                setShowMedList(true); 
            })
    };

    const fetchMeds = () =>{
        let data = {
            user_id: user_id
        }
        const apiRes =  axios.post(apiLink + '/viewmedicine', data)
        .then((res) => {
              console.log(res.data);
              console.log(res.status);
                setMedications(res.data);//list
            })
            .catch((error) => {
                console.error('Error fetching medications:', error);
            })
    };

    const handleAddMedicationClick = () => {

    console.log("handleAddMed");
        setShowMedList(false);
        setShowAddMed(true);
    }

        const handleDeleteMedicationClick = () => {
          console.log("med list length: " + medications.length);
          if (medications.length > 0){
          let toDelete = medications[selectedMedicationId].id;
          axios.post(apiLink + '/deletemedicine', { id: toDelete })
          .then(response => {
                setMedications(response.data);
                console.log("Medication deleted successfully:", response.data);
                window.alert("Medication deleted successfully");
                navigate('/rxlist');
                setShowDeleteMed(false);
            })
            .catch(error => {
                console.error('Error deleting medication:', error);
            });

        }
        };

    const handleMedsForTheDayClick =()=>{
        setShowMedList(false);
        setShowAddMed(false);
    }
        const  handleMedListClick =()=>{
            setShowMedList(true);
            setShowAddMed(false);
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
                <div className="medication-list-container">
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
            dosage={medications[selectedMedicationId].dose_amt}
            description={medications[selectedMedicationId].description}
            start_date={medications[selectedMedicationId].start_date}
            end_date={medications[selectedMedicationId].end_date}
            doctor_first_name={medications[selectedMedicationId].doctor_first_name}
            doctor_last_name={medications[selectedMedicationId].doctor_last_name}
        />
    )}
    
                        </div>
                 
                    </div>
                    <div className="medication-actions">
                    
                                <button className="navButtons" onClick={handleCancelClick}>back</button>
                                <button className="navButtons" onClick={handleNextClick}>Next</button>
                            </div>
                    <div className="medication-notes" />
                </div>
            </div>
            );
        }else if (showAddMed) {
            
            return (
                <div>
                    <h2>Add Medication</h2>
                    <form className ="rx-list" onSubmit={handleAddMedication}>
                            <input type="text" placeholder="Medicine Name" id="medName-input" name="medName" onChange={e => setMedName(e.target.value)}/>
                            <input type="text" placeholder="Description" id="description-input" name="description" onChange={e => setDescription(e.target.value)}/>
                            
                            <input type="text" placeholder="Dose Amount" id="doseAmt-input" name="doseAmt" onChange={e => setDoseAmt(e.target.value)}/>
                            
                            <input type="date" placeholder="Start Date" id="startDate-input" name="startDate" onChange={e => setStartDate(e.target.value)}/>
                            <input type="date" placeholder="End Date" id="endDate-input" name="endDate" onChange={e => setEndDate(e.target.value)}/>
                            <input type="text" placeholder="Doctor's First Name" id="doctorFirstName-input" name="doctorFirstName" onChange={e => setDoctorFirstName(e.target.value)}/>
                            <input type="text" placeholder="Doctor's Last Name" id="doctorLastName-input" name="doctorLastName" onChange={e => setDoctorLastName(e.target.value)}/>
                            <input type="text" placeholder="Doctor's Phone" id="doctorPhone-input" name="doctorPhone" onChange={e => setDoctorPhone(e.target.value)}/>
                            <button type="button" onClick={() => handleMedListClick()}>Cancel</button>
                            <button type="submit" id="submit">submit</button>
                        
                        </form>
                </div>
            );
        } 
    };
   

    const renderAddDeleteButton = () => {
        if (!showAddMed ) { 
            return (
                <>
                 <button className="navButtons" onClick={() => setShowReminderForm(true)}>Add Reminder</button>
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
  //Frontend req: freq, day [array], time [array], prescription_id
  const handleAddAlert = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if(repeat==='weekly'){
        console.log("weekly")
        setIsweekly(true);
    }
    else if (repeat === 'daily') {
        console.log("daily")
        setIsweekly(false);
        setDateArray([]);
    }else if(repeat==='monthly'){
        console.log("monthly")
        setIsweekly(false);
    }
    
   console.log("isweekly:"+ isWeekly)
    let alertData = {
        repeat: repeat,
        // freq: frequency, not needed for abckend
        day: isWeekly ? dayArray : dateArray,
        time: timeArray,
        prescription_id: medications[selectedMedicationId].id
    };
    console.log("patient id: "+user_id );
    console.log("repeat "+alertData.repeat);
    // console.log("freq:"+alertData.freq); not needed for backend
    console.log("day:"+alertData.day);
    console.log("time:"+alertData.time);
    console.log("medID:"+alertData.prescription_id);

    axios.post(apiLink + '/addalert', alertData)
        .then(response => {
            console.log('Success adding alert:', response.status);
            alert("Reminder successfully made!") 
        })
        .catch(error => {
            console.error('Error adding alert:', error);
            alert("Error adding alert:");
            
        });
        //initialzie after API
        setDayArray([]);
        setDateArray([]);
        setIsweekly(false);
        setFrequency(1);
        setTimeArray([]);
        setShowReminderForm(false);
        
};

const handleTimeChange = (event, index) => {
    // Handle time change for a specific input field
    const newTime = event.target.value;
    // Assuming you have an array to store time values
    setTimeArray(prevTimeArray => {
        const updatedTimeArray = [...prevTimeArray];
        updatedTimeArray[index] = newTime;
        return updatedTimeArray;
    });
};

const handleDateChange = (event, index) => {
    // Handle date change for a specific input field
    const newDate = event.target.value;
    console.log("newdate: "+newDate)
 
    setDateArray(prevDateArray => {
        const updatedDateArray = [...prevDateArray];
        updatedDateArray[index] = newDate;
        return updatedDateArray;
    });
    console.log("newdateArray: "+dateArray)
    setIsweekly(false)
};


const handleDayChange = (event, index) => {
    // Handle date change for a specific input field
    const newDay = event.target.value;
    console.log("newday: "+newDay)
    
    setDayArray(prevDayArray => {
        const updatedDateArray = [...prevDayArray];
        updatedDateArray[index] = newDay;
        return updatedDateArray;
    });
    console.log("newdateArray: "+dayArray)
    setIsweekly(true)
};
const renderReminderForm = () => {
    
    return (
        <div className="add-form">
            <h2>Add Reminder</h2>
            <form className="reminder-form" onSubmit={handleAddAlert}>
                <p>Repeat:</p>
                <select onChange={e => setRepeat(e.target.value)}>
                <option value="" disabled selected>Select...</option>

                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
                {repeat === "daily" && (
                    <>
                      
                        <p>Frequency:</p>
                        <select onChange={e => setFrequency(Number(e.target.value))}>
                        <option value=""disabled selected>Select Frequency</option>
                            <option value="1"defaultValue>1 time per day</option>
                            <option value="2">2 times per day</option>
                            <option value="3">3 times per day</option>
                        </select>
                        {Array.from({ length: frequency }, (_, i) => (
                            <div className="input-wrapper" key={`daily_${i}`}>
                                <p>Time {i + 1}:</p>
                                <input type="time" placeholder={`Time ${i + 1}`} onChange={e => handleTimeChange(e, i)} />
                            </div>
                        ))}
                    </>
                )}
                {repeat === "weekly" && (
                    <>
                      
                        <p>Frequency:</p>
                        <select onChange={e => setFrequency(Number(e.target.value))}>
                        <option value=""disabled selected>Select Frequency</option>
                            <option value="1"defaultValue>1 time per week</option>
                            <option value="2">2 times per week</option>
                            <option value="3">3 times per week</option>
                        </select>
                        {Array.from({ length: frequency }, (_, i) => (
                        <div className="input-wrapper" key={`weekly_${i}`}>
                            <p>Day {i + 1}:</p>
                            <select id={`day_${i}`} onChange={e => handleDayChange(e, i)}>
                            <option value="" disabled selected>Select a day</option>
                                <option value="mon">Monday</option>
                                <option value="tue">Tuesday</option>
                                <option value="wed">Wednesday</option>
                                <option value="thu">Thursday</option>
                                <option value="fri">Friday</option>
                                <option value="sat">Saturday</option>
                                <option value="sun">Sunday</option>
                            </select>
                            <p>Time:</p>
                            <input type="time" placeholder="Time" onChange={e => handleTimeChange(e, i)} />
                        </div>
                        ))}
                    </>
                )}
                {repeat === "monthly" && (
                    <>
                       
                        <p>Frequency:</p>
                        <select onChange={e => setFrequency(Number(e.target.value))}>
                        <option value=""disabled selected>Select Frequency</option>
                            <option value="1"defaultValue>1 time per month</option>
                            <option value="2">2 times per month</option>
                            <option value="3">3 times per month</option>
                        </select>
                        {Array.from({ length: frequency }, (_, i) => (
                            <div className="input-wrapper" key={`monthly_${i}`}>
                                <p>Date {i + 1}:</p>
                                <input type="date" placeholder={`Date ${i + 1}`} id={`date_${i}`} onChange={e => handleDateChange(e, i)} />
                                <p>Time:</p>
                                <input type="time" placeholder="Time" onChange={e => handleTimeChange(e, i)} />
                            </div>
                        ))}
                    </>
                )}
                <div className="caregiver-medication-actions">
                    <button className="navButtons" type="button" onClick={() => setShowReminderForm(false)}>Cancel</button>
                    <button className="navButtons" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
    };
        return (
            <div>
            {showReminderForm ? renderReminderForm() : (
            <div className="app-container">
                <main className="rxlist">
                    <div className="columns-container">
                        <section className="column medication-list">
                            <div className="medication-list-container">
                                {switchPage(showMedList, medications)}
                            </div>
                        </section>
                    </div>
                    {/* {renderMedList()}   */}
                    {renderAddDeleteButton()} 
                </main>
            </div>
            )}
            </div>
        );
    }


export default RxListPage;