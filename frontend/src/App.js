import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EquipmentList from './pages/EquipmentList';
import MaintenanceSchedule from './pages/MaintenanceSchedule';
import MaintenanceForm from './pages/MaintenanceForm';
import NavBar from './components/NavBar';
import './App.css';


function App() {
    return (
        <Router>
            <div>
                <h1>Drone Maintenance Web Application</h1>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} exact />
                    <Route path="/equipment" element={<EquipmentList />} exact />
                    <Route path="/maintenance" element={<MaintenanceSchedule />} exact />
                    <Route path="/add-maintenance" element={<MaintenanceForm />} exact />
                </Routes>
            </div>
        </Router>
    );
}

export default App;


