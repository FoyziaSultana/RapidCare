
import { useEffect, useState } from "react";
import "./adminGetAllHospital.css"

import { handleError, handleSuccess } from "../toastmsg"
import { ToastContainer } from 'react-toastify';


function AdminHospitals() {

    const [hospitals, setHospitals] = useState([]);

    const [permissions, setPermissions] = useState([]);




    const getHospitals = () => {

        const token = localStorage.getItem("token");

        fetch("http://localhost:5005/dashboard/hospitals", {

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






    const getPermissions = () => {

        const token = localStorage.getItem("token");

        fetch("http://localhost:5005/userPermission/permissions", {
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
            });

    };





    {/* has permission funtion to check weather permission is valid or not */ }

    const hasPermission = (permissionName) => {
        return permissions.includes(permissionName);
    };







    useEffect(() => {

        getHospitals();
        getPermissions();

    }, []);








    const updateStatus = (hospitalId, status) => {

        const token = localStorage.getItem("token");


        fetch(
            `http://localhost:5005/dashboard/hospitals/${hospitalId}/status`,
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









    /* edit hospital nformation*/
    const [editHospitalInformation, setEditedHospitalInformation] = useState(null);




    const handleEditHospitalInformation = (hospital) => {
        setEditedHospitalInformation(hospital);
    }




    {/* update funtion for updating hospital data */ }

    const updateHospital = () => {

        const token = localStorage.getItem("token");

        const latitude = editHospitalInformation.hospitalLocation.coordinates[1];
        const longitude = editHospitalInformation.hospitalLocation.coordinates[0];

        fetch(`http://localhost:5005/dashboard/hospitals/${editHospitalInformation._id}`, {

            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                hospitalName: editHospitalInformation.hospitalName,
                hospitalLicence: editHospitalInformation.hospitalLicence,
                hospitalType: editHospitalInformation.hospitalType,
                hospitalEmail: editHospitalInformation.hospitalEmail,
                hospitalPhone: editHospitalInformation.hospitalPhone,
                hospitalAddress: editHospitalInformation.hospitalAddress,
                latitude: latitude,
                longitude: longitude
            })

        })
            .then(response => response.json())

            .then(data => {

                console.log("Hospital Update:", data);

                if (data.success) {

                    setEditedHospitalInformation(null);
                    getHospitals();

                } else {

                    alert(data.message);
                }
            })

            .catch(error => {

                console.log("Update Error:", error);

            });
    };




    {/* Delete hosptal Function */ }

    
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

                                            {hasPermission("approve_hospital") && (<button
                                                className="approve-btn" onClick={() => updateStatus(
                                                    hospital._id, "approved"
                                                )
                                                }
                                            >
                                                Approve
                                            </button>)}


                                            {hasPermission("reject_hospital") && (<button
                                                className="reject-btn" onClick={() => updateStatus(
                                                    hospital._id, "rejected"
                                                )}
                                            >
                                                Reject
                                            </button>)}

                                        </div>

                                    )}

                                    {hasPermission("update_hospital") && (<button className="edit-btn" onClick={() => handleEditHospitalInformation(hospital)}>
                                        Edit
                                    </button>)}

                                    


                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>







            {/* Edit hospital INFormation form */}


            {editHospitalInformation && hasPermission("update_hospital") && (

                <div className="edit-hospital-card">

                    <h2>Update Hospital Information</h2>

                    <input
                        type="text" value={editHospitalInformation.hospitalName}
                        onChange={(e) => setEditedHospitalInformation({ ...editHospitalInformation, hospitalName: e.target.value })
                        }
                        placeholder="Hospital Name"
                    />

                    <input
                        type="text" value={editHospitalInformation.hospitalLicence}
                        onChange={(e) => setEditedHospitalInformation({ ...editHospitalInformation, hospitalLicence: e.target.value })
                        }
                        placeholder="Hospital Licence"
                    />

                    <input
                        type="text" value={editHospitalInformation.hospitalType}
                        onChange={(e) => setEditedHospitalInformation({ ...editHospitalInformation, hospitalType: e.target.value })
                        }
                        placeholder="Hospital Type"
                    />

                    <input
                        type="email"
                        value={editHospitalInformation.hospitalEmail}
                        onChange={(e) => setEditedHospitalInformation({ ...editHospitalInformation, hospitalEmail: e.target.value })
                        }
                        placeholder="Hospital Email"
                    />

                    <input
                        type="text" value={editHospitalInformation.hospitalPhone}
                        onChange={(e) => setEditedHospitalInformation({ ...editHospitalInformation, hospitalPhone: e.target.value })
                        }
                        placeholder="Hospital Phone"
                    />

                    <input
                        type="text" value={editHospitalInformation.hospitalAddress}
                        onChange={(e) => setEditedHospitalInformation({ ...editHospitalInformation, hospitalAddress: e.target.value })
                        }
                        placeholder="Hospital Address"
                    />

                    <input
                        type="text" value={editHospitalInformation.hospitalLocation.coordinates[1]}
                        onChange={(e) => setEditedHospitalInformation({
                            ...editHospitalInformation,
                            hospitalLocation: {
                                ...editHospitalInformation.hospitalLocation,
                                coordinates: [
                                    editHospitalInformation.hospitalLocation.coordinates[0],
                                    e.target.value
                                ]
                            }
                        })
                        }
                        placeholder="Latitude"
                    />

                    <input
                        type="text" value={editHospitalInformation.hospitalLocation.coordinates[0]}
                        onChange={(e) => setEditedHospitalInformation({
                            ...editHospitalInformation,
                            hospitalLocation: {
                                ...editHospitalInformation.hospitalLocation,
                                coordinates: [e.target.value, editHospitalInformation.hospitalLocation.coordinates[1]]
                            }
                        })
                        }
                        placeholder="Longitude"
                    />

                    <div className="edit-buttons">

                        <button className="update-btn" onClick={updateHospital}> Update </button>

                        <button className="cancel-btn" onClick={() => setEditedHospitalInformation(null)}> Cancel </button>

                    </div>

                </div>

            )}

        </div>
    );
}





export default AdminHospitals;

