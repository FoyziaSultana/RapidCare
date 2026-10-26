import {
    Cross, Hospital, LayoutDashboard, BedDouble, Stethoscope, Ambulance,
    Droplets, Users, ShieldCheck, KeyRound, Settings, LogOut
} from "lucide-react";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {

    const [permissions, setPermissions] = useState([]);


    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch(`${import.meta.env.VITE_API_URL}/userPermission/permissions`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        })
            .then(response => response.json())

            .then(data => {

                console.log("Sidebar Permissions:", data);

                if (data.success) {

                    setPermissions(data.permissions);

                }

            })

            .catch(error => {

                console.log("Permission Error:", error);

            });

    }, []);


    const hasPermission = (permissionName) => {

        return permissions.includes(permissionName);

    };


    return (

        <aside className="dashboard-sidebar">


            <div className="sidebar-menu">

                <p className="menu-title">
                    MAIN MENU
                </p>


                {hasPermission("view_dashboard") && (

                    <a href="#" className="sidebar-link active">

                        <LayoutDashboard size={19} />

                        <span>Dashboard</span>

                    </a>

                )}



                {hasPermission("view_hospital") && (

                    <Link to = "/dashboard/hospitals" className="sidebar-link">

                        <Hospital size={19} />

                        <span>Hospitals</span>

                    </Link>

                )}



                {hasPermission("view_bed") && (

                    <Link to ="/dashboard/beds" className="sidebar-link">

                        <BedDouble size={19} />

                        <span>Beds</span>

                    </Link>

                )}


                {hasPermission("view_doctor") && (

                    <a href="#" className="sidebar-link">

                        <Stethoscope size={19} />

                        <span>Doctors</span>

                    </a>

                )}


                {hasPermission("view_ambulance") && (

                    <a href="#" className="sidebar-link">

                        <Ambulance size={19} />

                        <span>Ambulance</span>

                    </a>

                )}


                {hasPermission("view_blood_bank") && (

                    <a href="#" className="sidebar-link">

                        <Droplets size={19} />

                        <span>Blood Bank</span>

                    </a>

                )}


                <p className="menu-title management-title">
                    MANAGEMENT
                </p>


                {hasPermission("view_users") && (

                    <a href="#" className="sidebar-link">

                        <Users size={19} />

                        <span>Users</span>

                    </a>

                )}


                {hasPermission("view_roles") && (

                    <a href="#" className="sidebar-link">

                        <ShieldCheck size={19} />

                        <span>Roles</span>

                    </a>

                )}


                {hasPermission("view_permissions") && (

                    <a href="#" className="sidebar-link">

                        <KeyRound size={19} />

                        <span>Permissions</span>

                    </a>

                )}

            </div>


            <div className="sidebar-bottom">


                {hasPermission("view_settings") && (

                    <a href="#" className="sidebar-link">

                        <Settings size={19} />

                        <span>Settings</span>

                    </a>

                )}


                <button className="logout-btn">

                    <LogOut size={19} />

                    <span>Logout</span>

                </button>


            </div>

        </aside>

    );

}

export default Sidebar;