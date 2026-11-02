
import "./hospitalBed.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";

function AddMedicalResource() {

    const navigate = useNavigate();

    const [permissions, setPermissions] = useState([]);

    const [medicalResourceInfo, setMedicalResourceInfo] = useState({
        medicalResourceName: "",
        totalMedicalResource: "",
        availableMedicalResource: ""
    });

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

    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setMedicalResourceInfo({
            ...medicalResourceInfo,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {

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
                `${import.meta.env.VITE_API_URL}/medicalResource/create`,
                {
                    method: "POST",
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

                handleSuccess(
                    result.message || "Medical resource created successfully!"
                );

                setTimeout(() => {
                    navigate("/dashboard/medicalResource");
                }, 700);

            } else {

                handleError(
                    result.message || "Medical resource creation failed!"
                );

            }

        } catch (error) {

            handleError(error.message);

        }

    };

    if (!permissions.includes("create_medical_resource")) {
        return null;
    }

    return (

        <div className="bed-container">

            <div className="bed-form-card">

                <form onSubmit={handleSubmit}>

                    <h1>Create Medical Resource</h1>

                    <div>
                        <label>Medical Resource Name</label>

                        <input type="text" name="medicalResourceName"
                            placeholder="Enter resource name (e.g. Oxygen)"
                            value={medicalResourceInfo.medicalResourceName} onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Total Resources</label>

                        <input type="number" name="totalMedicalResource" min="1" step="1"
                            placeholder="Enter total resources"
                            value={medicalResourceInfo.totalMedicalResource} onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Available Resources</label>

                        <input type="number" name="availableMedicalResource" min="0" step="1"
                            placeholder="Enter available resources"
                            value={medicalResourceInfo.availableMedicalResource}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">
                        Create Medical Resource
                    </button>

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate("/dashboard/medical-resources")}
                    >
                        Cancel
                    </button>

                </form>

            </div>

            <ToastContainer />

        </div>

    );

}

export default AddMedicalResource;
