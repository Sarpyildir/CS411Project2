import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const ProfilePage = () => {
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
        },
        header: {
            marginBottom: "20px",
        },
        title: {
            fontSize: "2rem",
            margin: "10px 0",
        },
        button: {
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
        passportModal:{
            position: 'fixed',
            width: '500px',
            height: '300px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1e1e1e',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
        },
        passportText: {
            width: '90%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
        homeButton: {
            backgroundColor: "aqua",
            color: "black",
            left: "10px",
            top: "10px",
        },
    };

    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        email: '',
        role: '',
    });

    useEffect(() => {
        // Fetch user data from an API or local storage
        const fetchUserData = async () => {
            // Replace with actual data fetching logic
            
            try {
            const encryptedEmail = localStorage.getItem("email");
                if (encryptedEmail) {
                    const bytes = CryptoJS.AES.decrypt(encryptedEmail, process.env.REACT_APP_SECRET_KEY);
                    const email = bytes.toString(CryptoJS.enc.Utf8);
                    const url = process.env.REACT_APP_BACKEND_URL + "login/getUserByEmail/" + email;

                    const response = await fetch(url, {
                        method: "GET",
                        headers: {'Content-Type': 'application/json'},
                        
                    })
                    // get the data
                    const data = await response.json();
                    console.log(data);
                    setUserData({name: data.user[1], surname: data.user[2], email: data.user[3], role: data.user[4]});
                }

            }
            catch (error) {
                console.log("error", error);
            }
        };

        fetchUserData();
    }, []);

    const [openPassportModal, setOpenPassportModal] = useState(false);
    const handleChangePassword = () => {
        // Handle change password logic
        setOpenPassportModal(!openPassportModal);
        if (!openPassportModal) {
            return;
        }
        alert('Change password functionality to be implemented');

    };


    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const handleChangePasswordSubmit = async () => {
        // Handle change password submit logic

        try{   
            await updatePasswordCall();
            setOpenPassportModal(false);
            alert('Password changed successfully');
        }
        catch (error) {
            alert('Failed to change password');
        }
    };

    const updatePasswordCall = async () => {
        // Replace with actual data fetching logic
        
        try {

            const encryptedEmail = localStorage.getItem("email");
            if (encryptedEmail) {
                const bytes = CryptoJS.AES.decrypt(encryptedEmail, process.env.REACT_APP_SECRET_KEY);
                const email = bytes.toString(CryptoJS.enc.Utf8);
                
                
                const url = process.env.REACT_APP_BACKEND_URL + "register/changePassword";

                const response = await fetch(url, {
                    method: "PUT",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: email,
                        old_password: oldPassword,
                        new_password: newPassword
                    })
                    
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data.message);
            }
            
        } catch (error) {
            console.error("Failed to change password:", error);
        }
    };

    const navigate = useNavigate();
    const handleNavigateToHome = () => {
        navigate("/home"); // Navigate to the Home page
    };
    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <header style={styles.header}>
                    <h1 style={styles.title}>Profile Page</h1>
                </header>
                <div>
                    {userData.name !='' && <p><strong>Name:</strong> {userData.name}</p>}
                    {userData.surname !='' && <p><strong>Surname:</strong> {userData.surname}</p>}
                    {userData.email !='' && <p><strong>Email:</strong> {userData.email}</p>}
                    {userData.role !='' && <p><strong>Role:</strong> {userData.role}</p>}
                </div>
                <div style={{ textAlign: 'center', margin: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <button style={{...styles.button, ...styles.homeButton}} onClick={handleNavigateToHome}>Back</button>
                <button style={styles.button} onClick={handleChangePassword}>Change Password</button>
                </div>
                {openPassportModal && (
                    <div style={styles.passportModal}>
                        <h2 style={{ color: '#e0e0e0' }}>Change Password</h2>
                        <input
                            type="password"
                            placeholder="Old Password"
                            onChange={(e) => setOldPassword(e.target.value)}
                            style={styles.passportText}
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={styles.passportText}
                        />
                        <div style={{ textAlign: 'center', margin: '20px', display: 'flex', justifyContent: 'space-between' }}>

                        <button
                            style={styles.button}
                            onClick={() => setOpenPassportModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            style={styles.button}
                            onClick={() => handleChangePasswordSubmit()}
                        >
                            Submit
                        </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;