// still debugging skeleton code
import * as React from "react";

function PatientHomePage() {
    return (
        <>
            <div className="div">
                <div className="div-2">
                    <div className="div-3">Doseedo</div>
                    <div className="div-4">
                        <div className="div-5">Contacts</div>
                        <div className="div-6">Notifications</div>
                        <div className="div-7">About Us</div>
                        <div className="div-8">Sign Out</div>
                    </div>
                </div>
                <div className="div-9">
                    <div className="div-10">April 7th, 2024</div>
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/221c393dfba4a2642662278dc448772db699328c927f41fa532004df96eee0b9?apiKey=fed26b027e8440e388870d08a2f64afd&" className="img" />
                    <div className="div-11">
                        <div className="div-12">
                            <div className="column">
                                <a href="/calendar">
                                    <div className="div-13">Calendar</div>
                                </a>
                            </div>
                            <div className="column-2">
                                <a href="/health-screening">
                                    <div className="div-14">
                                        {" "}
                                        Health <br /> Screening{" "}
                                    </div>
                                </a>
                            </div>
                            <div className="column-3">
                                <a href="/rx-list">
                                    <div className="div-15">Rx List</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="div-16">
                        <div className="div-17">
                            <div className="column">
                                <a href="/emergency">
                                    <div className="div-18">911</div>
                                </a>
                            </div>
                            <div className="column-4">
                                <a href="/profile">
                                    <div className="div-19">Profile</div>
                                </a>
                            </div>
                            <div className="column-5">
                                <a href="/settings">
                                    <div className="div-20">Settings</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PatientHomePage;