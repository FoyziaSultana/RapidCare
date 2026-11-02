
import "./hospitalBed.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";

function EditMedicalResource() {

    const navigate = useNavigate();
    const { medicalResourceId } = useParams();

    const [permissions, setPermissions] = useState([]);
    const [medicalResourceInfo, setMedicalResourceInfo] = useState(null);
    const [permissionLoading, setPermissionLoading] = useState(true);
    const [resourceLoading, setResourceLoading] = useState(true);

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
            .catch(error => {
                console.log("Permission Error:", error);
            })
            .finally(() => {
                setPermissionLoading(false);
            });


        fetch(`${import.meta.env.VITE_API_URL}/medicalResource/view`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {

                if (data.success) {

                    const selectedMedicalResource = data.medicalResource.find(
                        resource => resource._id === medicalResourceId
                    );

                    if (selectedMedicalResource) {
                        setMedicalResourceInfo(selectedMedicalResource);
                    } else {
                        handleError("Medical resource not found!");
                    }

                } else {
                    handleError("Failed to load medical resource information!");
                }

            })
            .catch(error => {
                handleError(error.message);
            })
            .finally(() => {
                setResourceLoading(false);
            });

    }, [medicalResourceId]);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setMedicalResourceInfo({
            ...medicalResourceInfo,
            [name]: value
        });

    };


    const updateMedicalResource = async (e) => {

        e.preventDefault();

        const {
            medicalResourceName,
            totalMedicalResource,
            availableMedicalResource
        } = medicalResourceInfo;

        if (
            medicalResourceName.trim() === "" ||
            totalMedicalResource === "" ||
            availableMedicalResource === ""
        ) {
            return handleError("Fillup all information");
        }

        if (
            !Number.isInteger(Number(totalMedicalResource)) ||
            !Number.isInteger(Number(availableMedicalResource)) ||
            Number(totalMedicalResource) <= 0 ||
            Number(availableMedicalResource) < 0 ||
            Number(availableMedicalResource) > Number(totalMedicalResource)
        ) {
            return handleError("Please enter valid resource numbers");
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/medicalResource/update/${medicalResourceId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        medicalResourceName,
                        totalMedicalResource: Number(totalMedicalResource),
                        availableMedicalResource: Number(availableMedicalResource)
                    })
                }
            );

            const result = await response.json();

            if (result.success) {

                handleSuccess(result.message || "Medical resource updated successfully!");

                setTimeout(() => {
                    navigate("/dashboard/medicalResource");
                }, 700);

            } else {

                handleError(result.message || "Medical resource update failed!");

            }

        } catch (error) {

            handleError(error.message);

        }

    };


    if (permissionLoading || resourceLoading) {
        return null;
    }

    if (!permissions.includes("update_medical_resource")) {
        return null;
    }

    if (!medicalResourceInfo) {
        return null;
    }


    return (

        <div className="bed-container">

            <div className="edit-bed-card">

                <h2>Update Medical Resource</h2>

                <form onSubmit={updateMedicalResource}>

                    <label>Medical Resource Name</label>

                    <select
                        name="medicalResourceName"
                        value={medicalResourceInfo.medicalResourceName}
                        onChange={handleChange}
                    >
                        <option value="Oxygen">Oxygen</option>
                        <option value="Ventilator">Ventilator</option>
                    </select>


                    <label>Total Resources</label>

                    <input
                        type="number"
                        name="totalMedicalResource"
                        min="1"
                        step="1"
                        value={medicalResourceInfo.totalMedicalResource}
                        onChange={handleChange}
                    />


                    <label>Available Resources</label>

                    <input
                        type="number"
                        name="availableMedicalResource"
                        min="0"
                        step="1"
                        value={medicalResourceInfo.availableMedicalResource}
                        onChange={handleChange}
                    />


                    <div className="edit-buttons">

                        <button type="submit" className="update-btn">
                            Update
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/dashboard/medicalResource")}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

            <ToastContainer />

        </div>

    );

}

export default EditMedicalResource;

// end
