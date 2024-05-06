import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import Cookies from 'js-cookie';


const EmergencyContact = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [viewClicked, setViewClicked] = useState(false);
    const [IscontactInfo, setContactInfo]=useState(false);
    const [userId, setUserId] = useState("");
    let navigate = useNavigate();   

let contactInfo =
    {
        name: "Yuto Mori",
        phone: "415-555-5555",
        email: "yuto@hotmail.com"
    };
    useEffect(() => {
        if (Cookies.get('user_id') && Cookies.get('session_id')) {
            setUserId(Cookies.get('user_id'));
           // console.log("User id has been set!" + user_id)
        } else {
            alert("You need to relog in!")
            navigate('/');
        }

    //api for view medicine

        //move outside to a callable function
        const addEmergencyContact = async () =>{
            let data = {
                user_id: 2,
                first_name: "test_fn",
                last_name:"test_ln",
                phone: "666",
                email: "stuff@stuff.com"
            }
            console.log(data);

        if(data.user_id){
                axios.post('http://localhost:8000/addEmergencyContact', data )
            // axios.post('http://ec2-3-144-15-61.us-east-2.compute.amazonaws.com/addEmergencyContact', data )
                .then((res) => {

                console.log(res.data);
                console.log(res.status);
                })
                .catch((error) => {
                    console.error('Error adding emergency contact:', error);
                });
                
            };
        }
            addEmergencyContact();    
    }, [userId]);


    const [hasEmergencyContact, setEmergencyContact] = useState(false);
    const handleContactSubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById("name-input").value;
        const phone = document.getElementById("phone-input").value;
        const email = document.getElementById("email-input").value;
        contactInfo = {name: name, phone: phone, email: email};
        setEmergencyContact(true);
    };
    return (
        <div className='emergencyContact-Page'>
            <h1>Emergency Contact</h1>
            {hasEmergencyContact ? (
                <div className="emergency-contact-form">
                    <h2>{contactInfo.name}</h2>
                    <h3>Phone: {contactInfo.phone}</h3>
                    <h3>Email: {contactInfo.email}</h3>
                </div>
            ) : (
                <form className="emergency-contact-form" onSubmit={handleContactSubmit}>
                    <p>Enter your emergency contact information:</p>
                    <input type="text" placeholder="Name" id="name-input" name="name" />
                    <input type="text" placeholder="Phone Number" id="phone-input" name="phone" />
                    <input type="email" placeholder="Email" id="email-input" name="email" />
                    <button>Submit</button>
                </form>
            )}
        </div>
    );
    
};

export default EmergencyContact;
