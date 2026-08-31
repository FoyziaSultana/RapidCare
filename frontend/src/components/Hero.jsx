import {Search, ArrowRight, LocateFixed, Siren, Activity, BedDouble, HeartPulse, Droplets, Ambulance,} from "lucide-react";

function Hero() {
    return (
    <section className=" bg-gradient-to-br from-slate-50 via-white to-teal-50/40">
        <div className=" max-w-7xl mx-auto px-6">

        <div className="min-h-[480px] py-16 lg:py-20 grid lg:grid-cols-2 gap-14 items-center">

            <div>

            <div className="flex items-center gap-2 mb-5">
                <span className="w-2.5 h-2.5 bg-teal-500 rounded-full"></span>

                <span className="text-[14px] tracking-[0.12em] font-semibold text-teal-600">
                Healthcare availability, simplified
                </span>
            </div>


            
            <h1 className="text-5xl lg:text-[54px] leading-[1.08] font-bold tracking-tight text-slate-900 max-w-xl">
                Find care when{" "}
                <span className="text-teal-600">
                every second matters.
                </span>
            </h1>


            
            <p className="mt-6 text-[20px] leading-7 text-slate-500 max-w-xl">
                Search nearby hospitals, check live bed and medical resource
                availability, find doctors, and send a booking request from
                one place.
            </p>


            
            <div className="mt-7 flex items-center max-w-[515px] h-[56px] bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

                <div className="flex items-center gap-3 flex-1 px-4">

                <Search
                    size={25}
                    className="text-slate-400 shrink-0"
                />

                <input
                    type="text"
                    placeholder="Search hospital, specialty or resource"
                    className="w-full outline-none text-base text-slate-700 placeholder:text-slate-400 "
                />

                </div>


                <button className="h-[40px] mr-2 px-5 flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-lg transition-colors">
                Search
                <ArrowRight size={20} />
                </button>

            </div>


            
            <div className="mt-4 flex items-center gap-3 flex-wrap">

                <button className="h-[42px] px-4 flex items-center gap-2 border border-slate-300 bg-white rounded-lg text-base font-semibold text-slate-700 hover:border-teal-400 hover:text-teal-600 transition-colors">
                <LocateFixed size={20} />
                Find hospitals near me
                </button>


                <button className="h-[42px] px-3 flex items-center gap-2 text-base font-semibold text-teal-600 hover:text-teal-700 transition-colors">
                <Siren size={20} />
                Emergency care
                </button>

            </div>

            </div>


        
        <div className="flex justify-end ">

            <div className="w-full max-w-[465px] bg-white border border-slate-200 rounded-[24px] shadow-lg p-6 ">

            
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">

                <div className="flex items-center gap-2">

                    <span className="w-2.5 h-2.5 bg-teal-500 rounded-full"></span>

                    <span className="text-[15px] font-semibold tracking-wide text-teal-600">
                    Live availability
                    </span>

                </div>

                <span className="text-[15px] text-slate-400">
                    Updated just now
                </span>

                </div>


            
                <div className="flex items-center gap-4 py-5">

                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                    <Activity size={25} />
                </div>

                <div>
                    <h3 className="text-[19px] font-semibold text-slate-800">
                    Emergency resources
                    </h3>

                    <p className="text-base text-slate-400 mt-0.5">
                    Sylhet city area
                    </p>
                </div>

                </div>


            
                <div className="grid grid-cols-2 gap-3 ">

                <Resource
                    icon={<BedDouble size={20} />}
                    value="22"
                    label="ICU Beds"
                />

                <Resource
                    icon={<HeartPulse size={20} />}
                    value="15"
                    label="Ventilators"
                />

                <Resource
                    icon={<Droplets size={20} />}
                    value="100"
                    label="Oxygen"
                />

                <Resource
                    icon={<Ambulance size={20} />}
                    value="11"
                    label="Ambulance"
                />

                </div>


            
                <button className="mt-5 pt-4 w-full border-t border-slate-100 flex items-center justify-between text-base font-semibold text-teal-600 hover:text-teal-700 transition-colors">

                <span>
                    View nearby availability
                </span>

                <ArrowRight size={20} />

                </button>

            </div>

            </div>

        </div>

        </div>
    </section>
    );
}


function Resource({ icon, value, label }) {
    return (
    <div className="h-[64px] border border-slate-200 rounded-xl px-4 flex items-center gap-3">

        <div className="text-teal-600 shrink-0">
        {icon}
        </div>

        <div>
        <p className="text-[20px] font-bold text-slate-800 leading-none">
            {value}
        </p>

        <p className="text-[15px] text-slate-500 mt-1">
            {label}
        </p>
        </div>

    </div>
    );
}

export default Hero;