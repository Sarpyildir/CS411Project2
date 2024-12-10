import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            bottom : "50px",
        },
        scrollable:{
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
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            textAlign: "left",
        }
            
    };

    useEffect(async () => {
        const url = "http://localhost:9000/admission/listAdmissions"

		const result = await fetch(url, {
			method: "GET",
			headers: {'Content-Type': 'application/json'}
		}).then((response) => response.json())
        .then((data) => console.log(data))
    })

    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({ name: '', room: '', payment: {amount: 0, account: ""}, care: [] });
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.room.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPatient({ ...newPatient, [name]: value });
    };

    const handleAddPatient = () => {
        if (!newPatient.name) {
            alert("Please enter a name");
            return;
        }
        setPatients([...patients, newPatient]);
        setNewPatient({ name: '', room: '', payment: {amount: 0, account: ""}, care: [] });
    };

    const handleCancel = () => {
        navigate("/home");
    };

    const impatient = (patient, index) =>{
        
        return (
            <div key={index} >
                
                <div style={styles.impatientBg}>
                    <p style={{ margin: 0, color: "#e0e0e0", alignContent:"left", justifyContent:"left"}}>Name: {patient.name} <br/> Room: {patient.room}</p>
                    <PatientDetails index={index} componentIndex={0} />
                    {dischargePatientButton(index)}
                    <ChangeBedButton index={index} componentIndex={2} />
                    <CareButton index={index} componentIndex={3} />
                    <PaymentButton index={index} componentIndex={4} />
                </div>
                {componentOpened !== -1 && index === patientOpened && (<div style={styles.impatientBg}>
                    {openedContent}
                </div>
                )}
            </div>
        );
    };

    const handleDischargePatient = (index) => {
        const newPatients = patients.filter((patient, i) => i !== index);
        setPatients(newPatients);
    }

    const dischargePatientButton = (index) => {
        
        return (
            <button style={styles.buttonDischarge} onClick={() => handleDischargePatient(index)}>Discharge</button>
        );
    }

    
    const handleChangeBed = (index, newBed) => {
        const newPatients = patients.map((patient, i) => {
            if (i === index) {
                return { ...patient, room: newBed };
            }
            return patient;
        });
        setPatients(newPatients);
    }

    const ChangeBedButton = ({ index, componentIndex }) => {
        let newBed = "";
        return (
            <div>
                <button style={styles.buttonDischarge} onClick={() => {
                    if (componentOpened === componentIndex) {
                        handleClose();
                    }
                    else{
                        setComponentOpened(index);
                        setPatientOpened(index);
                        setOpenedContent(
                            <div style={{ display: "flex", alignContent:"center"}}>
                                <input
                                    style={styles.fullWidthInput}
                                    type="text"
                                    name="room"
                                    placeholder="New Room Number"

                                    onChange={(e) => { newBed = e.target.value; }}
                                />
                                <button style={styles.buttonDischarge} onClick={() => { handleChangeBed(index, newBed); handleClose();}}>Submit</button>
                            </div>
                        )
                    }
                }}>Change Room</button>
                
            </div>
        );
    }


    const handlePayment = (index, PaymentInfo) => {
        const newPatients = patients.map((patient, i) => {
            if (i === index) {
            return { 
                ...patient, 
                payment: {
                ...patient.payment,
                ...Object.fromEntries(Object.entries(PaymentInfo).filter(([key, value]) => value !== ""))
                }
            };
            }
            return patient;
        });
        setPatients(newPatients);
    }

    const PaymentButton = ({ index, componentIndex }) => {
        let PaymentInfo = {amount: 0, account: ""};
        return (
            <div>
                <button style={styles.buttonDischarge} onClick={() => {
                    if (componentOpened === componentIndex) {
                        handleClose();
                    }
                    else{
                        setComponentOpened(componentIndex);
                        setPatientOpened(index);
                        setOpenedContent(
                            <div style={{ display: "flex", alignContent:"center"}}>
                                <div>
                                <input
                                    style={styles.fullWidthInput}
                                    type="text"
                                    name="amount"
                                    placeholder="Amount"
                                    
                                    onChange={(e) => { PaymentInfo.amount = e.target.value; }}
                                />
                                <input
                                    style={styles.fullWidthInput}
                                    type="text"
                                    name="account"
                                    placeholder="Account Number"
                                    
                                    onChange={(e) => { PaymentInfo.account = e.target.value; }}
                                />
                                </div>
                                <button style={styles.buttonDischarge} onClick={() => { handlePayment(index, PaymentInfo); handleClose();}}>Submit</button>
                            </div>
                        )
                    }
                }}>Payment</button>
                
            </div>
        );
    }

    const PatientDetails = ({ index, componentIndex }) => {
        const Patient = patients.find((patient, i) => i === index);
        console.log(Patient);
        return (
            <div>
                <button style={styles.buttonDischarge} onClick={() => {
                    if (componentOpened === componentIndex) {
                        handleClose();
                    }
                    else{
                        setComponentOpened(componentIndex);
                        setPatientOpened(index);
                        setOpenedContent(
                            <div style={{ alignContent:"left", justifyContent:"left"}}>
                                <p>Payment Account:    {Patient?.payment?.account}</p>
                                <p>Payment Amount:    {Patient?.payment?.amount}</p>
                            </div>
                        )
                    }
                }}>Details</button>
                
            </div>
        );
    }

    
    const handleCare = (index, newCare) => {
        const newPatients = patients.map((patient, i) => {
            if (i === index) {
                return { ...patient, care: [...patient?.care, newCare] };
            }
            return patient;
        });
        setPatients(newPatients);
    };

    const CareButton = ({ index, componentIndex }) => {
        let newCare = "";
        return (
            <div>
                <button style={styles.buttonDischarge} onClick={() => {
                    if (componentOpened === componentIndex) {
                        handleClose();
                    }
                    else{
                        setComponentOpened(componentIndex);
                        setPatientOpened(index);
                        console.log(patients[index]?.care);
                        setOpenedContent(
                            <div style={{ display: "flex", alignContent:"center"}}>
                                <input
                                    style={styles.fullWidthInput}
                                    type="text"
                                    name="care"
                                    placeholder="New Care"

                                    onChange={(e) => { newCare = e.target.value; }}
                                />
                                <button style={styles.buttonDischarge} onClick={() => { handleCare(index, newCare); handleClose();}}>Add</button>
                                <ul>
                                    {patients[index]?.care.map((care, careIndex) => (
                                        <li key={careIndex} style={{ display: "flex", alignItems: "center" }}>
                                            {care}
                                            <button
                                                style={{ marginLeft: "10px", color: "red" }}
                                                onClick={() => {
                                                    const newPatients = patients?.map((patient, i) => {
                                                        if (i === index) {
                                                            return {
                                                                ...patient,
                                                                care: patient?.care.filter((_, ci) => ci !== careIndex),
                                                            };
                                                        }
                                                        return patient;
                                                    });
                                                    setPatients(newPatients);
                                                    handleClose();
                                                }}
                                            >
                                                -
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                }}>Manage Care {patients[index].index}</button>
                
            </div>
        );
    }

    const handleClose = () => {
        setComponentOpened(-1);
        setOpenedContent("");
        setPatientOpened(-1);
    };

    const [componentOpened, setComponentOpened] = useState(-1);
    const [openedContent, setOpenedContent] = useState("");
    const [patientOpened, setPatientOpened] = useState(-1);
    
    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <header style={styles.header}>
                    <h1 style={styles.title}>Inpatient Module</h1>
                    <p style={{ color: "#a0a0a0" }}>Monitor Hospitalized Patients</p>
                </header>
                <div style={styles.form}>
                    <input
                        style={styles.fullWidthInput}
                        type="text"
                        name="name"
                        placeholder="Patient Name"
                        value={newPatient.name}
                        onChange={handleInputChange}
                    />
                    <input
                        style={styles.fullWidthInput}
                        type="text"
                        name="room"
                        placeholder="Room Number"
                        value={newPatient.room}
                        onChange={handleInputChange}
                    />
                    <div style={styles.buttonContainer}>
                        <button style={styles.buttonRegister} onClick={handleAddPatient}>Add Patient</button>
                        <button style={{ ...styles.buttonRegister, ...styles.buttonCancel }} onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
                <div style={{display:"flex", justifyContent:"space-between", width:"90%", justifySelf:"center"}} >
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
                            impatient(patient, index)
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default InpatientPage;