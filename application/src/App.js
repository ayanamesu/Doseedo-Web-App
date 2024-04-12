import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutUsPage from "./frontend/pages/index";
import HomePage from "./frontend/pages/home";
import LoginPage from "./frontend/pages/login";
import { QueryClient, QueryClientProvider } from "react-query";
import SignUpPage from "./frontend/pages/signUp";
import Dbtest from "./frontend/pages/dbtest";
import SettingsPage from "./frontend/pages/settings";
import Sidebar from "./frontend/Components/Sidebar";
import RxListPage from "./frontend/pages/rxList";
import CalendarPage from "./frontend/pages/calendar";
import PatientProfilePage from "./frontend/pages/profile";
import PatientHomePage from "./frontend/pages/homePagePatient";


const queryClient = new QueryClient({});


function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <div>
            <Sidebar />

            {/*All routes must go here in App.js*/}
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/about" element={<AboutUsPage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/dbtest" element={<Dbtest />} />
              <Route path="/settings" element={<SettingsPage/>} />
              <Route path="/rxList" element={<RxListPage/>} />
              <Route path="/calendar" element={<CalendarPage/>} />
              <Route path="/profile" element={<PatientProfilePage/>} />
              <Route path="/home" element={<PatientHomePage/>} />

            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
  );
}

export default App;