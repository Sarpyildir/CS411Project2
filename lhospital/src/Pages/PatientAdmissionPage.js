import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientAdmission = () => {
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
		form: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		label: {
			marginTop: "10px",
			alignSelf: "flex-start",
			color: "#a0a0a0",
			fontSize: "1rem",
		},
		row: {
			display: "flex",
			justifyContent: "space-between",
			width: "100%",
		},
		input: {
			width: "48%",
			padding: "10px",
			marginTop: "5px",
			borderRadius: "5px",
			border: "1px solid #444",
			backgroundColor: "#2b2b2b",
			color: "#e0e0e0",
			fontSize: "1rem",
		},
		fullWidthInput: {
			width: "100%",
			padding: "10px",
			marginTop: "5px",
			borderRadius: "5px",
			border: "1px solid #444",
			backgroundColor: "#2b2b2b",
			color: "#e0e0e0",
			fontSize: "1rem",
			boxSizing: "border-box",
		},
		buttonRegister: {
			padding: "10px 20px",
			marginTop: "20px",
			border: "none",
			borderRadius: "5px",
			cursor: "pointer",
			backgroundColor: "#6200ea",
			color: "white",
			fontWeight: "bold",
			transition: "background-color 0.3s ease",
		},
		buttonCancel: {
			backgroundColor: "aqua",
			color: "black",
		},
		buttonContainer: {
			display: "flex",
			width: "100%",
			justifyContent: "space-evenly",
		},
	};

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		dob: "",
		gender: "",
		contact: "",
		address: "",
		nationalID: "",
		insurance: "",
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Patient Data Submitted: ", formData);
	};

	const handleCancel = () => {
		navigate("/home");
	};

	return (
		<div style={styles.body}>
			<div style={styles.container}>
				<header style={styles.header}>
					<h1 style={styles.title}>Patient Admission</h1>
					<p style={{ color: "#a0a0a0" }}>
						Register a new patient in the system.
					</p>
				</header>
				<form
					style={styles.form}
					onSubmit={handleSubmit}
				>
					<label
						style={styles.label}
						htmlFor="firstName"
					>
						First Name:
					</label>
					<input
						style={styles.fullWidthInput}
						type="text"
						id="firstName"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						required
					/>
					<label
						style={styles.label}
						htmlFor="middleName"
					>
						Middle Name (Optional):
					</label>
					<input
						style={styles.fullWidthInput}
						type="text"
						id="middleName"
						name="middleName"
						value={formData.middleName}
						onChange={handleChange}
					/>

					<label
						style={styles.label}
						htmlFor="lastName"
					>
						Last Name:
					</label>
					<input
						style={styles.fullWidthInput}
						type="text"
						id="lastName"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						required
					/>

					<label
						style={styles.label}
						htmlFor="dob"
					>
						Date of Birth:
					</label>
					<input
						style={styles.fullWidthInput}
						type="date"
						id="dob"
						name="dob"
						value={formData.dob}
						onChange={handleChange}
						required
					/>

					<label
						style={styles.label}
						htmlFor="gender"
					>
						Gender:
					</label>
					<select
						style={styles.fullWidthInput}
						id="gender"
						name="gender"
						value={formData.gender}
						onChange={handleChange}
						required
					>
						<option
							value=""
							disabled
						>
							Select Gender
						</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Gender Fluid">Gender Fluid</option>
						<option value="Attack Helicopter">
							Attack Helicopter
						</option>
					</select>

					<label
						style={styles.label}
						htmlFor="contact"
					>
						Contact Information:
					</label>
					<input
						style={styles.fullWidthInput}
						type="tel"
						id="contact"
						name="contact"
						value={formData.contact}
						onChange={handleChange}
						required
					/>

					<label
						style={styles.label}
						htmlFor="address"
					>
						Address:
					</label>
					<input
						style={styles.fullWidthInput}
						type="text"
						id="address"
						name="address"
						value={formData.address}
						onChange={handleChange}
						required
					/>

					<label
						style={styles.label}
						htmlFor="nationalID"
					>
						National ID:
					</label>
					<input
						style={styles.fullWidthInput}
						type="text"
						id="nationalID"
						name="nationalID"
						value={formData.nationalID}
						onChange={handleChange}
						required
					/>

					<label
						style={styles.label}
						htmlFor="insurance"
					>
						Insurance Details:
					</label>
					<input
						style={styles.fullWidthInput}
						type="text"
						id="insurance"
						name="insurance"
						value={formData.insurance}
						onChange={handleChange}
					/>
					<div style={styles.buttonContainer}>
						<button
							type="submit"
							style={styles.buttonRegister}
						>
							Register Patient
						</button>
						<button
							style={{
								...styles.buttonRegister,
								...styles.buttonCancel,
							}}
							onClick={handleCancel}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PatientAdmission;
