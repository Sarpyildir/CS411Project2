import React, { useState } from "react";

const UpdateAdmissionModal = ({ show, onClose, onUpdate, admission }) => {
    const [formData, setFormData] = useState({
        patientName: admission.patient_name || "",
        patientSurname: admission.patient_surname || "",
        age: admission.age || "",
        gender: admission.gender || "",
        address: admission.address || "",
        contact: admission.contact || "",
        insurance: admission.insurance || "",
        departmentId: admission.department_id || "",
    });

    const departments = [
        { id: 1, name: "Cardiology" },
        { id: 2, name: "Neurology" },
        { id: 3, name: "Orthopedics" },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedAdmission = {
            patient_name: formData.patientName,
            patient_surname: formData.patientSurname,
            age: parseInt(formData.age, 10),
            gender: formData.gender,
            address: formData.address,
            contact: formData.contact,
            insurance: formData.insurance,
            department_id: parseInt(formData.departmentId, 10),
        };

        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}admission/admissions/${admission.admission_id}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedAdmission),
            });

            if (response.ok) {
                alert("Admission updated successfully.");
                updatedAdmission["admission_id"] = admission.admission_id
                updatedAdmission["government_id"] = admission.government_id
                updatedAdmission["admitted_on"] = admission.admitted_on
                onUpdate(updatedAdmission);
            } else {
                const errorData = await response.json();
                alert(`Error updating admission: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error updating admission:", error);
            alert("An error occurred while updating the admission.");
        }

        onClose(); // Close the modal after submission.
    };

    if (!show) return null;

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
        select: {
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
        cancelButton: {
            backgroundColor: "red",
        },
    };

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <h2>Update Admission</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        style={modalStyles.input}
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        required
                    />
                    <input
                        style={modalStyles.input}
                        type="text"
                        name="patientSurname"
                        value={formData.patientSurname}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        required
                    />
                    <input
                        style={modalStyles.input}
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Age"
                        required
                    />
                    <select
                        style={modalStyles.select}
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input
                        style={modalStyles.input}
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        required
                    />
                    <input
                        style={modalStyles.input}
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        placeholder="Contact Information"
                        required
                    />
                    <input
                        style={modalStyles.input}
                        type="text"
                        name="insurance"
                        value={formData.insurance}
                        onChange={handleInputChange}
                        placeholder="Insurance"
                    />
                    <select
                        style={modalStyles.select}
                        name="departmentId"
                        value={formData.departmentId}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                    <div style={modalStyles.buttonContainer}>
                        <button type="submit" style={modalStyles.button}>
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{ ...modalStyles.button, ...modalStyles.cancelButton }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAdmissionModal;
