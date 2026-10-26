import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "./HospitalRegistrationStyle.css";
import { handleError, handleSuccess } from "../toastmsg";


function HospitalRegistration() {

    const [showHospitalManager, setShowHospitalManager] = useState(false);

    const [hospitalRegistrationInfo, sethospitalRegistrationInfo] = useState({
        hospitalName: "",
        hospitalLicence: "",
        hospitalType: "",
        hospitalEmail: "",
        hospitalPhone: "",
        hospitalAddress: "",
        latitude: "",
        longitude: "",
        hospitalManagerName: "",
        hospitalManagerEmail: "",
        hospitalManagerPhone: "",
        hospitalManagerPassword: ""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        sethospitalRegistrationInfo({
            ...hospitalRegistrationInfo,
            [name]: value
        });
    }

    const handleNext = () => {
        const {
            hospitalName,
            hospitalLicence,
            hospitalType,
            hospitalEmail,
            hospitalPhone,
            hospitalAddress,
            latitude,
            longitude
        } = hospitalRegistrationInfo;

        if (!hospitalName || !hospitalLicence || !hospitalType || !hospitalEmail || !hospitalPhone || !hospitalAddress || !latitude || !longitude) {
            return handleError("Fillup all hospital information");
        }
        setShowHospitalManager(true);
    };

    const handleHospitalRegistration = async (e) => {
        e.preventDefault();
        const {
            hospitalManagerName,
            hospitalManagerEmail,
            hospitalManagerPhone,
            hospitalManagerPassword
        } = hospitalRegistrationInfo;
        if (!hospitalManagerName || !hospitalManagerEmail || !hospitalManagerPhone || !hospitalManagerPassword) {
            return handleError("Fillup all hospital manager information");
        }
        try {
            const url = `${import.meta.env.VITE_API_URL}/auth/hospitalRegister`;
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

            <form
                className="Form"
                onSubmit={handleHospitalRegistration}
            >

                <h1>Hospital Registration</h1>

                {!showHospitalManager && (
                    <>
                        <div className="inputField">
                            <label htmlFor="hospitalName">
                                Hospital Name
                            </label>
                            <input
                                type="text"
                                id="hospitalName"
                                name="hospitalName"
                                value={hospitalRegistrationInfo.hospitalName}
                                autoFocus
                                placeholder="Enter the name of the hospital..."
                                onChange={handleChange}
                            />
                        </div>

                        <div className="inputField">
                            <label htmlFor="hospitalLicence">
                                Licence Number
                            </label>
                            <input
                                type="text"
                                id="hospitalLicence"
                                name="hospitalLicence"
                                value={hospitalRegistrationInfo.hospitalLicence}
                                placeholder="Enter the licence number..."
                                onChange={handleChange}
                            />
                        </div>

                        <div className="inputField">
                            <label htmlFor="hospitalType">
                                Hospital Type
                            </label>
                            <select
                                id="hospitalType"
                                name="hospitalType"
                                value={hospitalRegistrationInfo.hospitalType}
                                onChange={handleChange}
                            >
                                <option value="">Select hospital type</option>
                                <option value="government">Government</option>
                                <option value="private">Private</option>
                            </select>
                        </div>

                        <div className="inputField">
                            <label htmlFor="hospitalEmail">
                                Hospital Email
                            </label>
                            <input
                                type="email"
                                id="hospitalEmail"
                                name="hospitalEmail"
                                value={hospitalRegistrationInfo.hospitalEmail}
                                placeholder="Enter the email..."
                                onChange={handleChange}
                            />
                        </div>

                        <div className="inputField">
                            <label htmlFor="hospitalPhone">
                                Hospital Phone
                            </label>
                            <input
                                type="tel"
                                id="hospitalPhone"
                                name="hospitalPhone"
                                value={hospitalRegistrationInfo.hospitalPhone}
                                placeholder="Enter the phone..."
                                onChange={handleChange}
                            />
                        </div>

                        <div className="inputField">
                            <label htmlFor="hospitalAddress">
                                Hospital Address
                            </label>
                            <textarea
                                id="hospitalAddress"
                                name="hospitalAddress"
                                value={hospitalRegistrationInfo.hospitalAddress}
                                placeholder="Enter the hospital address..."
                                onChange={handleChange}
                            />
                        </div>

                        <div className="inputField">
                            <label htmlFor="latitude">Latitude</label>
                            <input
                                type="text"
                                id="latitude"
                                name="latitude"
                                value={hospitalRegistrationInfo.latitude}
                                placeholder="Enter latitude..."
                                onChange={handleChange}
                            />
                        </div>

                        <div className="inputField">
                            <label htmlFor="longitude">Longitude</label>
                            <input
                                type="text"
                                id="longitude"
                                name="longitude"
                                value={hospitalRegistrationInfo.longitude}
                                placeholder="Enter longitude..."
                                onChange={handleChange}
                            />
                        </div>

                        <button type="button" onClick={handleNext}>
                            Next
                        </button>
                    </>
                )}

                {showHospitalManager && (
                    <>
                        <div className="inputField">
                            <label htmlFor="hospitalManagerName">
                                Hospital Manager Name
                            </label>
                            <input
                                type="text"
                                id="hospitalManagerName"
                                name="hospitalManagerName"
                                value={hospitalRegistrationInfo.hospitalManagerName}
                                placeholder="Enter hospital manager name..."
                                onChange={handleChange}
                            />
                        </div>

                        <div className="inputField">
                            <label htmlFor="hospitalManagerEmail">
                                Hospital Manager Email
                            </label>
                            <input
                                type="email"
                                id="hospitalManagerEmail"
                                name="hospitalManagerEmail"
                                value={hospitalRegistrationInfo.hospitalManagerEmail}
                                placeholder="Enter hospital manager email..."
                                onChange={handleChange}
                            />
                        </div>

                        <div className="inputField">
                            <label htmlFor="hospitalManagerPhone">
                                Hospital Manager Phone
                            </label>
                            <input
                                type="tel"
                                id="hospitalManagerPhone"
                                name="hospitalManagerPhone"
                                value={hospitalRegistrationInfo.hospitalManagerPhone}
                                placeholder="Enter hospital manager phone..."
                                onChange={handleChange}
                            />
                        </div>

                        <div className="inputField">
                            <label htmlFor="hospitalManagerPassword">
                                Password
                            </label>
                            <input
                                type="password"
                                id="hospitalManagerPassword"
                                name="hospitalManagerPassword"
                                value={hospitalRegistrationInfo.hospitalManagerPassword}
                                placeholder="Create password..."
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowHospitalManager(false)}
                        >
                            Back
                        </button>

                        <button type="submit">
                            Register
                        </button>
                    </>
                )}

            </form>

            <ToastContainer />

        </div>
    );
}
export default HospitalRegistration;