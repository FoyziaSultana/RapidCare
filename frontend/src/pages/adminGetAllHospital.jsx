
import { useEffect, useState } from "react";
import "./adminGetAllHospital.css"

function AdminHospitals() {

    const [hospitals, setHospitals] = useState([]);


    const getHospitals = () => {

        const token = localStorage.getItem("token");

        fetch("http://localhost:5005/admin/hospitals", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        })

            .then(response => response.json())

            .then(data => {

                console.log("Hospitals:", data);

                if (data.success) {
                    setHospitals(data.hospitals);
                }

            })

            .catch(error => {
                console.log("Hospital Error:", error);
            });

    };


    useEffect(() => {

        getHospitals();

    }, []);


    const updateStatus = (hospitalId, status) => {

        const token = localStorage.getItem("token");


        fetch(
            `http://localhost:5005/admin/hospitals/${hospitalId}/status`,
            {
                method: "PATCH",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    status: status
                })
            }
        )

            .then(response => response.json())

            .then(data => {

                console.log("Status Update:", data);

                if (data.success) {

                    getHospitals();

                }

            })

            .catch(error => {

                console.log("Status Error:", error);

            });

    };


    return (

        <div className="admin-hospitals">

            <div className="admin-hospitals-header">

                <h1>Hospital Management</h1>

                <p>All registered hospitals</p>

            </div>


            <div className="hospital-table-card">

                <table className="hospital-table">

                    <thead>

                        <tr>

                            <th>Hospital Name</th>

                            <th>Licence</th>

                            <th>Type</th>

                            <th>Email</th>

                            <th>Phone</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {hospitals.map((hospital) => (

                            <tr key={hospital._id}>

                                <td className="hospital-name">
                                    {hospital.hospitalName}
                                </td>

                                <td>
                                    {hospital.hospitalLicence}
                                </td>

                                <td>
                                    {hospital.hospitalType}
                                </td>

                                <td>
                                    {hospital.hospitalEmail}
                                </td>

                                <td>
                                    {hospital.hospitalPhone}
                                </td>

                                <td>

                                    <span
                                        className={`status status-${hospital.status}`}
                                    >
                                        {hospital.status}
                                    </span>

                                </td>


                                <td>

                                    {hospital.status === "pending" && (

                                        <div className="action-buttons">

                                            <button
                                                className="approve-btn" onClick={() => updateStatus(
                                                    hospital._id, "approved"
                                                )
                                                }
                                            >
                                                Approve
                                            </button>


                                            <button
                                                className="reject-btn" onClick={() => updateStatus(
                                                    hospital._id, "rejected"
                                                )}
                                            >
                                                Reject
                                            </button>

                                        </div>

                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default AdminHospitals;

