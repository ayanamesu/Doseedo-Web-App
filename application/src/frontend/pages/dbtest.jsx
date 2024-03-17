import React, { useEffect, useState } from "react";
import axios from 'axios';

const Dbtest = () => {
    const [backendData, setBackendData] = useState(''); 
    // const data = {
    //     fname: 'John',
    //     lname: 'Doe',
    //     email: 'john.doe@example.com',
    //     password: 'password',
    //     address1: '123 Main St',
    //     state: 'NY',
    //     city: 'New York',
    //     zipCode: '10001',
    //     phone: '1234567890'
    //   };
    // axios.post('http://localhost:3000/dbtest', data)
    // .then(response => { console.log(response.data);
    // })
    // .catch(error => {
    //     console.error(error);
    // });
useEffect(()=>{
    axios.get('http://localhost:3000/dbtest')
    .then(response =>{ console.log(response);
        setBackendData(response.data.message);
    })
    .catch(error =>{
        console.error('Error fetching data from the backend:', error);
    });
}, []);

return (
    <div>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <p>Data from backend: {backendData}</p>
        
    </div>
);
};
export default Dbtest;

