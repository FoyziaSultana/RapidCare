import Sidebar from "../components/DashboardComponent/sidebar";
import DashboardContent from "../components/DashboardComponent/dashboardMainContent";
import "./Dashboard.css";


function Dashboard() {

    return (
        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-main">

                <DashboardContent />

            </div>

        </div>
    );
}

export default Dashboard;