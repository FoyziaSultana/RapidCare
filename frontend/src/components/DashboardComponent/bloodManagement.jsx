
import "./BloodManagement.css";
import { useState, useEffect } from "react";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function BloodManagement() {

    const navigate = useNavigate();

    const [permissions, setPermissions] = useState([]);
    const [bloods, setBloods] = useState([]);
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

        getBloods();

    }, []);

    const getBloods = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/blood/view`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                setBloods(data.bloods);
            } else {
                handleError(data.message || "Failed to load blood records!");
            }

        } catch (error) {
            handleError("Failed to load blood records!");

        } finally {
            setLoading(false);
        }

    };

    const deleteBlood = async (bloodId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blood record?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/blood/delete/${bloodId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {

                handleSuccess(data.message || "Blood record deleted successfully");

                setBloods(prevBloods =>
                    prevBloods.filter(blood => blood._id !== bloodId)
                );

            } else {
                handleError(data.message || "Blood deletion failed!");
            }

        } catch (error) {
            handleError("Failed to delete blood record!");
        }

    };

    const hospitalList = Object.values(

        bloods.reduce((groups, blood) => {
            if (!blood.hospitalId) {
                return groups;
            }

            const hospitalId = blood.hospitalId._id;

            if (!groups[hospitalId]) {
                
                groups[hospitalId] = {
                    hospitalName: blood.hospitalId.hospitalName,
                    bloods: []
                };

            }

            groups[hospitalId].bloods.push(blood);

            return groups;

        }, {})

    );

    if (!permissions.includes("view_blood")) {
        return null;
    }

    return (

        <div className="blood-container">

            <div className="blood-header">

                {permissions.includes("add_blood") && (
                    <button className="blood-add" onClick={() => navigate("/dashboard/bloods/add")} >
                        + Add Blood
                    </button>
                )}

                <h1>Blood Management</h1>

            </div>

            {hospitalList.length === 0 ? (

                <p className="blood-message">No blood records found</p>

            ) : (

                <div className="blood-list">

                    {hospitalList.map((hospital, index) => (

                        <div className="blood-card" key={index}>

                            <div className="blood-title">

                                <h2>{hospital.hospitalName}</h2>

                            </div>

                            <div className="blood-table-wrap">

                                <table className="blood-table">

                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Blood Group</th>
                                            <th>Total Units</th>
                                            <th>Available Units</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {hospital.bloods.map((blood, index) => (

                                            <tr key={blood._id}>

                                                <td>{index + 1}</td>

                                                <td>{blood.bloodGroup}</td>

                                                <td>{blood.totalBags}</td>

                                                <td>{blood.availableBags}</td>

                                                <td>

                                                    <div className="blood-actions">

                                                        {permissions.includes("update_blood") && (
                                                            <button className="blood-edit" onClick={() => navigate(`/dashboard/bloods/update/${blood._id}`)}>
                                                                Edit
                                                            </button>
                                                        )}

                                                        {permissions.includes("delete_blood") && (
                                                            <button className="blood-delete" onClick={() => deleteBlood(blood._id)}>
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

export default BloodManagement;
