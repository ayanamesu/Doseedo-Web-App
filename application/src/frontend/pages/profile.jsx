// still debugging skeleton code
import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSessionCheck from '../Components/UseSessionCheck';
import { useEffect, useState } from 'react';
import { faPenToSquare, faShare, faUserPlus, faUserLarge} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../App.css";
import Cookies from 'js-cookie';


function PatientProfilePage({ apiLink }) {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [user_id, setUserId] = useState("");
    const [userFName, setUserFName] = useState("");
    const [userLName, setUserLName] = useState("");
    const [email, setEmail] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [zip_code, setZipCode] = useState("");
    const [phone, setPhone] = useState("");
    const [userFName_edit, setUserFName_edit] = useState("");
    const [userLName_edit, setUserLName_edit] = useState("");
    const [email_edit, setEmail_edit] = useState("");
    const [address1_edit, setAddress1_edit] = useState("");
    const [address2_edit, setAddress2_edit] = useState("");
    const [state_edit, setState_edit] = useState("");
    const [city_edit, setCity_edit] = useState("");
    const [zip_code_edit, setZipCode_edit] = useState("");
    const [phone_edit, setPhone_edit] = useState("");
    // const sessionUserId = useSessionCheck(); 
    const [isLoading, setLoading] = useState(true);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
 
    useEffect(() => {
       
        if (Cookies.get('user_id') && Cookies.get('session_id')) {
            setUserId(Cookies.get('user_id'));
            console.log("User id has been set!" + user_id)
        } else {
            alert("You need to relog in!")
            navigate('/');
        }
       
        
           
    }, [user_id]); // end of useEffect
    useEffect(() => {
        let data = {
            user_id: user_id
        }
         axios.post(apiLink + '/profile', data)
            .then((apiRes) => {
                console.log(apiRes.data);
                setUserFName(apiRes.data.first_name);
                setUserLName(apiRes.data.last_name);
                setEmail(apiRes.data.email);
                setAddress1(apiRes.data.address_1);
                setAddress2(apiRes.data.address_2);
                setState(apiRes.data.state);
                setCity(apiRes.data.city);
                setZipCode(apiRes.data.zip_code);
                setPhone(apiRes.data.phone);
                console.log("We should be ok here")
            }) 
            .catch((error) => {
                console.error(error);
            });       
        }   ); //runs everytime refresh page
    // if (isLoading) {
    //     return <div>Loading...</div>; // Render a loading indicator while fetching data
    // }

    // Previously had via github commit 12e1b6a
    // const UserCard = ({ userFName, userLName, email }) => (
    //     <>
    //         <p id="profile-email">{email}</p>
    //         <p id="profile-name">{userFName} {userLName}</p>
    //     </>
    // );
    
    const UserCard = () => (
        <>
            <p id="profile-email">{email}</p>
            <p id="profile-name">{userFName} {userLName}</p>
        </>
    );

    // Previously had via github commit 42e7810
    // const UserInfo = ({ id, userFName, userLName, email, address1, address2, city, zip_code, phone }) => (
    //     <div className="medication-item">
    //            <div className="userName">
    //             {userFName} {userLName}
    //         </div>
    //         <div className="userId">userID: {id}</div>
    //         <div className="email">email: {email}</div>
    //         <div className="address1">address1: {address1}</div>
    //         <div className="address2">address2: {address2}</div>
    //         <div className="city">city: {city}</div>
    //         <div className="zip_code">zip_code: {zip_code}</div>
    //         <div className="phone">phone: {phone}</div>
    //     </div>
    // );

    const UserInfo = () => (
        <div className="profile-details">
          <div className="detail-line">
            <strong>Address1: </strong><span>{address1}</span>
          </div>
          <div className="detail-line">
            <strong>Address2: </strong><span>{address2}</span>
          </div>
          <div className="detail-line">
            <strong>City: </strong><span>{city}</span>
          </div>
          <div className="detail-line">
            <strong>Zip Code: </strong><span>{zip_code}</span>
          </div>
          <div className="detail-line">
            <strong>Phone:</strong><span>{phone}</span>
          </div>
        </div>
      );

    const editProfileForm = () => (
           <div>
        <form className="edit-profile-form" onSubmit={handleEditProfile}>
            <h2>Edit Profile</h2>
            <input type="text" placeholder="First name" id="firstname-input" value={userFName_edit} onChange={e => setUserFName_edit(e.target.value)} />
            <input type="text" placeholder="Last name" id="lastname-input" value={userLName_edit} onChange={e => setUserLName_edit(e.target.value)} />
            <input type="email" placeholder="Email" id="email-input" value={email_edit} onChange={e => setEmail_edit(e.target.value)} />
            <input type="text" placeholder="Address 1" id="address1-input" value={address1_edit} onChange={e => setAddress1_edit(e.target.value)} />
            <input type="text" placeholder="Address 2" id="address2-input" value={address2_edit} onChange={e => setAddress2_edit(e.target.value)} />
            <input type="text" placeholder="City" id="city-input" value={city_edit} onChange={e => setCity_edit(e.target.value)} />
            <input type="text" placeholder="State" id="state-input" value={state_edit} onChange={e => setState_edit(e.target.value)} />
            <input type="text" placeholder="Zip Code" id="zip-code-input" value={zip_code_edit} onChange={e => setZipCode_edit(e.target.value)} />
            <input type="text" placeholder="Phone" id="phone-input" value={phone_edit} onChange={e => setPhone_edit(e.target.value)} />
            <button type="submit" id="submitButton">Submit</button>
        </form>
    </div>
    );

  
    const renderEditProfileForm = () => {
        if (isEditingProfile) {
            return editProfileForm();
        }
        return null;
    };

    const handleEditProfile = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log("Edit Profile clicked");
        if(phone.length > 10){
            event.preventDefault();
            alert("Invalid phone number length! Phone numbers should be 10 digits or less.");
            return;
        }
        axios.post(apiLink + '/profile/edit', { user_id: user_id, first_name: userFName, last_name: userLName, email: email,address_1: address1, address_2: address2, city: city, zip_code: zip_code, phone:phone})
            .then((apiRes) => { //apiRes.status = 201 if the link is successful || 500 if somethingn went wrong
                console.log(user_id);
                if (apiRes.status === 200) {
                    // setEditProfile(true);
                    alert("Profile edited successfully!");
                } else {
                    alert("Invalid input");
                }
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
        console.log(user_id);
    //first_name, last_name, email, phone, address_1, address_2, state, city, zip_code
        const editData = {
            user_id: user_id,
            first_name: userFName_edit !== null ? userFName_edit : userFName,
            last_name: userLName_edit !== null ? userLName_edit : userLName,
            phone: phone_edit !== null ? phone_edit : phone,
            email: email_edit !== null ? email_edit : email,
            address_1: address1_edit !== null ? address1_edit : address1,
            address_2: address2_edit !== null ? address2_edit : address2,
            state: state_edit !== null ? state_edit : state,
            city: city_edit !== null ? city_edit : city,
            zip_code: zip_code_edit !== null ? zip_code_edit : zip_code 
        };
        console.log("Data:", JSON.stringify(editData));
        axios.post(apiLink + '/profile/edit', editData)
        .then((response) => {
            console.log(response.data);
            if (response.status === 200) {
                setIsEditingProfile(false);
                alert("Profile edited successfully!");
            } else {
                alert("Invalid input");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Error: " + error.message);
        });
    };
    
    const handleShareProfile = () => {
        console.log("Share Profile clicked");

    };

    const handleAddConnections = () => {
        console.log("Add Connections clicked");

    };

    return (
        <div>
            <h1 className="profile-title">Profile Page</h1>
            <div className="profile-body">
                <div className="profile-container">
                    <div className="profile">
                        <FontAwesomeIcon className="profile-pic" icon={faUserLarge} />
                        {/* <p id="profile-email">{email}</p>
                        <p className="profile-name">{userFName} {userLName}</p> */}
                        {<UserCard/>} 
                    </div>
                    <div className="profile-buttons">
                        <button className="edit-button" onClick={() => setIsEditingProfile(true)}><FontAwesomeIcon icon={faPenToSquare} title="Edit Profile"/></button>
                        <button className="share-button" onClick={handleShareProfile}><FontAwesomeIcon icon={faShare} title="Share Profile"/></button>
                        <button className="add-button" onClick={handleAddConnections}><FontAwesomeIcon icon={faUserPlus} title="Add Connections"/></button>
                        {renderEditProfileForm()}
                    </div>
                </div>
            </div>
            <h2 className="profile-info">Profile Information</h2>
            <div className="profile-content">
                <div className="profile-content-info">
                    {user && <UserInfo {...user} />}
                </div> 
            </div>
        </div>
    );
}

export default PatientProfilePage;