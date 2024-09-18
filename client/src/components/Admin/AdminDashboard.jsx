import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { getPets, deletePet } from '../../redux/slice/petSlice';
import {
  MDBBtn,
}
from 'mdb-react-ui-kit';
import "./Admin.css";

export default function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

     // get all pets
     useEffect(() => {
      dispatch(getPets({}));
    }, [dispatch]);

    const {error, loading, pets} = useSelector((state)=>{
      return state?.pet;
    });

    //console.log(pets.data);

    const handleEditPet = (petID) => {
      navigate(`/admin/edit/${petID}`);
    };
  
    const handleDeletePet = (petID) => {
      dispatch(deletePet(petID));
    };

    const handleAddPet = () => {
      navigate("/admin/add-pet");
    };

    const handleApplication = () => {
      navigate("/admin/manage-application");
    };

    return (
      <div className="admin-dashboard">
        <p>Welcome, admin!</p>
        <h2>Manage Pets</h2>
        <MDBBtn  style={ {width: '180px', height: '40px'} } onClick={() => handleAddPet() }>Add Pet</MDBBtn>
        <MDBBtn style={ {width: '180px', height: '40px'} } className="mx-4" onClick={() => handleApplication()}>Manage Applications</MDBBtn>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Pet ID</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Gender</th>
              <th scope="col">BirthYear</th>
              <th scope="col">City</th>
              <th scope="col">Description</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {pets?.data?.map((pet) => (
            <tr key={pet.petID}>
              <td>{pet.petID}</td>
              <td>
                <img src={pet.imageUrl} alt={`${pet.petName}`} style={{ width: '50px', height: '50px'}} />
              </td>
              <td>{pet.petName}</td>
              <td>{pet.petGender}</td>
              <td>{pet.petBirthYear}</td>
              <td>{pet.petCity}</td>
              <td>{pet.petDescription}</td>
              <td>
                <MDBBtn style={ {width: '10vw', height: '10vh'} } className="mx-4" color="info" onClick={() => handleEditPet(pet.petID)}>Edit</MDBBtn>
              </td>
              <td>
                <MDBBtn  style={ {width: '10vw', height: '10vh'} }  className="mx-4" color="danger" onClick={() => handleDeletePet(pet.petID)}>Delete</MDBBtn>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        <Outlet />
      </div>
    );
}
