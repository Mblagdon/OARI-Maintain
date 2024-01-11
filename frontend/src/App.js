import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EquipmentList from './pages/EquipmentList';
import MaintenanceSchedule from './pages/MaintenanceSchedule';
import NavBar from './components/NavBar';

function App() {
    return (
        <Router>
            <div>
                <h1>Drone Maintenance</h1>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/equipment" element={<EquipmentList />} />
                    <Route path="/maintenance" element={<MaintenanceSchedule />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;


