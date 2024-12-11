import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const styles = {
		body: {
			backgroundColor: "#121212",
			margin: 0,
			color: "#e0e0e0",
			fontFamily: "'Roboto', sans-serif",
			minHeight: "100vh",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
		},
		container: {
			width: "90%",
			maxWidth: "800px",
			backgroundColor: "#1e1e1e",
			borderRadius: "10px",
			padding: "2%",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
			textAlign: "center",
		},
		header: {
			marginBottom: "20px",
		},
		title: {
			fontSize: "2rem",
			margin: "10px 0",
		},
		subtitle: {
			fontSize: "1.2rem",
			color: "#a0a0a0",
		},
		button: {
			padding: "10px 20px",
			margin: "10px",
			border: "none",
			borderRadius: "5px",
			cursor: "pointer",
			transition: "background-color 0.3s ease",
			fontWeight: "bold",
		},
		btnPrimary: {
			backgroundColor: "#6200ea",
			color: "white",
		},
		btnSecondary: {
			backgroundColor: "aqua",
			color: "black",
		},
	};
	const navigate = useNavigate();
	const handlePatientAdmissionRedirection = () => {
		navigate("/admitted-patients");
	};
	const handleInpatientRedirection = () => {
		navigate("/inpatient");
	};

	return (
		<div style={styles.body}>
			<div style={styles.container}>
				<header style={styles.header}>
					<h1 style={styles.title}>
						Welcome to the L'Hospital Software
					</h1>
					<p style={styles.subtitle}>
						Explore our features and manage your account here.
					</p>
				</header>
				<div>
					<button
						style={{ ...styles.button, ...styles.btnPrimary }}
						onClick={handlePatientAdmissionRedirection}
					>
						Patient Admission Module
					</button>
					<button
						style={{ ...styles.button, ...styles.btnPrimary }}
						onClick={handleInpatientRedirection}
					>
						Inpatient Module
					</button>
					<button
						style={{ ...styles.button, ...styles.btnSecondary }}
					>
						View Profile
					</button>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
