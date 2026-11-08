
import "./bloodManagement.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";

function EditBlood() {

    const navigate = useNavigate();
    const { bloodId } = useParams();

    const [permissions, setPermissions] = useState([]);
    const [bloodInfo, setBloodInfo] = useState(null);
    const [permissionLoading, setPermissionLoading] = useState(true);
    const [bloodLoading, setBloodLoading] = useState(true);

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
            .catch(error => {(error);})
            .finally(() => {
                setPermissionLoading(false);
            });


        fetch(`${import.meta.env.VITE_API_URL}/blood/view`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {

                if (data.success) {

                    const selectedBlood = data.bloods.find(
                        blood => blood._id === bloodId
                    );

                    if (selectedBlood) {
                        setBloodInfo(selectedBlood);
                    } else {
                        handleError("Blood record not found!");
                    }

                } else {
                    handleError("Failed to load blood information!");
                }

            })
            .catch(error => {
                handleError("Something went wrong");
            })
            .finally(() => {
                setBloodLoading(false);
            });

    }, [bloodId]);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setBloodInfo({
            ...bloodInfo,
            [name]: value
        });

    };


    const updateBlood = async (e) => {

        e.preventDefault();

        const { bloodGroup, totalBags, availableBags } = bloodInfo;

        if (bloodGroup.trim() === "" || availableBags === "") {
            return handleError("Fillup all information");
        }

        if (Number(availableBags) <= 0) {
            return handleError("Please enter a valid number of blood units");
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/blood/update/${bloodId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        bloodGroup: bloodGroup.trim(),
                        totalBags: Number(totalBags),
                        availableBags: Number(availableBags)
                    })
                }
            );

            const result = await response.json();

            if (result.success) {

                handleSuccess(result.message || "Blood updated successfully!");

                setTimeout(() => { navigate("/dashboard/bloods"); }, 700);

            } else {
                handleError(result.message || "Blood update failed!");
            }

        } catch (error) {
            handleError("Something went wrong");
        }

    };


    if (permissionLoading || bloodLoading) {
        return null;
    }

    if (!permissions.includes("update_blood")) {
        return null;
    }

    if (!bloodInfo) {
        return null;
    }


    return (

        <div className="bed-container">

            <div className="edit-bed-card">

                <h2>Update Blood</h2>

                <form onSubmit={updateBlood}>

                    <label>Blood Group</label>

                    <select
                        name="bloodGroup"
                        value={bloodInfo.bloodGroup}
                        onChange={handleChange}
                    >
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

                    <label>Total Bags</label>

                    <input type="number" name="totalBags" min="0"
                        value={bloodInfo.totalBags}
                        onChange={handleChange}
                    />
                    <label>Available Units</label>

                    <input type="number" name="availableBags" min="0"
                        value={bloodInfo.availableBags}
                        onChange={handleChange}
                    />


                    <div className="edit-buttons">

                        <button type="submit" className="update-btn">
                            Update
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/dashboard/blood")}
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

export default EditBlood;
