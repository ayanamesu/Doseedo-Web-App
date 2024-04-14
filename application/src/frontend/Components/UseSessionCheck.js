import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
const UseSessionCheck = () => {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const navigate = useNavigate();
   const [cookies, setCookie] = useCookies(['session_id']);
  
    useEffect(() => {
        
     const getSessionId = () => cookies.session_id;

    const session_id = getSessionId();
    console.log(session_id);
    axios.get('http://localhost:8000/api/session', {
        headers: {
            Authorization: `Bearer ${session_id}`
        }
    })
            .then((apiRes) => {
                console.log("RES"+apiRes.data);

                const status= apiRes.status;
                //const sessionid= apiRes.data.session_id
                const userid= apiRes.data.user_id
                setIsSessionActive(checkSession(status));
                if (!isSessionActive) {
                    navigate("/", { replace: true });
                }else{//when session id is active
                    setCookie("user_id", userid, { sameSite: 'lax'});
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [navigate]);

    const checkSession = (status) => {
       if(status==200){
            console.log("200 Active Session");
            return true;
       }else if (status==400){
             console.log("401 No session for this user");
            return  false;
       }
       console.log("ERROR: Error");
       return  false;
    }

    return [isSessionActive]; // Return session status
}

export default UseSessionCheck;