import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutUsPage from "./frontend/pages/index";
import profilePage from "./frontend/pages/index";//frontend needs to implment
import medicationPage from "./frontend/pages/index";//frontend needs to implment
import HomePage from "./frontend/pages/home";
import LoginPage from "./frontend/pages/login";
import { QueryClient, QueryClientProvider } from "react-query";
import SignUpPage from "./frontend/pages/signUp";
import Dbtest from "./frontend/pages/dbtest";
import SettingsPage from "./frontend/pages/settings";
import Sidebar from "./frontend/Components/Sidebar";
import Topbar from "./frontend/Components/topbar";
import UseSessionCheck from './frontend/Components/UseSessionCheck';
import RxListPage from "./frontend/pages/rxList";
import CalendarPage from "./frontend/pages/calendar";
import PatientProfilePage from "./frontend/pages/profile";
import DashBoard from "./frontend/pages/dashboard";
import BackButton from "./frontend/Components/BackButton";


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
            <Route path="/about/aleia" element={<AleiaPage />} />
            <Route path="/profile" element={<profilePage />} />
            <Route path="/medications" element={<medicationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dbtest" element={<Dbtest />} />
            <Route path="/dbtest/:q" element={<Dbtest />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;