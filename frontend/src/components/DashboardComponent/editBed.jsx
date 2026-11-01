
import "./hospitalBed.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";

function EditBed() {

    const navigate = useNavigate();
    const { bedId } = useParams();

    const [permissions, setPermissions] = useState([]);
    const [bedInfo, setBedInfo] = useState(null);

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


        fetch(`${import.meta.env.VITE_API_URL}/bed/view`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {

                if (data.success) {

                    const selectedBed = data.beds.find(
                        bed => bed._id === bedId
                    );

                    if (selectedBed) {
                        setBedInfo(selectedBed);
                    } else {
                        handleError("Bed not found!");
                    }

                } else {
                    handleError("Failed to load bed information!");
                }

            })
            .catch(error => {
                handleError(error.message);
            })
            .finally(() => {
                setBedLoading(false);
            });

    }, [bedId]);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setBedInfo({
            ...bedInfo,
            [name]: value
        });

    };


    const updateBed = async (e) => {

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
                `${import.meta.env.VITE_API_URL}/bed/update/${bedId}`,
                {
                    method: "PUT",
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

                handleSuccess(result.message || "Bed updated successfully!");

                setTimeout(() => {
                    navigate("/dashboard/beds");
                }, 700);

            } else {

                handleError(result.message || "Bed update failed!");

            }

        } catch (error) {

            handleError(error.message);

        }

    };


    if (permissionLoading || bedLoading) {
        return null;
    }

    if (!permissions.includes("update_bed")) {
        return null;
    }

    if (!bedInfo) {
        return null;
    }


    return (

        <div className="bed-container">

            <div className="edit-bed-card">

                <h2>Update Bed Information</h2>

                <form onSubmit={updateBed}>

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


                    <label>Total Beds</label>

                    <input
                        type="number"
                        name="totalBeds"
                        min="1"
                        step="1"
                        value={bedInfo.totalBeds}
                        onChange={handleChange}
                    />


                    <label>Available Beds</label>

                    <input type="number" name="availableBeds" min="0" step="1" value={bedInfo.availableBeds} onChange={handleChange}/>


                    <div className="edit-buttons">

                        <button type="submit" className="update-btn">
                            Update
                        </button>

                        <button type="button" className="cancel-btn" onClick={() => navigate("/dashboard/beds")}>
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

            <ToastContainer />

        </div>

    );

}

export default EditBed;
