import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AboutUsPage from './frontend/pages/index'
import HomePage from "./frontend/pages/home"
import LoginPage from './frontend/pages/login';
import { QueryClient, QueryClientProvider } from "react-query";
import SignUpPage from './frontend/pages/signUp';
import DB_Test_Page from './frontend/pages/dbtest';
import AleiaPage from './frontend/pages/aleia';

import Sidebar from './frontend/Components/Sidebar';

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
            <div>
                <Sidebar />
                <nav>
                    <Link to='/'>Home</Link> <br />
                    <Link to='/about'>About Us</Link> <br/>
                    <Link to='/login'>Login</Link> <br/> 
                    <Link to='/signup'>Sign Up</Link> <br/>
                    <Link to='/dbtest'>DB Test</Link>
                </nav>

                {/*All routes must go here in App.js*/}
                <Routes>
                  <Route path='/' element={<HomePage />} />

                  <Route path='/about' element={<AboutUsPage />} />
                  <Route path='/about/aleia' element={<AleiaPage />} />

                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/signup' element={<SignUpPage />} />

                  <Route path='/dbtest' element={<DB_Test_Page/>}/>
                </Routes>
                
            </div>
        </Router>
    </QueryClientProvider>
  );
}

export default App;