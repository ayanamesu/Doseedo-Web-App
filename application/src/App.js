import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutUsPage from "./frontend/pages/index";
import profilePage from "./frontend/pages/index";//frontend needs to implment
import medicationPage from "./frontend/pages/index";//frontend needs to implment
import HomePage from "./frontend/pages/home";
import LoginPage from "./frontend/pages/login";
import { QueryClient, QueryClientProvider } from "react-query";
import SignUpPage from "./frontend/pages/signUp";

import AleiaPage from "./frontend/pages/aleia";
import Dbtest from "./frontend/pages/dbtest";
import Sidebar from "./frontend/Components/Sidebar";

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