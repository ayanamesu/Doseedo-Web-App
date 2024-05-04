import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import Cookies from 'js-cookie';

const emergencyContact= () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [viewClicked, setViewClicked] = useState(false);
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

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

};
export default CareGiverRxListPage;
