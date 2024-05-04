import React from 'react';
import { useState } from 'react';

let contactInfo =
    {
        name: "Yuto Mori",
        phone: "415-555-5555",
        email: "yuto@hotmail.com"
    };

const EmergencyContact = () => {
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