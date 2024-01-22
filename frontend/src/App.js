import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EquipmentList from './pages/EquipmentList';
import MaintenanceSchedule from './pages/MaintenanceSchedule';
import NavBar from './components/NavBar';
import EquipmentDetail from './components/EquipmentDetail';
import AddEquipment from './pages/AddEquipment';
import AddMaintenance from './pages/AddMaintenance';
import EditMaintenanceForm from "./pages/EditMaintenanceForm";
import Footer from './components/Footer';
import Weather from "./pages/Weather";
import './App.css';


function App() {
    return (
        <Router>
            <div className="site-container"> {/* Use a class that will be styled to handle layout */}
                <header className="App-header">
                    <h1>Drone Maintenance Web Application</h1>
                </header>
                <NavBar />
                <main className="content"> {/* Main content wrapper */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/equipment" element={<EquipmentList />} />
                        <Route path="/equipment/:equipmentId" element={<EquipmentDetail />} />
                        <Route path="/maintenance" element={<MaintenanceSchedule />} />
                        <Route path="/add-equipment" element={<AddEquipment />} />
                        <Route path="/add-maintenance" element={<AddMaintenance />} />
                        <Route path="/weather" element={<Weather />} />
                        <Route path="/edit-maintenance/:taskId" element={<EditMaintenanceForm />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;


