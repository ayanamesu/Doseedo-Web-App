// SessionCheck.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UseSessionCheck = () => {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/session')
            .then((apiRes) => {
                const sessionData = apiRes.data;
                setIsSessionActive(checkSession(sessionData));
                if (!isSessionActive) {
                    navigate("/", { replace: true });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [navigate]);

    const checkSession = (sessionData) => {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        for (const cookie of cookies) {
            const [name, value] = cookie.split('=');
            if (name.trim() === 'sessionid' && value.trim() === sessionData.sessionid) {
                return true;
            }
        }
        return false;
    }

    return [isSessionActive]; // Return session status
}

export default UseSessionCheck;
