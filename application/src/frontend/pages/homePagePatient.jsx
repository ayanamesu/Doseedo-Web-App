// still debugging skeleton code
import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UseSessionCheck from '../Components/UseSessionCheck';
import "../App.css";

function PatientHomePage() {
    const navigate = useNavigate(); // Initialize navigate using useNavigate hook
    const [isSessionActive] = UseSessionCheck();
   
const handleCalendarClick = () => {
    navigate("/calendar", { replace: true });  
};
const handleRXListClick = () => {
    navigate("/rxlist", { replace: true });  
};
const handleHealthScreeningClick = () => {
    navigate("/HealthScreening", { replace: true });  
};
const handleSettingsClick = () => {
    navigate("/Settings", { replace: true });  
};
const handleProfileClick = () => {
    navigate("/HealthScreening", { replace: true });  
};
const handle911Click = () => {
    navigate("/911", { replace: true });  
};


//Line24 <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/221c393dfba4a2642662278dc448772db699328c927f41fa532004df96eee0b9?apiKey=fed26b027e8440e388870d08a2f64afd&" className="img" />
//this gives ERROR  mages loaded lazily and replaced with placeholders. Load events are deferred       
    return (
        <>
            <div className="div">
                <div className="div-9">
                    <div className="div-10">April 7th, 2024</div>
                      <div className="div-11">
                        <div className="div-12">
                            <div className="column">
                                 
                                <button className="div-13" onClick={handleCalendarClick}>
                                    Calendar{" "}
                                </button>
                                 
                            </div>
                            <div className="column-2">
                              
                                <button className="div-14" onClick={handleHealthScreeningClick}>
                                Health <br /> Screening{" "}
                                    </button>
                            </div>
                            <div className="column-3">
                                
                                    <button className="div-15" onClick={handleRXListClick}>
                                        Rx List{" "}
                                    </button>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="div-16">
                        <div className="div-17">
                            <div className="column">
                            <button className="div-18" onClick={handle911Click}>
                                        911{" "}
                                    </button>
                                

                            </div>
                            <div className="column-4">
                            <button className="div-19" onClick={handleProfileClick}>
                                        Profile{" "}
                                    </button>
                              
                            </div>
                            <div className="column-5">
                            <button className="div-20" onClick={handleSettingsClick}>
                                        Settings{" "}
                                    </button>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PatientHomePage;