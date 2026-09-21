
import Navbar from "./components/Navbar";


import {Routes, Route} from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";


function App() {
  return (
    <div className = "App">
      <Navbar />
      <div className="pt-[80px]">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

      </div>

      
    </div>
  );
}

export default App;

