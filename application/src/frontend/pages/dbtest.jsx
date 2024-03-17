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

const handleInputChange = (event) => {
    setBackendData(event.target.value);
};

return (
    <div>
        <p>Data from backend: {backendData}</p>
        
    </div>
);
};
export default Dbtest;





// const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     address1: '',
//     state: '',
//     city: '',
//     zipCode: '',
//     phone: ''
// });
// const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//         ...prevState,
//         [name]: value
//     }));
// };
// const handleSubmit = (e) => {
//     e.preventDefault();
// }