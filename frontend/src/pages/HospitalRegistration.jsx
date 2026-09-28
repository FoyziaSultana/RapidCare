import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "./HospitalRegistrationStyle.css";
import { handleError, handleSuccess } from "../toastmsg";


function HospitalRegistration() {

    const [hospitalRegistrationInfo, sethospitalRegistrationInfo] = useState({
        hospitalName: "",
        hospitalLicence: "",
        hospitalType: "",
        hospitalEmail: "",
        hospitalPhone: "",
        hospitalAddress: "",
        latitude: "",
        longitude: ""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyhospitalRegistrationInfo = { ...hospitalRegistrationInfo };
        copyhospitalRegistrationInfo[name] = value;
        sethospitalRegistrationInfo(copyhospitalRegistrationInfo);
    }

    const handleHospitalRegistration = async (e) => {
        e.preventDefault();
        const { hospitalName, hospitalLicence, hospitalType, hospitalEmail, hospitalPhone, hospitalAddress, latitude, longitude} = hospitalRegistrationInfo;
if (!hospitalName || !hospitalLicence || !hospitalType || !hospitalEmail || !hospitalPhone || !hospitalAddress || !latitude || !longitude) {
    return handleError('Fillup all information')
}

try {
    const url = "http://localhost:5005/auth/hospitalRegister";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hospitalRegistrationInfo)
    });
    const result = await response.json();
    const { success, message, error } = result;
    if (success) {
        handleSuccess(message);
        setTimeout(() => {
            navigate('/')
        }, 1000)
    }
    else if (error) {
        const details = error?.details[0].message;
        handleError(details);
    }
    else if (!success) {
        handleError(message);
    }

} catch (error) {
    handleError(error.message);
} 
    }

return (
    <div className="HospitalRegistrationContainer">
        <form className="Form" onSubmit={handleHospitalRegistration}>
            <h1>Hospital Registration</h1>
            <div className="inputField">
                <label htmlFor="hospitalName">Hospital Name</label>
                <input type="text" id="hospitalName" name="hospitalName"
                    autoFocus placeholder="Enter the name of the hospital..." onChange={handleChange} />

            </div>

            <div className="inputField">
                <label htmlFor="hospitalLicence">Licence Number</label>
                <input type="text" id="hospitalLicence" name="hospitalLicence"
                    placeholder="Enter the licence number..." onChange={handleChange} />

            </div>

            <div className="inputField">
                <label htmlFor="hospitalType">Hospital Type</label>
                <select id="hospitalType" name="hospitalType" onChange={handleChange}>
                    <option value="">Select hospital type</option>
                    <option value="government">Government</option>
                    <option value="private">Private</option>
                </select>

            </div>

            <div className="inputField">
                <label htmlFor="hospitalEmail">Hospital Email</label>
                <input type="email" id="hospitalEmail" name="hospitalEmail"
                    placeholder="Enter the email..." onChange={handleChange} />
            </div>

            <div className="inputField">
                <label htmlFor="hospitalPhone">Hospital Phone</label>
                <input type="tel" id="hospitalPhone" name="hospitalPhone"
                    placeholder="Enter the phone..." onChange={handleChange} />
            </div>

            <div className="inputField">
                <label htmlFor="hospitalAddress">Hospital Address</label>
                <textarea id="hospitalAddress" name="hospitalAddress"
                    placeholder="Enter the hospital address..." onChange={handleChange} ></textarea>
            </div>

            <div className="inputField">
                <label htmlFor="latitude">Latitude</label>
                <input
                    type="text" id="latitude" name="latitude" placeholder="Enter latitude..."
                    onChange={handleChange}
                />
            </div>

            <div className="inputField">
                <label htmlFor="longitude">Longitude</label>
                <input
                    type="text" id="longitude" name="longitude" placeholder="Enter longitude..."
                    onChange={handleChange}
                />
            </div>

            <button type="submit">Register Hospital</button>
        </form>
        <ToastContainer />
    </div>

) 
}
export default HospitalRegistration;