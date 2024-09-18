import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Maps from "../Maps/Maps";
import {
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
} from 'mdb-react-ui-kit';
import "./PetDetail.css"; // Import the external CSS file

export default function PetDetail() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto'
  });
  
  const { petName, petDescription, petCity, imageUrl } = useLocation().state;
  const { petID } = useParams();

  return (
    <div>
      <MDBCardBody>
        <MDBCardTitle className="card-title">{`About ${petName}`}</MDBCardTitle>
        <MDBCardImage
          src={imageUrl}
          alt={`The picture of ${petName}`}
          position='top'
          className="card-image"
        />
        <MDBCardText className="card-text">
          {petDescription}
        </MDBCardText>
      </MDBCardBody>
      <p className="location-p">Where {petName} is located: </p>
      <div className="map-container" key={`map-${petID}`}>
        <Maps cityName={petCity} />
      </div>
    </div>
  );
}
