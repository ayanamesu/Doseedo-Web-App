import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  useLocation } from 'react-router-dom';
import axios from 'axios';

const useSessionCheck = async () => {
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

// // Previously had (via disc chat 4/13/24):
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
// const UseSessionCheck = () => {
//     const [isSessionActive, setIsSessionActive] = useState(false);
//     const navigate = useNavigate();
//    const [cookies, setCookie] = useCookies(['session_id']);
  
//     useEffect(() => {
        
//      const getSessionId = () => cookies.session_id;

//     const session_id = getSessionId();
//     console.log(session_id);
//     axios.get('http://localhost:8000/api/session', {
//         headers: {
//             Authorization: `Bearer ${session_id}`
//         }
//     })
//             .then((apiRes) => {
//                 console.log("RES"+apiRes.data);

//                 const status= apiRes.status;
//                 //const sessionid= apiRes.data.session_id
//                 const userid= apiRes.data.user_id
//                 setIsSessionActive(checkSession(status));
//                 if (!isSessionActive) {
//                     navigate("/", { replace: true });
//                 }else{//when session id is active
//                     setCookie("user_id", userid, { sameSite: 'lax'});
//                 }
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }, [navigate]);

//     const checkSession = (status) => {
//        if(status==200){
//             console.log("200 Active Session");
//             return true;
//        }else if (status==400){
//              console.log("401 No session for this user");
//             return  false;
//        }
//        console.log("ERROR: Error");
//        return  false;
//     }

//     return [isSessionActive]; // Return session status
// }

// export default UseSessionCheck;

//

// Previously had via github commit e462e7b (the pervious change to this)
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const UseSessionCheck = () => {
//     const [isSessionActive, setIsSessionActive] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get('http://localhost:8000/api/session')
//             .then((apiRes) => {
//                 const sessionData = apiRes.data;
//                 setIsSessionActive(checkSession(sessionData));
//                 if (!isSessionActive) {
//                     navigate("/", { replace: true });
//                 }
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }, [navigate]);

//     const checkSession = (sessionData) => {
//         const cookies = document.cookie.split(';').map(cookie => cookie.trim());
//         for (const cookie of cookies) {
//             const [name, value] = cookie.split('=');
//             if (name.trim() === 'sessionid' && value.trim() === sessionData.sessionid) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     return [isSessionActive]; // Return session status
// }

// export default UseSessionCheck;