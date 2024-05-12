import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios';

import AboutUsPage from "./frontend/pages/index";
import profilePage from "./frontend/pages/index";//frontend needs to implment
import medicationPage from "./frontend/pages/index";//frontend needs to implment
import HomePage from "./frontend/pages/home";

import { QueryClient, QueryClientProvider } from "react-query";

import SettingsPage from "./frontend/pages/settings";
import Sidebar from "./frontend/Components/Sidebar";
import Topbar from "./frontend/Components/topbar";
import RxListPage from "./frontend/pages/rxList";
import CalendarPage from "./frontend/pages/calendar";
import PatientProfilePage from "./frontend/pages/profile";
import Caregiver_DashBoard from "./frontend/pages/caregiver_dashboard"
import Pateint_DashBoard from "./frontend/pages/patient_dashboard"
import BackButton from "./frontend/Components/BackButton";
import PatientList from "./frontend/pages/patientList";
import CareGiverRxListPage from "./frontend/pages/caregiverRxList";
 
import EmergencyContact from "./frontend/pages/emergencyContact";
import Reminders from "./frontend/pages/reminders";
 


const queryClient = new QueryClient({});


function App() {
  const [apiLink, setApiLink] = useState("");

  // TO DO: May need to change this to the ec2 instance when we finally migrate to the server
  useEffect(() => {
    axios.get('http://localhost:8000/env-var')
      .then(response => {
        setApiLink(response.data.API_LINK);
        console.log("This is the apiLink: " + apiLink);
      })
      .catch(error => {
        console.error('Error fetching environment variables:', error);
      });
  }, [apiLink]);

  return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <div>
            <Sidebar />
            <Topbar apiLink={apiLink} />
            <BackButton />
            {/*All routes must go here in App.js*/}
            <Routes>
              <Route path="/" element={<HomePage apiLink={apiLink}/>} />

              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/settings" element={<SettingsPage apiLink={apiLink}/>} />
              <Route path="/rxList" element={<RxListPage apiLink={apiLink}/>} />
              <Route path="/calendar" element={<CalendarPage apiLink={apiLink}/>} />
              <Route path="/profile" element={<PatientProfilePage apiLink={apiLink}/>} />
              <Route path="/patient_dashboard" element={<Pateint_DashBoard/>} />
              <Route path="/caregiver_dashboard" element={<Caregiver_DashBoard/>} />
              <Route path="/patientlist" element={<PatientList apiLink={apiLink}/>} />
              <Route path="/caregiverRxList" element={<CareGiverRxListPage apiLink={apiLink}/>} />
              <Route path="/emergencyContact" element={<EmergencyContact apiLink={apiLink}/>} />
              <Route path="/Reminders" element={<Reminders apiLink={apiLink}/>} />

            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
  );
}

export default App;