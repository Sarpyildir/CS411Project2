import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import UpdateAdmissionModal from "./UpdateAdmissionModal"; // Import the modal component

const AdmittedPatientsPage = () => {
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
            color: "#e0e0e0",
        },
        updateButton: {
            padding: "5px 10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "#6200ea",
            color: "white",
            fontWeight: "bold",
        },
        smallButton: {
            padding: "5px 10px",
            position: "absolute",
            fontSize: "0.9rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
        },
        homeButton: {
            backgroundColor: "aqua",
            color: "black",
            left: "10px",
            top: "10px",
        },
        admissionButton: {
            backgroundColor: "#28A745",
            color: "white",
            right: "10px",
            top: "10px",
        },
    };

    const navigate = useNavigate(); // Initialize navigation

    const [admissions, setAdmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedAdmission, setSelectedAdmission] = useState(null);

    useEffect(() => {
        const fetchAdmissions = async () => {
            try {
                const url = process.env.REACT_APP_BACKEND_URL + "admission/listAdmissions";
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();

                    // Map department IDs to names
                    data.forEach((admission) => {
                        if (admission[10] === 1) {
                            admission.departmentName = "Cardiology";
                        } else if (admission[10] === 2) {
                            admission.departmentName = "Neurology";
                        } else if (admission[10] === 3) {
                            admission.departmentName = "Orthopedics";
                        }
                    });

                    setAdmissions(data);
                } else {
                    throw new Error("Failed to fetch admissions.");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmissions();
    }, []);

    const handleOpenUpdateModal = (admission) => {
        setSelectedAdmission(admission);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedAdmission(null);
    };

    const handleUpdateAdmission = (updatedAdmission) => {
        const updatedAdmissions = admissions.map((admission) =>
            admission[0] === updatedAdmission[0] ? updatedAdmission : admission
        );
        setAdmissions(updatedAdmissions);
    };

    const handleNavigateToAdmission = () => {
        navigate("/patient-admission"); // Navigate to the Patient Admission page
    };

    const handleNavigateToHome = () => {
        navigate("/home"); // Navigate to the Home page
    };

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
                    <h1 style={styles.title}>Admitted Patients</h1>
                    <button
                        style={{ ...styles.smallButton, ...styles.homeButton }}
                        onClick={handleNavigateToHome}
                    >
                        Back to Home
                    </button>
                    <button
                        style={{ ...styles.smallButton, ...styles.admissionButton }}
                        onClick={handleNavigateToAdmission}
                    >
                        Admit Patient
                    </button>
                </header>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Patient Name Surname</th>
                            <th style={styles.tableHeader}>Patient Government ID</th>
                            <th style={styles.tableHeader}>Age</th>
                            <th style={styles.tableHeader}>Gender</th>
                            <th style={styles.tableHeader}>Admission Date</th>
                            <th style={styles.tableHeader}>Insurance</th>
                            <th style={styles.tableHeader}>Department</th>
                            <th style={styles.tableHeader}>Address</th>
                            <th style={styles.tableHeader}>Contact</th>
                            <th style={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admissions.map((admission, index) => (
                            <tr key={index} style={styles.tableRow}>
                                <td style={styles.tableCell}>{`${admission[2]} ${admission[3]}`}</td>
                                <td style={styles.tableCell}>{admission[1]}</td>
                                <td style={styles.tableCell}>{admission[4]}</td>
                                <td style={styles.tableCell}>{admission[5]}</td>
                                <td style={styles.tableCell}>{admission[8]}</td>
                                <td style={styles.tableCell}>{admission[9]}</td>
                                <td style={styles.tableCell}>{admission.departmentName}</td>
                                <td style={styles.tableCell}>{admission[7]}</td>
                                <td style={styles.tableCell}>{admission[6]}</td>
                                <td style={styles.tableCell}>
                                    <button
                                        style={styles.updateButton}
                                        onClick={() => handleOpenUpdateModal(admission)}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showUpdateModal && (
                <UpdateAdmissionModal
                    show={showUpdateModal}
                    onClose={handleCloseUpdateModal}
                    onUpdate={handleUpdateAdmission}
                    admission={selectedAdmission}
                />
            )}
        </div>
    );
};

export default AdmittedPatientsPage;
