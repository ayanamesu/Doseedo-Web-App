// still debugging skeleton code

import * as React from "react";
import "./App.css";

const MedicationItem = ({ name, dosage }) => (
    <div className="medication-item">
        <div className="medication-name">{name}</div>
        <div className="medication-dosage">{dosage}</div>
    </div>
);

const medications = [
    { id: 1, name: 'Medication 1', dosage: '10mg' },
    { id: 2, name: 'Medication 2', dosage: '20mg' },
    { id: 3, name: 'Medication 3', dosage: '30mg' },
];

function RxListPage() {
    return (
        <>
            <div className="app-container">
                <header className="header">
                    <div className="logo">Doseedo</div>
                    <nav className="navigation">
                        <div className="nav-item">Contacts</div>
                        <div className="nav-item">Notifications</div>
                        <div className="nav-item">About Us</div>
                        <div className="nav-item sign-out-button">Sign Out</div>
                    </nav>
                </header>
                <main className="main-content">
                    <div className="columns-container">
                        <section className="column medication-actions">
                            <div className="meds-for-the-day">
                                <h2 className="section-title">Meds for <br /> the day</h2>
                                <button className="add-medication-button">Add medication</button>
                                <button className="delete-medication-button">Delete medication</button>
                            </div>
                        </section>
                        <section className="column medication-list">
                            <div className="medication-list-container">
                                <h2 className="section-title">Medication List</h2>
                                <div className="medication-list-header" />
                                <div className="medication-list-item" />
                                <div className="medication-details">
                                    <div className="medication-info-container">
                                        <div className="medication-info-columns">
                                            <div className="column prescription-info">
                                                <div className="prescription-label">
                                                    <h3 className="prescription-text">RX</h3>
                                                    <div className="prescription-underline" />
                                                </div>
                                            </div>
                                            <div className="column medication-name-info">
                                                <div className="medication-name-container">
                                                    <h3 className="medication-name-text">DOSEEDO <br />& CO.</h3>
                                                    <div className="medication-name-underline" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="medication-quantity-info">
                                        <div className="quantity-item" />
                                        <div className="quantity-item" />
                                    </div>
                                    <div className="medication-notes" />
                                </div>
                                <div className="medication-actions">
                                    <button className="cancel-button">Cancel</button>
                                    <button className="next-button">Next</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}
export default RxListPage;