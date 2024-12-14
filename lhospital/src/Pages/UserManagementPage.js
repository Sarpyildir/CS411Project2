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

	const [users, setUsers] = useState([]);
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
				console.log(data);
				setUsers(data);
			} catch (error) {
				console.log("error", error);
			}
		};

		fetchUsers();
	}, []);

	const handleEdit = (id) => {
		navigate(`/edit-user/${id}`);
	};

	const handleDelete = async (id) => {
		const selectedUser = users.find((user) => user.id === id);
		const email = selectedUser.email;
		console.log("id, email: ", id, email);
		console.log("selected uder to be deleted: ", selectedUser);

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
			console.log(data);
			setUsers(users.filter((user) => user.id !== id));
		} catch (error) {
			console.log("error", error);
		}
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
