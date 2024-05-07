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
    // const sessionUserId = useSessionCheck(); 
    const [isLoading, setLoading] = useState(true);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
 
    useEffect(() => {
        // Fetch user profile data     if (sessionUserId === "") {
        // if (sessionUserId === "") {
        //         navigate('/'); 
        // } else { 
        //     setUserId(sessionUserId[0]);
        // } 
        // if (Cookies.get('user_id') && Cookies.get('session_id')) {
        //     setUserId(Cookies.get('user_id'));
        //     console.log("User id has been set!" + user_id)
        // } else {
        //     alert("You need to relog in!")
        //     //navigate('/');
        // }
        setUserId(Cookies.get('user_id'));
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
                setCity(apiRes.data.city);
                setZipCode(apiRes.data.zip_code);
                setPhone(apiRes.data.phone);
                console.log("We should be ok here")
            }) 
            .catch((error) => {
                console.error(error);
            });       
           
    }, [user_id]); // end of useEffect

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
        <div>
          <div className="detail-line">
            <strong>Address1: </strong>{address1}
          </div>
          <div className="detail-line">
            <strong>Address2: </strong>{address2}
          </div>
          <div className="detail-line">
            <strong>City: </strong>{city}
          </div>
          <div className="detail-line">
            <strong>Zip Code: </strong>{zip_code}
          </div>
          <div className="detail-line">
            <strong>Phone: </strong>{phone}
          </div>
        </div>
      );

    const editProfileForm = () => (
        <div>
            <form className="edit-profile-form" onSubmit={handleEditProfile}>
                <h2>Edit Profile</h2>
                <input type="text" placeholder="First name" id="firstname-input" name="firstName" onChange={e => setUserFName(e.target.value)}/>
                <input type="text" placeholder="Last name" id="lastname-input" name="lastName" onChange={e => setUserLName(e.target.value)}/>
                <input type="email" placeholder="Email" id="email-input" name="email" onChange={e => setEmail(e.target.value)}/>
                <input type="text" placeholder="Address 1" id="address1-input" name="address1" onChange={e => setAddress1(e.target.value)}/>
                <input type="text" placeholder="Address 2" id="address2-input" name="address2" onChange={e => setAddress2(e.target.value)}/>
                <input type="text" placeholder="City" id="city-input" name="city" onChange={e => setCity(e.target.value)}/>
                <input type="text" placeholder="Zip Code" id="zip-code-input" name="zipCode" onChange={e => setZipCode(e.target.value)}/>
                <input type="text" placeholder="Phone" id="phone-input" name="phone" onChange={e => setPhone(e.target.value)}/>
                <button type="submit" id="submitButton" >submit</button>
            </form>
        </div>
    );

    const editProfileClicked = () => {
        setIsEditingProfile(!isEditingProfile);
    };

    const renderEditProfileForm = () => {
        if (isEditingProfile) {
            return editProfileForm();
        }
        return null;
    };

    const handleEditProfile = () => {
        console.log("Edit Profile clicked");
        axios.post(apiLink + '/profile/edit', { id: user_id, first_name: userFName, last_name: userLName, email: email,address_1: address1, address_2: address2, city: city, zip_code: zip_code, phone:phone})
            .then((apiRes) => { //apiRes.status = 201 if the link is successful || 500 if somethingn went wrong
       
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
                        <button className="edit-button" onClick={editProfileClicked}><FontAwesomeIcon icon={faPenToSquare} title="Edit Profile"/></button>
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