import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HospitalRegistration from "./HospitalRegistration.jsx"
import BloodBank from "./bloodBank_UI.jsx";
import Ambulance from "./ambulance_UI.jsx"
import About from "./about_UI.jsx"
function Home() {
    return (
        <div>
            <Hero />
            <BloodBank />
            <Ambulance />
            <About />
        </div>
    );
}

export default Home;