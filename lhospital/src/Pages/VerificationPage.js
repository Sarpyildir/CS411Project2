import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerificationPage = () => {
	const styles = {
		body: {
			backgroundColor: "#121212",
			margin: 0,
			color: "#e0e0e0",
			fontFamily: "'Roboto', sans-serif",
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		container: {
			width: "50%",
			backgroundColor: "#1e1e1e",
			padding: "2%",
			borderRadius: "10px",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
			textAlign: "center",
		},
		input: {
			width: "100%",
			padding: "10px",
			margin: "10px 0",
			border: "1px solid #333",
			borderRadius: "5px",
			backgroundColor: "#2c2c2c",
			color: "#e0e0e0",
		},
		button: {
			padding: "10px 20px",
			border: "none",
			borderRadius: "5px",
			margin: "5px",
			cursor: "pointer",
			backgroundColor: "#6200ea",
			color: "white",
			fontWeight: "bold",
			transition: "background-color 0.3s ease",
		},
		buttonSecondary: {
			backgroundColor: "aqua",
			color: "black",
		},
	};

	const navigate = useNavigate();
	const [verificationCode, setVerificationCode] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Verification Code:", verificationCode);
		// Implement verification logic here
		navigate("/home"); // Navigate to the home page upon successful verification
	};

	const handleGoToLogin = () => {
		navigate("/");
	};

	return (
		<div style={styles.body}>
			<div style={styles.container}>
				<h2>Email Verification</h2>
				<p>Please enter the verification code sent to your email.</p>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						style={styles.input}
						placeholder="Enter verification code"
						value={verificationCode}
						onChange={(e) => setVerificationCode(e.target.value)}
					/>
					<button
						type="submit"
						style={styles.button}
					>
						Verify
					</button>
					<button
						style={{ ...styles.button, ...styles.buttonSecondary }}
						onClick={handleGoToLogin}
					>
						Go Back To Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default VerificationPage;
