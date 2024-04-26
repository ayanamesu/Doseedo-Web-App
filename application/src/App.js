import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutUsPage from "./frontend/pages/index";
import HomePage from "./frontend/pages/home";
import LoginPage from "./frontend/pages/login";
import { QueryClient, QueryClientProvider } from "react-query";
import SignUpPage from "./frontend/pages/signUp";
import SettingsPage from "./frontend/pages/settings";
import Sidebar from "./frontend/Components/Sidebar";
import Topbar from "./frontend/Components/topbar";
import UseSessionCheck from './frontend/Components/UseSessionCheck';
import RxListPage from "./frontend/pages/rxList";
import CalendarPage from "./frontend/pages/calendar";
import PatientProfilePage from "./frontend/pages/profile";
import DashBoard from "./frontend/pages/dashboard";
import BackButton from "./frontend/Components/BackButton";
import Caregiver from "./frontend/pages/caregiver";
import PatientList from "./frontend/pages/patientList";
import CareGiverRxListPage from "./frontend/pages/caregiverRxList";


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

              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/settings" element={<SettingsPage/>} />
              <Route path="/rxList" element={<RxListPage/>} />
              <Route path="/calendar" element={<CalendarPage/>} />
              <Route path="/profile" element={<PatientProfilePage/>} />
              <Route path="/dashboard" element={<DashBoard/>} />
              <Route path="/caregiver" element={<Caregiver/>} />
              <Route path="/patientlist" element={<PatientList/>} />
              <Route path="/caregiverRxList" element={<CareGiverRxListPage/>} />

            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
  );
}

export default App;