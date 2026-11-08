
import "./bloodManagement.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";

function AddBlood() {

    const navigate = useNavigate();

    const [permissions, setPermissions] = useState([]);
    const [hospitals, setHospitals] = useState([]);

    const [bloodInfo, setBloodInfo] = useState({
        bloodGroup: "",
        totalBags: "",
        availableBags: "",
        hospitalId: ""
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
            .catch(error =>(error));

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

        setBloodInfo({
            ...bloodInfo,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const { bloodGroup, totalBags, availableBags, hospitalId } = bloodInfo;

        if (bloodGroup === "" || availableBags === "" || hospitalId === "") {
            return handleError("Fillup all information");
        }

        if (Number(availableBags) <= 0) {
            return handleError("Please enter a valid quantity");
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/blood/add`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        bloodGroup,
                        totalBags: Number(totalBags),
                        availableBags: Number(availableBags),
                        hospitalId
                    })
                }
            );

            const result = await response.json();

            if (result.success) {

                handleSuccess(
                    result.message || "Blood added successfully!"
                );

                setTimeout(() => {
                    navigate("/dashboard/bloods");
                }, 700);

            } else {

                handleError(
                    result.message || "Blood creation failed!"
                );

            }

        } catch (error) {

            handleError(error.message);

        }

    };

    if (!permissions.includes("add_blood")) {
        return null;
    }

    return (

        <div className="bed-container">

            <div className="bed-form-card">

                <form onSubmit={handleSubmit}>

                    <h1>Add Blood</h1>

                    <div>
                        <label>Hospital Name</label>

                        <select name="hospitalId" value={bloodInfo.hospitalId} onChange={handleChange} >
                            <option value="">Select Hospital</option>

                            {hospitals.map(hospital => (
                                <option key={hospital._id} value={hospital._id}>
                                    {hospital.hospitalName}
                                </option>
                            ))}

                        </select>
                    </div>

                    <div>
                        <label>Blood Group</label>

                        <select name="bloodGroup" value={bloodInfo.bloodGroup} onChange={handleChange}>
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div>
                        <label>Total Bags</label>

                        <input type="number" name="totalBags" min="0"
                            placeholder="Enter Total blood units"
                            value={bloodInfo.totalBags}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Available Units</label>

                        <input type="number" name="availableBags" min="0"
                            placeholder="Enter available blood units"
                            value={bloodInfo.availableBags}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">
                        Add Blood
                    </button>

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate("/dashboard/bloods")}
                    >
                        Cancel
                    </button>

                </form>

            </div>

            <ToastContainer />

        </div>

    );

}

export default AddBlood;
