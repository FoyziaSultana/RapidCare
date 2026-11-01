
import "./hospitalBed.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";

function AddBed() {

    const navigate = useNavigate();

    const [permissions, setPermissions] = useState([]);

    const [bedInfo, setBedInfo] = useState({
        bedType: "General",
        totalBeds: "",
        availableBeds: ""
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
            .catch(error => console.log(error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setBedInfo({
            ...bedInfo,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { bedType, totalBeds, availableBeds } = bedInfo;

        if (totalBeds === "" || availableBeds === "") {
            return handleError("Fillup all information");
        }

        if (
            !Number.isInteger(Number(totalBeds)) ||
            !Number.isInteger(Number(availableBeds)) ||
            Number(totalBeds) <= 0 ||
            Number(availableBeds) < 0 ||
            Number(availableBeds) > Number(totalBeds)
        ) {
            return handleError("Please enter valid bed numbers");
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/bed/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        bedType,
                        totalBeds: Number(totalBeds),
                        availableBeds: Number(availableBeds)
                    })
                }
            );

            const result = await response.json();

            if (result.success) {
                handleSuccess(result.message || "Bed created successfully!");

                setTimeout(() => {
                    navigate("/dashboard/beds");
                }, 700);

            } else {
                handleError(result.message || "Bed creation failed!");
            }

        } catch (error) {
            handleError(error.message);
        }
    };

    if (!permissions.includes("create_bed")) {
        return null;
    }

    return (
        <div className="bed-container">

            <div className="bed-form-card">

                <form onSubmit={handleSubmit}>

                    <h1>Create Bed</h1>

                    <div>
                        <label>Bed Type</label>

                        <select
                            name="bedType"
                            value={bedInfo.bedType}
                            onChange={handleChange}
                        >
                            <option value="General">General</option>
                            <option value="Cabin">Cabin</option>
                            <option value="ICU">ICU</option>
                            <option value="NICU">NICU</option>
                            <option value="CCU">CCU</option>
                        </select>
                    </div>

                    <div>
                        <label>Total Beds</label>

                        <input
                            type="number"
                            name="totalBeds"
                            min="1"
                            step="1"
                            placeholder="Enter total beds"
                            value={bedInfo.totalBeds}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Available Beds</label>

                        <input
                            type="number"
                            name="availableBeds"
                            min="0"
                            step="1"
                            placeholder="Enter available beds"
                            value={bedInfo.availableBeds}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">Create Bed</button>

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate("/dashboard/beds")}
                    >
                        Cancel
                    </button>

                </form>

            </div>

            <ToastContainer />

        </div>
    );
}

export default AddBed;
