import React, { useEffect, useState } from "react";
import axios from 'axios';

const Dbtest = () => {
    const [backendData, setBackendData] = useState('');

useEffect(()=>{
    axios.get('http://localhost:3000/dbtest')
    .then(response =>{ console.log(response);
        setBackendData(response.data.message);
    

    })
    .catch(error =>{
        console.error('Error fetching data from the backend:', error);

    });
}, []);
    return(
        <div>
            <p>Data from backend: {backendData}</p>
        </div>
    )
}
export default Dbtest;