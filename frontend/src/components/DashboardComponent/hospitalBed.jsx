
import "./hospitalBed.css";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Bed() {

    const navigate = useNavigate();

    const [permissions, setPermissions] = useState([]);
    const [beds, setBeds] = useState([]);
    const [permissionLoading, setPermissionLoading] = useState(true);

    const getPermissions = () => {

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
            .catch(error => {
                console.log("Permission Error:", error);
            })
            .finally(() => {
                setPermissionLoading(false);
            });

    };

    const hasPermission = (permissionName) => {
        return permissions.includes(permissionName);
        
    };
    

    const getBeds = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/bed/view`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const result = await response.json();

            if (result.success) {
                setBeds(result.beds);
            } else {
                handleError("Failed to load beds!");
            }

        } catch (error) {

            handleError("Something went wrong!");

        }

    };

    useEffect(() => {

        getBeds();
        getPermissions();

    }, []);

    const deleteBed = async (bedId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this bed?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/bed/delete/${bedId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const result = await response.json();

            if (result.success) {

                handleSuccess(result.message);
                getBeds();

            } else {

                handleError(result.message || "Bed delete failed!");

            }

        } catch (error) {

            handleError(error.message);

        }

    };

    if (permissionLoading) {
        return null;
    }

    return (

        <div className="bed-container">

            <div className="bed-list-header">

                <h2>All Beds</h2>

                {hasPermission("create_bed") && (

                    <button
                        className="create-bed-btn"
                        onClick={() => navigate("/dashboard/beds/add")}
                    >
                        + Add Bed
                    </button>

                )}

            </div>

            {hasPermission("view_bed") ? (

                <div className="bed-table-card">

                    <table className="bed-table">

                        <thead>

                            <tr>

                                <th>SL</th>
                                <th>Bed Type</th>
                                <th>Total Beds</th>
                                <th>Available Beds</th>

                                {(hasPermission("update_bed") ||
                                    hasPermission("delete_bed")) && (

                                    <th>Action</th>

                                )}

                            </tr>

                        </thead>

                        <tbody>

                            {beds.length > 0 ? (

                                beds.map((bed, index) => (

                                    <tr key={bed._id}>

                                        <td>{index + 1}</td>

                                        <td>{bed.bedType}</td>

                                        <td>{bed.totalBeds}</td>

                                        <td>{bed.availableBeds}</td>

                                        {(hasPermission("update_bed") ||
                                            hasPermission("delete_bed")) && (

                                            <td className="action-buttons">

                                                {hasPermission("update_bed") && (

                                                    <button
                                                        className="edit-btn"
                                                        onClick={() =>
                                                            navigate(`/dashboard/beds/edit/${bed._id}`)
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                )}

                                                {hasPermission("delete_bed") && (

                                                    <button
                                                        className="delete-btn"
                                                        onClick={() => deleteBed(bed._id)}
                                                    >
                                                        Delete
                                                    </button>

                                                )}

                                            </td>

                                        )}

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="5">
                                        No bed records found.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            ) : (

                <p></p>

            )}

            <ToastContainer />

        </div>

    );

}

export default Bed;
