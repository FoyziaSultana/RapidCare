
import "./hospitalBed.css";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function medicalResource() {

    const navigate = useNavigate();

    const [permissions, setPermissions] = useState([]);
    const [medicalResource, setmedicalResource] = useState([]);
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
    

    const getMedicalResources = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/medicalResource/view`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const result = await response.json();

            if (result.success) {
                setmedicalResource(result.medicalResource);
            } else {
                handleError("Failed to load medical resources!");
            }

        } catch (error) {

            handleError("Something went wrong!");

        }

    };

    useEffect(() => {

        getMedicalResources();
        getPermissions();

    }, []);

    const deleteMedicalResources = async (medicalResourceId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this resource?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/medicalResource/delete/${medicalResourceId}`,
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
                getMedicalResources();

            } else {

                handleError(result.message || "Medical resource delete failed!");

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

                <h2>All Medical resources</h2>

                {hasPermission("create_medical_resource") && (

                    <button
                        className="create-bed-btn"
                        onClick={() => navigate("/dashboard/medicalResource/add")}
                    >
                        + Add resources
                    </button>

                )}

            </div>

            {hasPermission("view_medical_resource") ? (

                <div className="bed-table-card">

                    <table className="bed-table">

                        <thead>

                            <tr>

                                <th>SL</th>
                                <th>Resource Name</th>
                                <th>Total Resources</th>
                                <th>Available Resources</th>

                                {(hasPermission("update_medical_resource") ||
                                    hasPermission("delete_medical_resource")) && (

                                    <th>Action</th>

                                )}

                            </tr>

                        </thead>

                        <tbody>

                            {medicalResource.length > 0 ? (

                                medicalResource.map((medicalResource, index) => (

                                    <tr key={medicalResource._id}>

                                        <td>{index + 1}</td>

                                        <td>{medicalResource.medicalResourceName}</td>

                                        <td>{medicalResource.totalMedicalResource}</td>

                                        <td>{medicalResource.availableMedicalResource}</td>

                                        {(hasPermission("update_medical_resource") ||
                                            hasPermission("delete_medical_resource")) && (

                                            <td className="action-buttons">

                                                {hasPermission("update_medical_resource") && (

                                                    <button
                                                        className="edit-btn"
                                                        onClick={() =>
                                                            navigate(`/dashboard/beds/edit/${bed._id}`)
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                )}

                                                {hasPermission("delete_medical_resource") && (

                                                    <button
                                                        className="delete-btn"
                                                        onClick={() => deleteMedicalResources(medicalResource._id)}
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

export default medicalResource;
