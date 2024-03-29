import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import EditEquipment from "./pages/EditEquipment";
import CheckoutCheckinPage from "./pages/CheckoutCheckinPage";
import CheckedOutHistory from './components/CheckedOutHistory';
import AuthHandler from "./components/oauth/AuthHandler";
import UserProfile from "./pages/UserProfile";
import { UserProfileProvider } from "./pages/UserProfileContext"
import { AuthProvider } from "./components/oauth/AuthContext";
import ProtectedRoute from "./components/oauth/ProtectedRoute";

function App() {
    const [userName, setUserName] = useState('');


    return (
        <AuthProvider>
            <UserProfileProvider>
                <Router>
                    <div className="site-container">
                        <header className="App-header">
                            <h1>Drone Maintenance Web Application</h1>
                        </header>
                        <NavBar userName={userName} />
                        <UserProfile onProfileLoaded={(name) => setUserName(name)} />

                        <main className="content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/equipment" element={<EquipmentList />} />
                                <Route path="/equipment/:equipmentId" element={<EquipmentDetail />} />
                                <Route path="/maintenance" element={<MaintenanceSchedule />} />
                                <Route path="/add-equipment" element={<AddEquipment />} />
                                <Route path="/add-maintenance" element={<AddMaintenance />} />
                                <Route path="/weather" element={<Weather />} />
                                <Route path="/edit-maintenance/:taskId" element={<EditMaintenanceForm />} />
                                <Route path="/edit-equipment/:equipmentId" element={<EditEquipment />} />
                                <Route path="/checkout-checkin" element={<CheckoutCheckinPage />} />
                                <Route path="/checkedout-history" element={<CheckedOutHistory />} />
                                <Route path="/auth-redirect" element={<AuthHandler />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </UserProfileProvider>
        </AuthProvider>
    );
}

export default App;
