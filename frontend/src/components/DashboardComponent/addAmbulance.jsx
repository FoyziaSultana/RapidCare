
import "./hospitalBed.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";

function AddAmbulance() {

    const navigate = useNavigate();

    const [permissions, setPermissions] = useState([]);

    const [ambulanceInfo, setAmbulanceInfo] = useState({
        vehicalNumber: "",
        ambulanceDriverName: "",
        ambulanceDriverPhone: "",
        hospitalId: ""
    });
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch(`${import.meta.env.VITE_API_URL}/userPermission/permissions`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setPermissions(data.permissions);
                }
            })
            .catch(error => (error));

        fetch(`${import.meta.env.VITE_API_URL}/hospital/approved`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setHospitals(data.hospitals);
                }
            })
            .catch(error => (error));

    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setAmbulanceInfo({
            ...ambulanceInfo,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const { vehicalNumber, ambulanceDriverName, ambulanceDriverPhone, hospitalId } = ambulanceInfo;

        if ( vehicalNumber.trim() === "" || ambulanceDriverName.trim() === "" || ambulanceDriverPhone.trim() === "") {
            return handleError("Fillup all information");
        }

        if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(ambulanceDriverPhone.trim())) {
            return handleError("Please enter a valid driver phone number");
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/ambulance/add`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        vehicalNumber: vehicalNumber.trim(),
                        ambulanceDriverName: ambulanceDriverName.trim(),
                        ambulanceDriverPhone: ambulanceDriverPhone.trim(),
                        hospitalId
                    })
                }
            );

            const result = await response.json();

            if (result.success) {

                handleSuccess(
                    result.message || "Ambulance added successfully!"
                );

                setTimeout(() => {
                    navigate("/dashboard/ambulances");
                }, 700);

            } else {

                handleError(
                    result.message || "Ambulance creation failed!"
                );

            }

        } catch (error) {

            handleError(error.message);

        }

    };

    if (!permissions.includes("add_ambulance")) {
        return null;
    }

    return (

        <div className="bed-container">

            <div className="bed-form-card">

                <form onSubmit={handleSubmit}>

                    <h1>Add Ambulance</h1>
                    <div>
                        <label>Hospital Name</label>

                        <select name="hospitalId" value={ambulanceInfo.hospitalId || ""} onChange={handleChange} >
                            <option value="">Select Hospital</option>

                            {hospitals.map(hospital => (
                                <option key={hospital._id} value={hospital._id}>
                                    {hospital.hospitalName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Vehicle Number</label>

                        <input type="text" name="vehicalNumber"
                        placeholder="Enter vehicle number" value={ambulanceInfo.vehicalNumber} onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Driver Name</label>

                        <input type="text" name="ambulanceDriverName"
                            placeholder="Enter driver name"
                            value={ambulanceInfo.ambulanceDriverName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Driver Phone</label>

                        <input type="tel" name="ambulanceDriverPhone"
                            placeholder="Enter driver phone number"
                            value={ambulanceInfo.ambulanceDriverPhone}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">
                        Add Ambulance
                    </button>

                    <button type="button" className="cancel-btn" onClick={() => navigate("/dashboard/ambulance")} >
                        Cancel
                    </button>

                </form>

            </div>

            <ToastContainer />

        </div>

    );

}

export default AddAmbulance;
