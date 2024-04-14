import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useSessionCheck = () => {
    const [userId, setUserId] = useState("");

    const navigate = useNavigate();

    const sess_id = document.cookie.split("=")[1];
    let data = {
        session_id : sess_id
    }

    useEffect(() => {
        axios.post('http://localhost:8000/api/session', data)
            .then((apiRes) => {
                console.log(apiRes.status);
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
    }, [navigate]);

    return [userId]; // Return user_id if active session or null if active session
}

export default useSessionCheck;
