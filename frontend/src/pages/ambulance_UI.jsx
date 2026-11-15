
import { useState, useEffect } from "react";
import { Ambulance, Hospital } from "lucide-react";
import "./ambulance_UI.css";

function AmbulanceView() {

    const [ambulances, setAmbulances] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAmbulances();
    }, []);

    const getAmbulances = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/ambulance/view`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            console.log("Ambulance API Response:", data);

            if (data.success) {
                setAmbulances(data.ambulances);
            }

        } catch (error) {} finally {
            setLoading(false);
        }
    };

    const hospitalList = Object.values(

        ambulances.reduce((groups, ambulance) => {

            if (!ambulance.hospitalId) {
                return groups;
            }

            const hospitalId = ambulance.hospitalId._id;

            if (!groups[hospitalId]) {

                groups[hospitalId] = {
                    id: hospitalId,
                    hospitalName: ambulance.hospitalId.hospitalName,
                    ambulances: []
                };

            }

            groups[hospitalId].ambulances.push(ambulance);

            return groups;

        }, {})

    );

    return (

        <section className="ambulance-container" id="ambulance">

            <div className="ambulance-header">

                <span>Ambulance</span>

                <h2>Current Ambulance Availability</h2>

            </div>

            { hospitalList.length === 0 ? (

                <p className="ambulance-message">No ambulance information available.</p>

            ) : (

                <div className="ambulance-list">

                    {hospitalList.map(hospital => (

                        <div className="ambulance-card" key={hospital.id}>

                            <div className="ambulance-title">

                                <div className="ambulance-hospital-icon">
                                    <Hospital size={20} />
                                </div>

                                <div>
                                    <h3>{hospital.hospitalName}</h3>
                                    <p>Available Ambulances</p>
                                </div>

                            </div>

                            <div className="ambulance-grid">

                                {hospital.ambulances.map(ambulance => (

                                    <div className="ambulance-item" key={ambulance._id}>

                                        <Ambulance size={24} />

                                        <h4>{ambulance.vehicalNumber}</h4>

                                        <p>{ambulance.ambulanceDriverName}</p>

                                        <a href={`tel:${ambulance.ambulanceDriverPhone}`}>Call Now</a>

                                    </div>

                                ))}

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </section>

    );

}

export default AmbulanceView;
