import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutUsPage from "./frontend/pages/index";
import HomePage from "./frontend/pages/home";
import LoginPage from "./frontend/pages/login";
import { QueryClient, QueryClientProvider } from "react-query";
import SignUpPage from "./frontend/pages/signUp";
import Dbtest2 from "./frontend/pages/dbtest2";
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

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dbtest" element={<Dbtest />} />
            <Route path="/dbtest2" element={<Dbtest2 />} />
            
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;