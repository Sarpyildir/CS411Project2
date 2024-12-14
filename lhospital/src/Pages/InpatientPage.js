import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateInpatientModal from "./UpdateInpatientModal";

const InpatientPage = () => {
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
			maxWidth: "1200px",
			backgroundColor: "#1e1e1e",
			borderRadius: "10px",
			padding: "2%",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
			textAlign: "center",
			position: "absolute",
			top: "50px",
			bottom: "50px",
		},
		scrollable: {
			overflowY: "scroll",
			height: "calc(50vh)",
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
			marginBottom: "20px",
		},
		label: {
			marginTop: "10px",
			alignSelf: "flex-start",
			color: "#a0a0a0",
			fontSize: "1rem",
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
		lessWidthInput: {
			width: "40%",
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
        buttonRooms: {
			backgroundColor: "#4caf50",
			color: "white",
			fontWeight: "bold",
			margin: "0 10px",
			padding: "10px 20px",
			borderRadius: "5px",
			border: "none",
			cursor: "pointer",
		},
		buttonContainer: {
			display: "flex",
			width: "100%",
			justifyContent: "space-evenly",
		},
		buttonDischarge: {
			padding: "10px 20px",
			border: "none",
			margin: "5px",
			marginLeft: "10px",
			borderRadius: "5px",
			cursor: "pointer",
			backgroundColor: "#6200ea",
			color: "white",
			fontWeight: "bold",
			transition: "background-color 0.3s ease",
		},
		impatientBg: {
			backgroundColor: "#1e1e1e",
			borderRadius: "10px",
			padding: "2%",
			margin: "10px 0",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			flexDirection: "row",
			textAlign: "left",
		},
	};

	useEffect(() => {
		const fetchInpatients = async () => {
			const controller = new AbortController();
			const signal = controller.signal;

			try {
				const url =
					process.env.REACT_APP_BACKEND_URL + "inpatient/inpatients/";
				const response = await fetch(url, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
					signal,
				});
				if (response.ok) {
					const data = await response.json();
					setPatients(data);
					console.log(data);
				} else {
					console.error("Failed to fetch inpatients.");
				}
			} catch (error) {
				if (error.name === "AbortError") {
					console.log("Fetch aborted");
				} else {
					console.error("Error fetching inpatients:", error);
				}
			}

			return () => controller.abort(); // Cleanup on unmount
		};

		fetchInpatients();
	}, []);

	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [selectedPatient, setSelectedPatient] = useState(null);

	const [patients, setPatients] = useState([]);
	const [newPatient, setNewPatient] = useState({
		government_id: null,
		room_number: null,
	});
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");
	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	// filter patients based on search query. name surname is colelcted in one string using patient[9] and patient[10]
	const filteredPatients = patients.filter((patient) => {
		const roomNumber = String(patient[3] || "").toLowerCase(); // Convert room number to string
		const firstName = String(patient[9] || "").toLowerCase(); // Convert first name to string
		const lastName = String(patient[10] || "").toLowerCase(); // Convert last name to string
		const searchTerm = searchQuery.toLowerCase(); // Convert the search term to lowercase

		return (
			roomNumber.includes(searchTerm) || // Match room number
			`${firstName} ${lastName}`.includes(searchTerm) // Match full name
		);
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewPatient({ ...newPatient, [name]: value });
	};

	const handleAddPatient = async () => {
		if (!newPatient.government_id) {
			alert("Please enter government id of the patient");
			return;
		}

		try {
			const response = await fetch(
				process.env.REACT_APP_BACKEND_URL + "inpatient/inpatients/",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						government_id: newPatient.government_id,
						room_number: newPatient.room_number,
					}),
				}
			);

			if (response.ok) {
				const data = await response.json();
				console.log("data after add:", data);
				setNewPatient({
					government_id: null,
					room_number: null,
				});
				alert("Inpatient added successfully");
				window.location.reload();
			} else {
				const error = await response.json();
				alert(`Error: ${error.detail || "Failed to add inpatient"}`);
			}
		} catch (error) {
			console.error("Error adding inpatient:", error);
			alert("An error occurred while adding the inpatient.");
		}
	};

	const handleOpenUpdateModal = (patient) => {
		setSelectedPatient(patient);
		setShowUpdateModal(true);
	};

	const handleCloseUpdateModal = () => {
		setSelectedPatient(null);
		setShowUpdateModal(false);
	};

    const handleNavigateToRoomsPage = () => {
		navigate("inpatients/rooms"); // Navigate to the RoomsPage
	};


	const handleUpdate = (inpatientId, updatedData) => {
		updatedData.room_number = parseInt(updatedData.room_number);

		console.log("data to be : ", updatedData);

		const url =
			process.env.REACT_APP_BACKEND_URL +
			`inpatient/inpatients/update_department_room_status/${inpatientId}`;
		fetch(url, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedData),
		})
			.then(async (response) => {
				const responseData = await response.json();
				console.log("res data : ", responseData);
				if (responseData.error) {
					alert("Failed to update inpatient. " + responseData.error);
				} else {
					alert("Inpatient updated successfully.");
					setPatients((prev) =>
						prev.map((p) =>
							p[0] === inpatientId ? { ...p, ...updatedData } : p
						)
					);
					window.location.reload();
				}
			})
			.catch((error) =>
				console.error("Error updating inpatient:", error)
			);
	};

	const handleDischargePatient = async (index) => {
		const patientToDischarge = patients[index];

		const patientId = patientToDischarge[0]; // Extract the ID from the specific index

		console.log("Patient to discharge:", patientToDischarge);
		console.log("Extracted ID:", patientId);

		if (!patientId) {
			alert("Patient ID not found");
			return;
		}

		try {
			const url =
				process.env.REACT_APP_BACKEND_URL +
				`inpatient/inpatients/discharge/${patientId}`;
			const response = await fetch(url, { method: "PUT" });

			if (response.ok) {
				setPatients(patients.filter((_, i) => i !== index)); // Remove the discharged patient
				alert("Patient discharged successfully.");
			} else {
				const error = await response.json();
				alert(
					`Error: ${error.detail || "Failed to discharge patient"}`
				);
			}
		} catch (error) {
			console.error("Error discharging patient:", error);
			alert("An error occurred while discharging the patient.");
		}
	};

	const handleCancel = () => {
		navigate("/home");
	};

	const dischargePatientButton = (index) => {
		return (
			<button
				style={styles.buttonDischarge}
				onClick={() => handleDischargePatient(index)} // Use index here
			>
				Discharge
			</button>
		);
	};

	return (
		<div style={styles.body}>
			<div style={styles.container}>
				<header style={styles.header}>
					<h1 style={styles.title}>Inpatient Module</h1>
					<p style={{ color: "#a0a0a0" }}>
						Monitor Hospitalized Patients
					</p>
				</header>
				<div style={styles.form}>
					<input
						style={styles.fullWidthInput}
						type="text"
						name="government_id"
						placeholder="Patient Government ID"
						value={newPatient.government_id}
						onChange={handleInputChange}
					/>
					<input
						style={styles.fullWidthInput}
						type="text"
						name="room_number"
						placeholder="Room Number"
						value={newPatient.room}
						onChange={handleInputChange}
					/>
					<div style={styles.buttonContainer}>
						<button
							style={styles.buttonRegister}
							onClick={handleAddPatient}
						>
							Add Patient
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
                        <button
							style={styles.buttonRooms}
							onClick={handleNavigateToRoomsPage}
						>
							View Rooms
						</button>
					</div>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						width: "90%",
						justifySelf: "center",
					}}
				>
					<h2 style={styles.title}>Current Patients</h2>
					<input
						style={styles.lessWidthInput}
						type="text"
						placeholder="Search by Name or Room"
						value={searchQuery}
						onChange={handleSearchChange}
					/>
				</div>
				<div style={styles.scrollable}>
					<ul>
						{filteredPatients.map((patient, index) => (
							<li
								key={patient[0] || index}
								style={styles.impatientBg}
							>
								<p>
									<strong>ID:</strong> {patient[0]} <br />
									<strong>Name:</strong>{" "}
									{patient[9] + " " + patient[10]} <br />
									<strong>Department:</strong> {patient[18]}{" "}
									<br />
									<strong>Room:</strong> {patient[3]} <br />
									<strong>Status:</strong> {patient[6]}
								</p>
								{dischargePatientButton(index)}
								{/* Add the Update button */}
								<button
									style={styles.buttonDischarge}
									onClick={() =>
										handleOpenUpdateModal(patient)
									}
								>
									Update
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Render the modal */}
			{showUpdateModal && (
				<UpdateInpatientModal
					show={showUpdateModal}
					onClose={handleCloseUpdateModal}
					onUpdate={handleUpdate}
					patient={selectedPatient}
				/>
			)}
		</div>
	);
};

export default InpatientPage;
