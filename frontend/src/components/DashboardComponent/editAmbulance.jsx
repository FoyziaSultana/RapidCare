
import "./ambulanceManagement.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";

function EditAmbulance() {

    const navigate = useNavigate();
    const { ambulanceId } = useParams();

    const [permissions, setPermissions] = useState([]);
    const [ambulanceInfo, setAmbulanceInfo] = useState(null);
    const [permissionLoading, setPermissionLoading] = useState(true);
    const [ambulanceLoading, setAmbulanceLoading] = useState(true);

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
            .catch(error => {( error);
            })
            .finally(() => {
                setPermissionLoading(false);
            });


        fetch(`${import.meta.env.VITE_API_URL}/ambulance/view`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {

                if (data.success) {

                    const selectedAmbulance = data.ambulances.find(
                        ambulance => ambulance._id === ambulanceId
                    );

                    if (selectedAmbulance) {
                        setAmbulanceInfo(selectedAmbulance);
                    } else {
                        handleError("Ambulance not found!");
                    }

                } else {
                    handleError("Failed to load ambulance information!");
                }

            })
            .catch(error => {
                handleError("Something went wrong");
            })
            .finally(() => {
                setAmbulanceLoading(false);
            });

    }, [ambulanceId]);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setAmbulanceInfo({
            ...ambulanceInfo,
            [name]: value
        });

    };


    const updateAmbulance = async (e) => {

        e.preventDefault();

        const { vehicalNumber, ambulanceDriverName, ambulanceDriverPhone } = ambulanceInfo;

        if ( vehicalNumber.trim() === "" || ambulanceDriverName.trim() === "" || ambulanceDriverPhone.trim() === ""
        ) {
            return handleError("Fillup all information");
        }

        if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(ambulanceDriverPhone.trim())) {
            return handleError("Please enter a valid driver phone number");
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/ambulance/update/${ambulanceId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        vehicalNumber: vehicalNumber.trim(),
                        ambulanceDriverName: ambulanceDriverName.trim(),
                        ambulanceDriverPhone: ambulanceDriverPhone.trim()
                    })
                }
            );

            const result = await response.json();

            if (result.success) {

                handleSuccess(result.message || "Ambulance updated successfully!");

                setTimeout(() => {
                    navigate("/dashboard/ambulances");
                }, 700);

            } else {

                handleError(result.message || "Ambulance update failed!");

            }

        } catch (error) {

            handleError("Something went wrong");

        }

    };


    if (permissionLoading || ambulanceLoading) {
        return null;
    }

    if (!permissions.includes("update_ambulance")) {
        return null;
    }

    if (!ambulanceInfo) {
        return null;
    }


    return (

        <div className="bed-container">

            <div className="edit-bed-card">

                <h2>Update Ambulance</h2>

                <form onSubmit={updateAmbulance}>

                    <label>Vehicle Number</label>

                    <input type="text" name="vehicalNumber"
                        value={ambulanceInfo.vehicalNumber}
                        onChange={handleChange}
                    />


                    <label>Driver Name</label>

                    <input type="text" name="ambulanceDriverName"
                        value={ambulanceInfo.ambulanceDriverName}
                        onChange={handleChange}
                    />


                    <label>Driver Phone</label>

                    <input type="tel" name="ambulanceDriverPhone"
                        value={ambulanceInfo.ambulanceDriverPhone}
                        onChange={handleChange}
                    />


                    <div className="edit-buttons">

                        <button type="submit" className="update-btn">
                            Update
                        </button>

                        <button type="button" className="cancel-btn" onClick={() => navigate("/dashboard/ambulances")} >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

            <ToastContainer />

        </div>

    );

}

export default EditAmbulance;
