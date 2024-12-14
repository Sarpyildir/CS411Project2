import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserManagementPage = () => {
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
		title: {
			fontSize: "2rem",
			margin: "10px 0",
		},
		table: {
			width: "100%",
			borderCollapse: "collapse",
			marginTop: "20px",
		},
		th: {
			backgroundColor: "#333",
			color: "#fff",
			padding: "10px",
			textAlign: "left", // Center-align header text
			width: "25%", // Adjust column width
		},
		td: {
			padding: "10px",
			textAlign: "left", // Center-align cell text
			borderBottom: "1px solid #444",
		},

		button: {
			padding: "5px 10px",
			margin: "5px",
			border: "none",
			borderRadius: "5px",
			cursor: "pointer",
			color: "white",
			fontWeight: "bold",
		},
		buttonEdit: {
			backgroundColor: "#6200ea",
		},
		buttonDelete: {
			backgroundColor: "#e53935",
		},
		homeButton: {
			marginTop: "10px",
			padding: "10px",
			fontSize: "0.9rem",
			border: "none",
			borderRadius: "5px",
			cursor: "pointer",
			fontWeight: "bold",
			backgroundColor: "#007BFF",
			color: "white",
		},
		modalOverlay: {
			position: "fixed",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		modalContent: {
			width: "90%",
			maxWidth: "600px",
			backgroundColor: "#1e1e1e",
			padding: "2%",
			borderRadius: "10px",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
			textAlign: "center",
		},
		formGroup: {
			marginBottom: "15px",
			textAlign: "left",
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
		buttonSave: {
			backgroundColor: "#4caf50",
		},
		buttonCancel: {
			backgroundColor: "#e53935",
		},
	};

	const [users, setUsers] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [editingUser, setEditingUser] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const url =
					process.env.REACT_APP_BACKEND_URL +
					"user_management/get_all";
				const response = await fetch(url, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				});

				const data = await response.json();
				setUsers(data);
			} catch (error) {
				console.log("error", error);
			}
		};

		fetchUsers();
	}, []);

	const handleEdit = (user) => {
		setEditingUser(user);
		setShowModal(true);
	};
	const handleModalClose = () => {
		setShowModal(false);
		setEditingUser(null);
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditingUser({ ...editingUser, [name]: value });
	};
	const handleSave = async () => {
		try {
			const url = `${process.env.REACT_APP_BACKEND_URL}user_management/update/${editingUser.id}`;
			await fetch(url, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(editingUser),
			});

			setUsers((prevUsers) =>
				prevUsers.map((user) =>
					user.id === editingUser.id ? editingUser : user
				)
			);
			handleModalClose();
		} catch (error) {
			console.error("Error updating user:", error);
		}
	};

	const handleDelete = async (selectedUser) => {
		const id = selectedUser.id;
		const email = selectedUser.email;
		try {
			const url =
				process.env.REACT_APP_BACKEND_URL +
				"user_management/delete/" +
				id +
				"/" +
				email;
			const response = await fetch(url, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});
			const data = await response.json();
			setUsers(users.filter((user) => user.id !== id));
		} catch (error) {
			console.log("error", error);
		}
	};

	const handleNavigation = (toPath) => {
		navigate(toPath);
	};

	return (
		<div style={styles.body}>
			<div style={styles.container}>
				<h1 style={styles.title}>User Management</h1>
				<table style={styles.table}>
					<thead>
						<tr>
							<th style={styles.th}>ID</th>
							<th style={styles.th}>Name</th>
							<th style={styles.th}>Email</th>
							<th style={styles.th}>Role</th>
							<th style={styles.th}>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id}>
								<td style={styles.td}>{user.id}</td>
								<td style={styles.td}>
									{user.name + " " + user.surname}
								</td>
								<td style={styles.td}>{user.email}</td>
								<td style={styles.td}>{user.role}</td>
								<td style={styles.td}>
									<button
										style={{
											...styles.button,
											...styles.buttonEdit,
										}}
										onClick={() => handleEdit(user)}
									>
										Edit
									</button>
									<button
										style={{
											...styles.button,
											...styles.buttonDelete,
										}}
										onClick={() => handleDelete(user)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<button
					style={{ ...styles.homeButton }}
					onClick={() => handleNavigation("/home")}
				>
					Back To Home
				</button>
			</div>

			{showModal && (
				<div style={styles.modalOverlay}>
					<div style={styles.modalContent}>
						<h2>Edit User</h2>
						<form>
							<div style={styles.formGroup}>
								<label style={styles.label}>Name:</label>
								<input
									style={styles.input}
									type="text"
									name="name"
									value={editingUser.name}
									onChange={handleChange}
								/>
							</div>
							<div style={styles.formGroup}>
								<label style={styles.label}>Surname:</label>
								<input
									style={styles.input}
									type="text"
									name="surname"
									value={editingUser.surname}
									onChange={handleChange}
								/>
							</div>
							<div style={styles.formGroup}>
								<label style={styles.label}>Email:</label>
								<input
									style={styles.input}
									type="email"
									name="email"
									value={editingUser.email}
									onChange={handleChange}
								/>
							</div>
							<div style={styles.formGroup}>
								<label style={styles.label}>Role:</label>
								<select
									style={styles.input}
									name="role"
									value={editingUser.role}
									onChange={handleChange}
								>
									<option value="user">User</option>
									<option value="admin">Admin</option>
								</select>
							</div>
						</form>
						<button
							style={{ ...styles.button, ...styles.buttonSave }}
							onClick={handleSave}
						>
							Save
						</button>
						<button
							style={{ ...styles.button, ...styles.buttonCancel }}
							onClick={handleModalClose}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserManagementPage;
