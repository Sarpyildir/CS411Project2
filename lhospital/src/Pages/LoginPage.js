import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const styles = {
		body: {
			backgroundColor: "#121212",
			margin: 0,
			color: "#e0e0e0",
			fontFamily: "'Roboto', sans-serif",
			height: "100vh",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
		},
		imageContainer: {
			width: "50%",
			display: "flex",
			justifyContent: "center",
			marginBottom: "20px",
		},
		image: {
			width: "25%",
			maxWidth: "200px",
			borderRadius: "10px",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
		},
		container: {
			width: "90%",
			maxWidth: "500px",
			backgroundColor: "#1e1e1e",
			padding: "2%",
			borderRadius: "10px",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			textAlign: "center",
		},
		form: {
			width: "100%",
			marginBottom: "20px",
		},
		formGroup: {
			marginBottom: "15px",
		},
		label: {
			display: "block",
			marginBottom: "5px",
			fontWeight: "bold",
		},
		input: {
			width: "100%",
			padding: "10px",
			border: "1px solid #333",
			borderRadius: "5px",
			backgroundColor: "#2c2c2c",
			color: "#e0e0e0",
			boxSizing: "border-box",
		},
		button: {
			padding: "10px 20px",
			border: "none",
			borderRadius: "5px",
			cursor: "pointer",
			transition: "background-color 0.3s ease",
			width: "100%",
			marginTop: "10px",
		},
		btnLogin: {
			backgroundColor: "#6200ea",
			fontWeight: "bold",
			color: "white",
		},
		btnRegister: {
			backgroundColor: "aqua",
			color: "black",
			fontWeight: "bold",
		},
	};

	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = process.env.REACT_APP_BACKEND_URL + "login/login";

		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		if (!response.ok) {
			alert("Wrong password or email!");
			return;
		}

		localStorage.setItem("email", formData.email);
		navigate("/verify");
	};

	const handleGoToRegister = () => {
		navigate("/register");
	};

	return (
		<div style={styles.body}>
			{/* Render the image at the top */}
			<div style={styles.imageContainer}>
				<img src="/lslogo.png" alt="Login Banner" style={styles.image} />
			</div>
			<div style={styles.container}>
                <h2>Welcome to L'Hospital Software</h2>
				<h2>Login</h2>
				<p>Please fill in this form to login to your account.</p>
				<form style={styles.form} onSubmit={handleSubmit}>
					<div style={styles.formGroup}>
						<label style={styles.label} htmlFor="email">
							Email:
						</label>
						<input
							style={styles.input}
							type="text"
							id="email"
							name="email"
							placeholder="Enter email"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
					<div style={styles.formGroup}>
						<label style={styles.label} htmlFor="password">
							Password:
						</label>
						<input
							style={styles.input}
							type="password"
							id="password"
							name="password"
							placeholder="Enter password"
							value={formData.password}
							onChange={handleChange}
						/>
					</div>
					<button
						type="submit"
						style={{ ...styles.button, ...styles.btnLogin }}
					>
						Login
					</button>
				</form>
				<button
					style={{ ...styles.button, ...styles.btnRegister }}
					onClick={handleGoToRegister}
				>
					Go To Register
				</button>
			</div>
		</div>
	);
};

export default LoginPage;
