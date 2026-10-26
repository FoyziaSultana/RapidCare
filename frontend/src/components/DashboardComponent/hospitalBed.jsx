import "./hospitalBed.css";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
function Bed() {

    const [bedInfo, setBedInfo] = useState({
        bedType: "General",
        totalBeds: "",
        availableBeds: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        const copyBedInfo = { ...bedInfo };
        copyBedInfo[name] = value;

        setBedInfo(copyBedInfo);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { bedType, totalBeds, availableBeds } = bedInfo;

        if (totalBeds === "" || availableBeds === "") {
            return handleError("Fillup all information");
        }

        if (Number(totalBeds) < 0 || Number(availableBeds) < 0 || Number(availableBeds) > Number(totalBeds)
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
                handleSuccess(result.message);

                setBedInfo({
                    bedType: "General",
                    totalBeds: "",
                    availableBeds: ""
                });
            } else {
                handleError(result.message || "Bed creation failed");
            }

        } catch (error) {
            handleError(error.message);
        }
    };

    return (
        <div className="bed-container">

            <form onSubmit={handleSubmit}>
                <h1>Create Bed</h1>

                <div>
                    <label htmlFor="bedType">Bed Type</label>

                    <select name="bedType" id="bedType" value={bedInfo.bedType} onChange={handleChange} >
                        <option value="General">General</option>
                        <option value="Cabin">Cabin</option>
                        <option value="ICU">ICU</option>
                        <option value="NICU">NICU</option>
                        <option value="CCU">CCU</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="totalBeds">Total Beds</label>

                    <input type="number" name="totalBeds" id="totalBeds" min="0" step="1"
                        placeholder="Enter total beds" value={bedInfo.totalBeds} onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="availableBeds">Available Beds</label>

                    <input type="number" name="availableBeds" id="availableBeds" min="0" step="1"
                        placeholder="Enter available beds"
                        value={bedInfo.availableBeds}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Create Bed</button>
            </form>

            <ToastContainer />

        </div>
    );
}

export default Bed;