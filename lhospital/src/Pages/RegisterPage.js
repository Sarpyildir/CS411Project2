import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
	const styles = {
		body: {
			backgroundColor: "#121212",
			margin: 0,
			color: "#e0e0e0",
			fontFamily: "'Roboto', sans-serif",
			height: "100%",
		},
		container: {
			width: "100%",
			padding: "2% 0",
			textAlign: "center",
		},
		form: {
			width: "50%",
			margin: "2.5% auto",
			backgroundColor: "#1e1e1e",
			padding: "2%",
			borderRadius: "10px",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
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
		name: "",
		surname: "",
		password: "",
		email: "",
		role: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = process.env.REACT_APP_BACKEND_URL + "register/register"

		const response = await fetch(url, {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(formData)
		})

		if (!response.ok) {
			const data = await response.json()
            alert(data.detail)
			return
        }

		navigate("/");
	};
	const handleGoToLogin = () => {
		navigate("/");
	};
	return (
		<div style={styles.body}>
			<div style={styles.container}>
				<h2>Login</h2>
				<p>Please fill in this form to login to your account.</p>
				<hr style={{ width: "80%", border: "1px solid #333" }} />
			</div>
			<form
				style={styles.form}
				onSubmit={handleSubmit}
			>
				<div style={styles.formGroup}>
					<label
						style={styles.label}
						htmlFor="name"
					>
						Name:
					</label>
					<input
						style={styles.input}
						type="text"
						id="name"
						name="name"
						placeholder="Enter name"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>
				<div style={styles.formGroup}>
					<label
						style={styles.label}
						htmlFor="surname"
					>
						Surname:
					</label>
					<input
						style={styles.input}
						type="text"
						id="surname"
						name="surname"
						placeholder="Enter surname"
						value={formData.surname}
						onChange={handleChange}
					/>
				</div>
				<div style={styles.formGroup}>
					<label
						style={styles.label}
						htmlFor="email"
					>
						Email:
					</label>
					<input
						style={styles.input}
						type="email"
						id="email"
						name="email"
						placeholder="Enter email"
						value={formData.email}
						onChange={handleChange}
					/>
				</div>
				<div style={styles.formGroup}>
					<label
						style={styles.label}
						htmlFor="password"
					>
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
				<div style={styles.formGroup}>
					<label
						style={styles.label}
						htmlFor="role"
					>
						Role:
					</label>
					<select
						style={styles.input}
						id="role"
						name="role"
						value={formData.role}
						onChange={handleChange}
					>
						<option value="user">User</option>
						<option value="admin">Admin</option>
					</select>
				</div>

				<button
					type="submit"
					style={{ ...styles.button, ...styles.btnLogin }}
				>
					Register
				</button>
			</form>
			<div style={styles.form}>
				<button
					style={{ ...styles.button, ...styles.btnRegister }}
					onClick={handleGoToLogin}
				>
					Go to Login
				</button>
			</div>
		</div>
	);
};

export default RegisterPage;
