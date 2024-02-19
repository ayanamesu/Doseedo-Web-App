import {Routes, Route } from "react-router-dom"
import AboutUsPage from "./pages/index"

function App() {
  return (
    <div>
        <Routes>
            <Route index element={<AboutUsPage/>}/>
            <Route path="/" element={<AboutUsPage/>}/>
        </Routes>
    </div>
  );
}
