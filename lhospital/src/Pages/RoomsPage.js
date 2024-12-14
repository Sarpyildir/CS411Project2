import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoomsPage = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

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
            padding: "20px",
        },
        container: {
            width: "90%",
            maxWidth: "800px",
            backgroundColor: "#1e1e1e",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            textAlign: "center",
        },
        header: {
            marginBottom: "20px",
            position: "relative",
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
        tableHeader: {
            backgroundColor: "#333",
            color: "#fff",
            textAlign: "left",
        },
        tableRow: {
            borderBottom: "1px solid #444",
        },
        tableCell: {
            padding: "10px",
            textAlign: "left",
        },
        searchContainer: {
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
        },
        searchInput: {
            padding: "10px",
            width: "60%",
            borderRadius: "5px",
            border: "1px solid #444",
            backgroundColor: "#2b2b2b",
            color: "#e0e0e0",
            fontSize: "1rem",
        },
        backButton: {
            position: "absolute",
            top: "20px",
            left: "20px",
            padding: "10px 15px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
        },
    };

    const [rooms, setRooms] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Department mapping
    const departmentMap = {
        1: "Cardiology",
        2: "Neurology",
        3: "Orthopedics",
    };

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const url =
                    process.env.REACT_APP_BACKEND_URL +
                    "inpatient/inpatients/rooms";
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setRooms(data);
                } else {
                    throw new Error("Failed to fetch rooms.");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredRooms = rooms.filter((room) =>
        `${room.room_number} ${room.department_name}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div style={styles.body}>Loading...</div>;
    }

    if (error) {
        return <div style={styles.body}>Error: {error}</div>;
    }

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <header style={styles.header}>
                    <h1 style={styles.title}>Rooms List</h1>
                    {/* Add the back button */}
                    <button
                        style={styles.backButton}
                        onClick={() => navigate("/inpatient")} // Navigate back to the InpatientPage
                    >
                        Back
                    </button>
                </header>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Department</th>
                            <th style={styles.tableHeader}>Room Number</th>
                            <th style={styles.tableHeader}>Occupied Beds</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRooms.map((room, index) => (
                            <tr key={index} style={styles.tableRow}>
                                <td style={styles.tableCell}>
                                    {departmentMap[room[1]] || "Unknown"}
                                </td>
                                <td style={styles.tableCell}>{room[2]}</td>
                                <td style={styles.tableCell}>{room[3]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoomsPage;
