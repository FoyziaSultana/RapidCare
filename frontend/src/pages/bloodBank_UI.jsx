
import { useState, useEffect } from "react";
import { Droplets, Hospital } from "lucide-react";
import "./BloodBank_UI.css";

function BloodBank() {

    const [bloods, setBloods] = useState([]);
    const [loading, setLoading] = useState(true);

    const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    useEffect(() => {
        getBloods();
    }, []);


const getBloods = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/blood/view`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();


        if (data.success) {
            setBloods(data.bloods);
        }

    } catch (error) {} finally {
        setLoading(false);
    }
};


    const hospitalList = Object.values(

        bloods.reduce((groups, blood) => {

            if (!blood.hospitalId) {
                return groups;
            }

            const hospitalId = blood.hospitalId._id;

            if (!groups[hospitalId]) {

                groups[hospitalId] = {
                    id: hospitalId,
                    hospitalName: blood.hospitalId.hospitalName,
                    bloods: []
                };

            }

            groups[hospitalId].bloods.push(blood);

            return groups;

        }, {})

    );

    return (

        <section className="bank-container" id="blood-bank">

            <div className="bank-header">

                <span>BLOOD BANK</span>

                <h2>Current Blood Availability</h2>

            </div>

            { hospitalList.length === 0 ? (

                <p className="bank-message">No blood information available.</p>

            ) : (

                <div className="bank-list">

                    {hospitalList.map(hospital => (

                        <div className="bank-card" key={hospital.id}>

                            <div className="bank-title">

                                <div className="bank-hospital-icon">
                                    <Hospital size={20} />
                                </div>

                                <div>
                                    <h3>{hospital.hospitalName}</h3>
                                    <p>Available Blood Groups</p>
                                </div>

                            </div>

                            <div className="bank-grid">

                                {groups.map(group => {

                                    const blood = hospital.bloods.find( item => item.bloodGroup === group );

                                    const bags = blood ? blood.availableBags : 0;

                                    return (

                                        <div className="bank-item" key={group}>

                                            <Droplets size={20} />

                                            <h4>{group}</h4>

                                            <h3>{bags}</h3>

                                            <p>bags available</p>

                                        </div>

                                    );

                                })}

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </section>

    );

}

export default BloodBank;
