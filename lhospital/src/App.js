import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/HomePage";
import VerificationPage from "./Pages/VerificationPage";
import PatientAdmissionPage from "./Pages/PatientAdmissionPage";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<LoginPage />}
			/>
			<Route
				path="/register"
				element={<RegisterPage />}
			/>
			<Route
				path="/home"
				element={<HomePage />}
			/>
			<Route
				path="/verify"
				element={<VerificationPage />}
			/>
			<Route
				path="/patient-admission"
				element={<PatientAdmissionPage />}
			/>
		</Routes>
	);
}

export default App;
