import {
    BedDouble,
    HeartPulse,
    Stethoscope,
    Ambulance
} from "lucide-react";

import "./dashboradMainContent.css";

function DashboardMainContent() {

    return (
        <main className="dashboard-content">

            <div className="welcome-section">
                <h1>Welcome to RapidCare</h1>
                <p>
                    Monitor your hospital resources from one place.
                </p>
            </div>


            <div className="stats-grid">

                <div className="stat-card">

                    <div className="stat-info">
                        <p>Available Beds</p>
                        <h2>86</h2>
                        <span>+8% from last week</span>
                    </div>

                    <div className="stat-icon bed-icon">
                        <BedDouble size={25} />
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-info">
                        <p>ICU Beds</p>
                        <h2>12</h2>
                        <span>4 currently occupied</span>
                    </div>

                    <div className="stat-icon icu-icon">
                        <HeartPulse size={25} />
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-info">
                        <p>Available Doctors</p>
                        <h2>24</h2>
                        <span>18 on duty</span>
                    </div>

                    <div className="stat-icon doctor-icon">
                        <Stethoscope size={25} />
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-info">
                        <p>Ambulances</p>
                        <h2>07</h2>
                        <span>5 available now</span>
                    </div>

                    <div className="stat-icon ambulance-icon">
                        <Ambulance size={25} />
                    </div>

                </div>

            </div>


            <div className="resource-card">

                <h2>Resource Overview</h2>

                <p>
                    Current hospital resource availability
                </p>

            </div>

        </main>
    );
}

export default DashboardMainContent;