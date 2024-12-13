import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";


/// FIX THIS
const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const encryptedEmail = localStorage.getItem("email");
        if (encryptedEmail) {
            try {
                console.log("test1");
                const bytes = CryptoJS.AES.decrypt(encryptedEmail, process.env.REACT_APP_SECRET_KEY);
                const email = bytes.toString(CryptoJS.enc.Utf8);
                if (email) {
                    console.log("test2");
                    setIsAuthenticated(true);
                    console.log("test5", isAuthenticated); // Log the updated state
                } else {
                    console.log("test3");
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Decryption error:", error);
                setIsAuthenticated(false);
            }
        } else {
            console.log("test4");
            setIsAuthenticated(false);
        }
    }, []); // Empty dependency array ensures this runs only once

    return isAuthenticated;
};

export default useAuth;