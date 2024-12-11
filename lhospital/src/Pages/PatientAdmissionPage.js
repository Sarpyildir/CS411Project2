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

	const departments = [
        { id: 1, name: "Cardiology" },
        { id: 2, name: "Neurology" },
        { id: 3, name: "Pediatrics" },
        { id: 4, name: "Oncology" },
        { id: 5, name: "Orthopedics" },
    ];

	const [formData, setFormData] = useState({
		patient_name: "",
		patient_surname: "",
		age: 0,
		gender: "",
		contact: "",
		address: "",
		government_id: 0,
		insurance: "",
		department_id: "",
		admitted_on: "10/10/2000"
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = process.env.REACT_APP_BACKEND_URL + "admission/admitAdmission"

		const result = await fetch(url, {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(formData)
		})

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
						htmlFor="patient_name"
					>
						First Name:
					</label>
					<input
						style={styles.fullWidthInput}
						type="text"
						id="patient_name"
						name="patient_name"
						value={formData.firstName}
						onChange={handleChange}
						required
					/>

					<label
						style={styles.label}
						htmlFor="patient_surname"
					>
						Last Name:
					</label>
					<input
						style={styles.fullWidthInput}
						type="text"
						id="patient_surname"
						name="patient_surname"
						value={formData.lastName}
						onChange={handleChange}
						required
					/>

					<label
						style={styles.label}
						htmlFor="age"
					>
						Age:
					</label>
					<input
						style={styles.fullWidthInput}
						type="number"
						id="age"
						name="age"
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
						htmlFor="government_id"
					>
						Government ID:
					</label>
					<input
						style={styles.fullWidthInput}
						type="number"
						id="government_id"
						name="government_id"
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
					<label style={styles.label} htmlFor="department">
                        Department:
                    </label>
                    <select
                        style={styles.fullWidthInput}
						type="number"
                        id="department_id"
                        name="department_id"
                        value={formData.department_id}
                        onChange={handleChange}
                        required
                        >
                        <option value="" disabled>
                            Select Department
                        </option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
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
