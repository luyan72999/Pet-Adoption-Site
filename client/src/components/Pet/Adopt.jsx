import { getUserProfile } from "../../redux/slice/userSlice";
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { getPets, getPetsByCity } from '../../redux/slice/petSlice';
import { createApplication, resetIsApplied } from "../../redux/slice/applicationSlice";
import axios from "axios";
import Maps from "../Maps/Maps";
import './Adopt.css';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBRow,
  MDBCol, 
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Adopt() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [city, setCity] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const ipdataApiKey = "804fa98d02843040728e18d69c47a60a0e11c7f217914edf7d4c11ef";

  // Get user's city based on IP address
  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        // Get user IP address using ipify.org API
        const res = await axios.get('https://api.ipify.org?format=json'); 
        const userIp = res.data.ip;
        // Send user IP to IP API: http://ip-api.com/json/{ip}
        const locationData =  await axios.get(`https://api.ipdata.co/${userIp}?api-key=${ipdataApiKey}`);
        console.log(locationData);
        setCity(locationData.data.city); 
      } catch (err) {
        setGeoError(err);
      }
    };

    fetchIPAddress(); 
  }, []); 

  // Get pets by city
  useEffect(() => {
    dispatch(getPetsByCity(city));
  }, [city, dispatch]);


  const { error, loading, pets, petsByCity } = useSelector((state) => {
    return state?.pet;
  }); 

  const showDetail = (petID, petName, petDescription, petCity, imageUrl) => {
    navigate(`/detail/${petID}`, {
      state: {
        petName,
        petDescription,
        petCity,
        imageUrl
      },
    });
  }

  const apply = (petID) => {
    // Get user email from local storage
    const userInfoJson = localStorage.getItem("userInfo");
    const userInfo = userInfoJson ? JSON.parse(userInfoJson) : null;
    const userEmail = userInfo ? userInfo.userEmail : null;
    if (userEmail) {
      dispatch(createApplication({ userEmail, petID }));
    } else {
      alert("Login required to apply. Please log in first.")
    }
  }

  const applyState = useSelector((state) => {
    return state?.application;
  }); 

  useEffect(() => {
    if (applyState.isApplied) {
      alert("Application sent.")
      dispatch(resetIsApplied());
    }
  }, [applyState.isApplied]);

  useEffect(() => {
    if (applyState.error) {
      alert("You have already applied to this pet. Please wait for the staff to contact you.")
    }
  }, [applyState.error]);
    
  return (
    <>
      <h1>CatFinder</h1>
      <h2>Where Adoption Begins</h2>
      <p className="location-msg">Your current location is <span className="city-font">{city}</span>. The pets in <span className="city-font">{city}</span> are displayed for you.</p>
      {petsByCity?.data?.map((pet) => (
        <MDBRow key={pet.petID} className='row-cols-1 row-cols-md-3 g-4 p-3'>
          <MDBCol key={pet.petID} >
            <MDBCard className='h-100 p-2'>
              <MDBCardImage
                src={pet.imageUrl} 
                alt={`${pet.petName}`}
                position='top'
                style={{ maxWidth: '50vh' }}
              />
              <MDBCardBody>
                <MDBCardTitle>{`${pet.petName}`}</MDBCardTitle>
                <MDBCardText>
                  Birth Year: {pet.petBirthYear}
                  <br />
                  Sex: {pet.petGender}
                  <br />
                  City: {pet.petCity}
                </MDBCardText>
                <MDBBtn className="view-detail" onClick={() => showDetail(pet.petID, pet.petName, pet.petDescription, pet.petCity, pet.imageUrl)}>View Detail</MDBBtn>
                <MDBBtn className="adopt-pet" onClick={() => apply(pet.petID)}>Adopt Pet</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      ))}
    </>
  );
}
