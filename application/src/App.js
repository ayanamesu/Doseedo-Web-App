import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
<<<<<<< HEAD
import EmergencyContactPage from "./frontend/pages/emergencyContact";
=======
import EmergencyContact from "./frontend/pages/emergencyContact";
>>>>>>> origin/yakBranch


const queryClient = new QueryClient({});


function App() {

  return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <div>
            <Sidebar />
            <Topbar />
            <BackButton />
            {/*All routes must go here in App.js*/}
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/settings" element={<SettingsPage/>} />
              <Route path="/rxList" element={<RxListPage/>} />
              <Route path="/calendar" element={<CalendarPage/>} />
              <Route path="/profile" element={<PatientProfilePage/>} />
              <Route path="/patient_dashboard" element={<Pateint_DashBoard/>} />
              <Route path="/caregiver_dashboard" element={<Caregiver_DashBoard/>} />
              <Route path="/patientlist" element={<PatientList/>} />
              <Route path="/caregiverRxList" element={<CareGiverRxListPage/>} />
<<<<<<< HEAD
              <Route path="/emergencyContactPage" element={<EmergencyContactPage/>} />
=======
              <Route path="/emergencyContact" element={<EmergencyContact/>} />

>>>>>>> origin/yakBranch
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
  );
}

export default App;