
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Hospital, MapPin, Phone, BedDouble, Activity, Droplets,Ambulance } from "lucide-react";

import "./hospitalDetails_UI.css";

function HospitalDetails() {

    const { hospitalId } = useParams();

    const [hospital, setHospital] = useState(null);
    const [beds, setBeds] = useState([]);
    const [activeTab, setActiveTab] = useState("Overview");
    const [loadingBeds, setLoadingBeds] = useState(true);

    useEffect(() => {
        getHospitalDetails();
        getBeds();
    }, [hospitalId]);

    const getHospitalDetails = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/hospital/approved/${hospitalId}`
            );

            const data = await response.json();

            if (data.success) {
                setHospital(data.hospital);
            }

        } catch (error) {} finally {
            setLoading(false);
        }

    };

    const getBeds = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/bed/view/${hospitalId}`
            );

            const data = await response.json();

            if (data.success) {
                setBeds(data.beds);
            }

        } catch (error) {} finally {
            setLoadingBeds(false);
        }

    };

    if (!hospital) {
        return <p>Hospital information not found!</p>;
    }

    const tabs = [
        { name: "Overview", icon: Hospital },
        { name: "Beds", icon: BedDouble },
        { name: "Resources", icon: Activity },
        { name: "Blood", icon: Droplets },
        { name: "Ambulance", icon: Ambulance }
    ];

    const showBeds = () => {

        if (loadingBeds) {
            return <p>Loading beds...</p>;
        }

        if (beds.length === 0) {
            return <p className="empty-message">No bed information available.</p>;
        }

        return (
            <div className="bed-list">

                {beds.map((bed) => (

                    <div className="bed-card" key={bed._id}>

                        <h3>{bed.bedType}</h3>

                        <p className="bed-available">
                            {bed.availableBeds}
                        </p>

                        <p>Available Beds</p>

                        <div className="bed-total">
                            Total Beds: {bed.totalBeds}
                        </div>

                    </div>

                ))}

            </div>
        );

    };

    const showContent = () => {

        if (activeTab === "Overview") {
            return (
                <>
                    <div className="content-heading">
                        <h2>Hospital Overview</h2>
                        <p>Hospital information and available facilities</p>
                    </div>

                    <div className="overview-section">
                        <h3>Available Beds</h3>
                        {showBeds()}
                    </div>
                </>
            );
        }

        if (activeTab === "Beds") {
            return (
                <>
                    <div className="content-heading">
                        <h2>Available Beds</h2>
                        <p>Check available beds in this hospital</p>
                    </div>

                    {showBeds()}
                </>
            );
        }

        return (
            <div className="coming-soon">
                {activeTab === "Resources" && <Activity size={40} />}
                {activeTab === "Blood" && <Droplets size={40} />}
                {activeTab === "Ambulance" && <Ambulance size={40} />}

                <h3>{activeTab}</h3>
                <p>No information is currently available</p>
            </div>
        );

    };

    return (

        <section className="hospital-details">

            <div className="hospital-details-container">

                <div className="hospital-info-card">

                    <div className="hospital-details-header">

                        <div className="details-logo">
                            <Hospital size={32} />
                        </div>

                        <div className="details-title">
                            <h2>{hospital.hospitalName}</h2>
                            <p>{hospital.hospitalType}</p>
                        </div>

                    </div>

                    <div className="hospital-contact-info">

                        <p>
                            <MapPin size={19} />
                            {hospital.hospitalAddress}
                        </p>

                        <p>
                            <Phone size={19} />
                            {hospital.hospitalPhone}
                        </p>

                    </div>

                </div>

                <div className="hospital-content-card">

                    <div className="hospital-tabs">

                        {tabs.map((tab) => {

                            const Icon = tab.icon;

                            return (
                                <button
                                    key={tab.name}
                                    className={ activeTab === tab.name ? "hospital-tab active-tab" : "hospital-tab" }
                                    onClick={() => setActiveTab(tab.name)}
                                >
                                    <Icon size={18} />
                                    {tab.name}
                                </button>
                            );

                        })}

                    </div>

                    <div className="tab-content">
                        {showContent()}
                    </div>

                </div>

            </div>

        </section>

    );

}

export default HospitalDetails;
