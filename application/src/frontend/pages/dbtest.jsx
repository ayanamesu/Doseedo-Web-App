import React, { useEffect, useState } from "react";
import axios from "axios";

const Dbtest = () => {
  const [backendData, setBackendData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [medicine, setMedicine] = useState([]);
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
  useEffect(() => {
    const currentUrl = window.location.href;
    const urlObj = new URL(currentUrl);
    const searchParam = urlObj.searchParams.get("search");
  
    if (searchParam) {
      console.log(searchParam);
    }
  
    axios
      .get("http://localhost:3000/dbtest")
      .then((response) => {
        setBackendData(response.data);
        setFilteredData(
          response.data.filter((item) =>
            item.first_name.toLowerCase().includes(searchParam.toLowerCase()),
          ),
        );
      })
      .catch((error) => {
        console.error("Error fetching data from the backend:", error);
      });
  
    axios
      .get("http://localhost:3000/searchtest") //dummy url to get data from backend mysql
      .then((response) => {
        setMedicine(response.data.filter((item) =>
        item.med_name.toLowerCase().includes(searchParam.toLowerCase()), //returns whole item but only compares one column
      ),);
      })
      .catch((error) => {
        console.error("Error fetching data from the backend:", error);
      });
  }, []);

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <p>Data from backend:</p>
      {filteredData?.map((item, index) => {
        // this lists the mysql data from the User table you can add more fields
        return (
          <div key={index}>
            {item.first_name} {item.last_name} 
          </div>
        );
      })}
      {medicine?.map((item, index) => {
        // return the JSX for each item here
        // this lists the mysql data from the Prescriptions table
        return (
          <div key={index}>
            {item.med_name} {item.description}
          </div>
        );
      })}
    </div>
  );
};
export default Dbtest;