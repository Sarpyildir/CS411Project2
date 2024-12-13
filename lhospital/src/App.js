import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/HomePage";
import VerificationPage from "./Pages/VerificationPage";
import PatientAdmissionPage from "./Pages/PatientAdmissionPage";
import InpatientPage from "./Pages/InpatientPage";
import AdmittedPatientsPage from "./Pages/AdmittedPatientsPage";
import ProfilePage from "./Pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
            <Route path="/verify" element={<PrivateRoute element={<VerificationPage />} />} />
            <Route path="/patient-admission" element={<PrivateRoute element={<PatientAdmissionPage />} />} />
            <Route path="/admitted-admissions" element={<PrivateRoute element={<AdmittedPatientsPage />} />} />
            <Route path="/inpatient" element={<PrivateRoute element={<InpatientPage />} />} />
            <Route path="/admitted-patients" element={<PrivateRoute element={<AdmittedPatientsPage />} />} />
            <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
        </Routes>
    );
}

export default App;
