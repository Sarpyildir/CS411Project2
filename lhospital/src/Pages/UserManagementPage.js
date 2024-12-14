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
	};

	const [users, setUsers] = useState([
		{
			id: 1,
			name: "John",
			surname: "example",
			email: "john.doe@example.com",
			role: "User",
		},
		{
			id: 2,
			name: "Jane",
			surname: "example",
			email: "jane.smith@example.com",
			role: "User",
		},
		{
			id: 3,
			name: "Alice",
			surname: "example",
			email: "alice.johnson@example.com",
			role: "User",
		},
		{
			id: 4,
			name: "Bob",
			surname: "example",
			email: "bob.brown@example.com",
			role: "User",
		},
	]);

	const handleEdit = (id) => {
		navigate(`/edit-user/${id}`);
	};

	const handleDelete = (id) => {
		setUsers(users.filter((user) => user.id !== id));
	};
	const navigate = useNavigate();
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
										onClick={() => handleEdit(user.id)}
									>
										Edit
									</button>
									<button
										style={{
											...styles.button,
											...styles.buttonDelete,
										}}
										onClick={() => handleDelete(user.id)}
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
					onClick={() => {
						handleNavigation("/home");
					}}
				>
					Back To Home
				</button>
			</div>
		</div>
	);
};

export default UserManagementPage;
