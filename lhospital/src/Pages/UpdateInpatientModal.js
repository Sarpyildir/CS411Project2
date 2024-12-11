import React, { useState } from "react";

const UpdateInpatientModal = ({ show, onClose, onUpdate, patient }) => {
	const [formData, setFormData] = useState({
		// Initialize form data with the patient's current values. if a value is changed, it will be updated in the state.
		department_id: patient[2],
		room_number: patient[3],
		status: patient[6] || "active",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onUpdate(patient[0], formData); // Pass the inpatient ID and updated data
		onClose(); // Close the modal
	};

	if (!show) return null;

	return (
		<div style={modalStyles.overlay}>
			<div style={modalStyles.modal}>
				<h2>Update Inpatient</h2>
				<form onSubmit={handleSubmit}>
					<label style={modalStyles.label}>
						Department:
						<select
							name="department_id"
							value={formData.department_id}
							onChange={handleInputChange}
							style={modalStyles.input}
							required
						>
							<option value="1">Cardiology</option>
							<option value="2">Neurology</option>
							<option value="3">Orthopedics</option>
						</select>
					</label>
					<label style={modalStyles.label}>
						Room Number:
						<select
							name="room_number"
							value={formData.room_number}
							onChange={handleInputChange}
							style={modalStyles.input}
							required
						>
							{[1, 2, 3, 4, 5].map((roomNumber) => (
								<option
									key={roomNumber}
									value={roomNumber}
								>
									Room {roomNumber}
								</option>
							))}
						</select>
					</label>
					<label style={modalStyles.label}>
						Status:
						<select
							name="status"
							value={formData.status}
							onChange={handleInputChange}
							style={modalStyles.input}
							required
						>
							<option value="active">Active</option>
							<option value="discharged">Discharged</option>
							<option value="under care">Under Care</option>
						</select>
					</label>
					<div style={modalStyles.buttonContainer}>
						<button
							type="submit"
							style={modalStyles.button}
						>
							Update
						</button>
						<button
							type="button"
							onClick={onClose}
							style={{
								...modalStyles.button,
								backgroundColor: "red",
							}}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

const modalStyles = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1000,
	},
	modal: {
		backgroundColor: "#1e1e1e",
		padding: "20px",
		borderRadius: "10px",
		width: "400px",
		textAlign: "center",
		boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
		color: "#e0e0e0",
	},
	label: {
		display: "block",
		marginBottom: "10px",
		textAlign: "left",
		fontSize: "1rem",
	},
	input: {
		width: "100%",
		padding: "10px",
		marginBottom: "10px",
		borderRadius: "5px",
		border: "1px solid #444",
		backgroundColor: "#2b2b2b",
		color: "#e0e0e0",
		fontSize: "1rem",
	},
	buttonContainer: {
		display: "flex",
		justifyContent: "space-between",
	},
	button: {
		padding: "10px 20px",
		border: "none",
		borderRadius: "5px",
		cursor: "pointer",
		backgroundColor: "#6200ea",
		color: "white",
		fontWeight: "bold",
		transition: "background-color 0.3s ease",
	},
};

export default UpdateInpatientModal;
