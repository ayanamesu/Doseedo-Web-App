import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  useLocation } from 'react-router-dom';
import axios from 'axios';

const useSessionCheck = () => {
    const [userId, setUserId] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const sess_id = document.cookie.split("=")[1];
    let data = {
        session_id : sess_id
    }

    useEffect(() => {
        if (location.pathname === "/") {
            return; // Do nothing if the current route is "/"
        }
        axios.post('http://localhost:8000/api/session', data)
            .then((apiRes) => {
                console.log("status:"+apiRes.status);
                if (apiRes.status == 200) {
                    const user_id = apiRes.data.user_id;
                    setUserId(user_id);
                } else {
                    navigate('/');
                }
            })
            .catch((error) => {
              console.error(error);
            });
    }, []);

    return [userId]; // Return user_id if active session or null if active session
}

export default useSessionCheck;
