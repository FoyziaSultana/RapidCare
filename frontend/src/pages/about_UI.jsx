
import { HeartPulse, ShieldCheck, Clock } from "lucide-react";
import "./about_UI.css";

function About() {

    return (

        <section id="about" className="about">

            <div className="about-box">

                <div className="about-head">


                    <h2>
                        About <span>Rapid<span className="care">Care</span></span>
                    </h2>

                </div>

                <div className="about-card">

                    <p className="p1">
                        RapidCare is a healthcare support platform designed to make
                        essential medical services more accessible, faster, and easier
                        for everyone. It connects people with nearby hospitals and
                        provides information about available blood supplies, ambulances,
                        and important medical resources.
                    </p>

                    <p className="p2">
                        Our main goal is to reduce the time and effort required to find
                        medical assistance during emergencies. By bringing essential
                        healthcare information together in one user-friendly platform,
                        RapidCare aims to support better healthcare access and help
                        people make informed decisions when every moment matters.
                    </p>

                    <div className="about-list">

                        <div className="about-item">
                            <HeartPulse size={30} />
                            <h3>Healthcare Support</h3>
                            <p>Easy access to healthcare information.</p>
                        </div>

                        <div className="about-item">
                            <ShieldCheck size={30} />
                            <h3>Reliable Information</h3>
                            <p>Find useful medical service information.</p>
                        </div>

                        <div className="about-item">
                            <Clock size={30} />
                            <h3>Emergency Help</h3>
                            <p>Find support when every moment matters.</p>
                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default About;
