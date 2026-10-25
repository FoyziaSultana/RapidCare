import { Outlet } from "react-router-dom";
import Sidebar from "../components/DashboardComponent/sidebar";
import DashboardContent from "../components/DashboardComponent/dashboardMainContent";
import "./Dashboard.css";


function Dashboard() {

    return (
        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-main">

                <Outlet />

            </div>

        </div>
    );
}

export default Dashboard;