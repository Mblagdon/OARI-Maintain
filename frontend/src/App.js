import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EquipmentList from './pages/EquipmentList';
import MaintenanceSchedule from './pages/MaintenanceSchedule';
import NavBar from './components/NavBar';
import EquipmentDetail from './components/EquipmentDetail';
import AddEquipment from './pages/AddEquipment';
import AddMaintenance from "./pages/AddMaintenance";
import './App.css';


function App() {
    return (
        <Router>
            <div>
                <h1 className="App-header">Drone Maintenance Web Application</h1>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/equipment" element={<EquipmentList />} />
                    <Route path="/equipment/:equipmentId" element={<EquipmentDetail />} />
                    <Route path="/maintenance" element={<MaintenanceSchedule />} />
                    <Route path="/add-equipment" element={<AddEquipment />} />
                    <Route path="/add-maintenance" element={<AddMaintenance />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;


