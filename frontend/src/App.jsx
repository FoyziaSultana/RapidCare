
import Navbar from "./components/Navbar";


import { Routes, Route } from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import HospitalRegistration from "./pages/HospitalRegistration";
import Dashboard from "./pages/DashBoard";
import DashboardMainContent from "./components/DashboardComponent/dashboardMainContent";
import ProtectedRoute from "./components/protectedRoute";
import AdminGetAllHospitals from "./pages/adminGetAllHospital"
import Bed from "./components/DashboardComponent/hospitalBed";
import AddBed from "./components/DashboardComponent/addBed";
import EditBed from "./components/DashboardComponent/editBed";
import GetAllMedicalResource from "./components/DashboardComponent/getAllMedicalResource";
import AddMedicalResource from "./components/DashboardComponent/addMedicalResource";
import EditMedicalResource from "./components/DashboardComponent/editMedicalResource";
import AdminAmbulance from "./components/DashboardComponent/ambulanceManagement";
import AddAmbulance from "./components/DashboardComponent/addAmbulance";
import EditAmbulance from "./components/DashboardComponent/editAmbulance";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="pt-[80px]">

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/hospitalRegister" element={<HospitalRegistration />} />


          <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}>
            <Route index element={<DashboardMainContent />} />
            <Route path="hospitals" element={<AdminGetAllHospitals />} />
            <Route path="beds" element={<Bed />} />
            <Route path="beds/add" element={<AddBed />} />
            <Route path="beds/edit/:bedId" element={<EditBed />} />
            <Route path="medicalResource" element={<GetAllMedicalResource />} />
            <Route path="medicalResource/add" element={<AddMedicalResource />} />
            <Route path="medicalResource/edit/:medicalResourceId" element={<EditMedicalResource />} />
            <Route path="ambulances" element={<AdminAmbulance/>} />
            <Route path="ambulances/add" element={<AddAmbulance/>} />
            <Route path="ambulances/update/:ambulanceId" element={<EditAmbulance/>} />
          </Route>


        </Routes>

      </div>


    </div>
  );
}

export default App;

