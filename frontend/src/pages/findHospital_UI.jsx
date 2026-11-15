
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hospital, MapPin, Phone } from "lucide-react";
import "./findHospital_UI.css";

function FindHospitals() {

    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getHospitals();
    }, []);

    const getHospitals = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/hospital/approved`
            );

            const data = await response.json();

            if (data.success) {
                setHospitals(data.hospitals);
            }

        } catch (error) { } finally {
            setLoading(false);
        }
    };

    return (
        <section className="find-hospital">

            <div className="find-hospital-container">

                <div className="find-hospital-header">
                    <h2>Find Hospitals</h2>
                    <p>Find hospitals and healthcare services</p>
                </div>

                {hospitals.length === 0 ? (

                    <p className="hospital-message">No hospitals available.</p>

                ) : (

                    <div className="hospital-list">

                        {hospitals.map((hospital) => (

                            <div className="hospital-card" key={hospital._id}>

                                <div className="hospital-title">

                                    <div className="hospital-logo">
                                        <Hospital size={24} />
                                    </div>

                                    <div>
                                        <h3>{hospital.hospitalName}</h3>
                                        <p className="hospital-type">
                                            {hospital.hospitalType}
                                        </p>
                                    </div>

                                </div>

                                <div className="hospital-info">

                                    <p>
                                        <MapPin size={18} />
                                        {hospital.hospitalAddress}
                                    </p>


                                    <p>
                                        <Phone size={18} />
                                        {hospital.hospitalPhone}
                                    </p>

                                </div>

                                <button
                                    className="hospital-details-btn"
                                    onClick={() => navigate(`/hospital/${hospital._id}`)}
                                >
                                    View Details
                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </section>
    );
}

export default FindHospitals;
