import React, { useEffect, useState } from "react";
import axios from "axios";

const Dbtest = () => {
  const [backendData, setBackendData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [medicine, setMedicine] = useState([]);
  // testing insert for future date
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
      .get("http://ec2-3-139-83-222.us-east-2.compute.amazonaws.com/api/dbtest")
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
      .get("http://ec2-3-139-83-222.us-east-2.compute.amazonaws.com/api/searchtest") //dummy url to get data from backend mysql
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
    <div className="main-content">
      <h1 className="page-title">Results:</h1>
      <div className="search-page">
        {filteredData?.map((item, index) => {
          // return the JSX for each item here inside the mysql database
          // this list the mysql data from the User table (Could add more fields later as it only show first and last name)
          return (
            <div key={index}>
              <div className="result-container">
                <h2 className="result-title">User</h2>
                <div className="name"><strong>Name:</strong> {item.first_name} {item.last_name}</div>
              </div>
            </div>
          );
        })}
        {medicine?.map((item, index) => {
          // return the JSX for each item here
          // this lists the mysql data from the Prescriptions table
          return (
            <div key={index}>
              <div className="result-container">
                <h2 className="result-title">Medicine</h2>
                <div className="name"><strong>Type:</strong> {item.med_name}</div>
                <p className="medicine-description"><strong>Description:</strong> {item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Dbtest;