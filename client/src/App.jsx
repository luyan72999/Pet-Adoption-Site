import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AddPet from "./components/Admin/AddPet";
import EditPet from "./components/Admin/EditPet";
import ManageApplication from "./components/Admin/ManageApplication";
import Login from "./components/Users/Login";
import RegistrationForm from "./components/Users/RegistrationForm";
import UserProfile from "./components/Users/UserProfile"
import About from "./components/About/About";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"
import Adopt from "./components/Pet/Adopt";
import PetDetail from "./components/Pet/PetDetail";
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* admin route: role protection will be done later */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="add-pet" element={<AddPet />} />
          <Route path="edit/:petID" element={<EditPet />} />
          <Route path="manage-application" element={<ManageApplication />} />
        </Route>

        {/* public links */}
        {/* Pets */}
        <Route path="/" element={<Adopt />} />
        <Route path="/detail/:petID" element={<PetDetail />} />
        

        {/* users: with role protection */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;