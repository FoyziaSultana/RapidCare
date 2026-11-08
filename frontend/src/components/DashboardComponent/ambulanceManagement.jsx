
import "./AmbulanceManagement.css";
import { useState, useEffect } from "react";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AmbulanceManagement() {

    const navigate = useNavigate();

    const [permissions, setPermissions] = useState([]);
    const [ambulances, setAmbulances] = useState([]);
    const [loading, setLoading] = useState(true);

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
            .catch(error => console.log("Permission Error:", error));

        getAmbulances();

    }, []);

    const getAmbulances = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/ambulance/view`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                setAmbulances(data.ambulances);
            } else {
                handleError(data.message || "Failed to load ambulances!");
            }

        } catch (error) {
            handleError("Failed to load ambulances!");

        } finally {
            setLoading(false);
        }

    };

    const deleteAmbulance = async (ambulanceId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this ambulance?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/ambulance/delete/${ambulanceId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {

                handleSuccess(data.message || "Ambulance deleted successfully");

                setAmbulances(prevAmbulances =>
                    prevAmbulances.filter(ambulance => ambulance._id !== ambulanceId)
                );

            } else {
                handleError(data.message || "Ambulance deletion failed!");
            }

        } catch (error) {
            handleError("Failed to delete ambulance!");
        }

    };

    const hospitalList = Object.values(

        ambulances.reduce((groups, ambulance) => {

            if (!ambulance.hospitalId) {
                return groups;
            }

            const hospitalId = ambulance.hospitalId._id;

            if (!groups[hospitalId]) {

                groups[hospitalId] = {
                    hospitalName: ambulance.hospitalId.hospitalName,
                    ambulances: []
                };

            }

            groups[hospitalId].ambulances.push(ambulance);

            return groups;

        }, {})

    );

    if (!permissions.includes("view_ambulance")) {
        return null;
    }

    return (

        <div className="amb-container">

            <div className="amb-header">
                {permissions.includes("add_ambulance") && (
                    <button className="amb-add" onClick={() => navigate("/dashboard/ambulances/add")}>
                        + Add Ambulance
                    </button>
                )}
                <h1>Ambulance Management</h1>

            </div>

            {hospitalList.length === 0 ? (

                <p className="amb-message">No ambulance found</p>

            ) : (

                <div className="amb-list">

                    {hospitalList.map((hospital, index) => (

                        <div className="amb-card" key={index}>

                            <div className="amb-title">

                                <h2>{hospital.hospitalName}</h2>

                            </div>

                            <div className="amb-table-wrap">

                                <table className="amb-table">

                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Vehicle Number</th>
                                            <th>Driver Name</th>
                                            <th>Driver Phone</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {hospital.ambulances.map((ambulance, index) => (

                                            <tr key={ambulance._id}>

                                                <td>{index + 1}</td>
                                                <td>{ambulance.vehicalNumber}</td>

                                                <td>{ambulance.ambulanceDriverName}</td>

                                                <td>{ambulance.ambulanceDriverPhone}</td>

                                                <td>

                                                    <div className="amb-actions">

                                                        {permissions.includes("update_ambulance") && (
                                                            <button className="amb-edit" onClick={() => navigate(`/dashboard/ambulances/update/${ambulance._id}`)}>
                                                                Edit
                                                            </button>
                                                        )}

                                                        {permissions.includes("delete_ambulance") && (
                                                            <button className="amb-delete" onClick={() => deleteAmbulance(ambulance._id)}>
                                                                Delete
                                                            </button>
                                                        )}

                                                    </div>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    ))}

                </div>

            )}

            <ToastContainer />

        </div>

    );

}

export default AmbulanceManagement;
