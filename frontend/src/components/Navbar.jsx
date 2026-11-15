import { Cross, Bell } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import { useState, useEffect } from "react";
import { isLoggedIn, logoutUser } from "../checkLoginStatus/isLoggedIn";

function Navbar() {

    const navigate = useNavigate();

    const location = useLocation();

    const isDashboard = location.pathname === "/dashboard" || location.pathname === "/profile";

    const [loggedIn, setLoggedIn] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [active, setActive] = useState("home");

    useEffect(() => {

        const checkLogin = () => {

            const loginStatus = isLoggedIn();

            setLoggedIn(loginStatus);

            if (loginStatus) {

                const token = localStorage.getItem("token");

                fetch(`${import.meta.env.VITE_API_URL}/userPermission/permissions`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {

                        console.log("Permission Data:", data);

                        if (data.success) {
                            setPermissions(data.permissions);
                        }

                    })
                    .catch(error => {
                        console.log("Permission Error:", error);
                    });

            } else {

                setPermissions([]);

            }
        };

        checkLogin();

        window.addEventListener("login", checkLogin);

        return () => {
            window.removeEventListener("login", checkLogin);
        };

    }, []);


    const handleLogout = () => {

        logoutUser();

        setLoggedIn(false);

        setPermissions([]);

        navigate("/");

    };


    return (

        <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200">

            <nav className="max-w-7xl mx-auto h-[83px] px-6 flex items-center justify-between">



                <div className="flex items-center gap-2.5">

                    <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center">

                        <Cross
                            size={20}
                            strokeWidth={3}
                            className="text-white"
                        />

                    </div>


                    <h1 className="text-xl font-bold tracking-tight text-slate-900">

                        Rapid<span className="text-teal-600">Care</span>

                    </h1>

                </div>


                <div className="hidden md:flex items-center gap-7">


                    <button
                        onClick={() => { setActive("home"); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className={`px-3 py-2 rounded-lg text-lg font-semibold ${active === "home" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-teal-50 hover:text-teal-700"}`}
                    >
                        Home
                    </button>

                    <button
                        onClick={() => { setActive("findHospital"); navigate("/find-hospitals"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className={`px-3 py-2 rounded-lg text-lg font-semibold ${active === "findHospital" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-teal-50 hover:text-teal-700"}`}
                    >
                        Find Hospitals
                    </button>

                    <button
                        onClick={() => { setActive("bloodBank"); navigate("/blood-banks"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className={`px-3 py-2 rounded-lg text-lg font-semibold ${active === "bloodBank" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-teal-50 hover:text-teal-700"}`}
                    >
                        Blood Bank
                    </button>

                    <button
                        onClick={() => { setActive("ambulance"); navigate("/ambulances"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className={`px-3 py-2 rounded-lg text-lg font-semibold ${active === "ambulance" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-teal-50 hover:text-teal-700"}`}
                    >
                        Ambulance
                    </button>


                    <button
                        onClick={() => { setActive("about"); navigate("/about"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className={`px-3 py-2 rounded-lg text-lg font-semibold ${active === "about" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-teal-50 hover:text-teal-700"}`}
                    >
                        About
                    </button>


                    {permissions.includes("view_dashboard") && (

                        <button
                        onClick={() => { setActive("dashboard"); navigate("/dashboard"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className={`px-3 py-2 rounded-lg text-lg font-semibold ${active === "dashboard" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-teal-50 hover:text-teal-700"}`}
                    >
                            Dashboard
                        </button>

                    )}

                </div>



                <div className="flex items-center gap-4">


                    <button
                        className=" w-9 h-9 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors duration-200 "
                    >

                        <Bell size={18} />

                    </button>



                    {!loggedIn && (

                        <>

                            <button
                                onClick={() => navigate("/login")}
                                className=" text-xl font-semibold text-slate-800 hover:text-teal-600 transition-colors duration-200 "
                            >
                                Sign in
                            </button>



                            <button
                                onClick={() => navigate("/signup")}
                                className=" px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-lg shadow-lg transition-colors duration-200 "
                            >
                                Get Started
                            </button>

                        </>

                    )}



                    {loggedIn && !isDashboard && (

                        <button
                            onClick={handleLogout}
                            className=" px-5 py-2.5 bg-teal-400 hover:bg-red-600 text-white text-lg font-semibold rounded-lg shadow-lg transition-colors duration-200 "
                        >
                            Logout
                        </button>

                    )}

                    {loggedIn && isDashboard && (

                        <button
                            onClick={() => navigate("/")}
                            className=" px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-lg shadow-lg transition-colors duration-200 "
                        >
                            Profile
                        </button>

                    )}

                </div>

            </nav>

        </header>

    );

}

export default Navbar;