import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, logOut } from "../../redux/slice/userSlice";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge
} from 'mdb-react-ui-kit';
import "./Profile.css";

export default function UserProfile() {

  const [tokenError, setTokenError] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation(); 

  const token = location?.state?.token;
  const userInfoJson = localStorage.getItem("userInfo");
  const userInfo = userInfoJson ? JSON.parse(userInfoJson) : null;

  const {applications, profile, error, loading} = useSelector((state)=>{
    return state?.user?.userProfile;
  });

  // use useEffect to ensure action is only dispatched when token is changed
  useEffect(() => {
    if (token) {
      dispatch(getUserProfile({ token }));
    } else if (userInfo) {
      const token2 = userInfo.token;
      dispatch(getUserProfile({ token: token2 }));
    } else {
      setTokenError('Invalid or missing token. Please log in again.');
    }
  }, [token, applications]);

  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      const info = { ...profile, token: token }; 
      localStorage.setItem('userInfo', JSON.stringify(info)); 
    }
  }, [profile, token]); 
  
  const logOutHandler = () => {
    dispatch(logOut);
  }

  //console.log(profile);
  //console.log(applications);

  return (
    <section className="profile-container">
      {tokenError}
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="rounded-3 p-3 mb-4 breadcrumb-bg">
              <MDBBreadcrumbItem>
                <a href='/'>Home</a>
              </MDBBreadcrumbItem>
             
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://png.pngtree.com/element_our/20200610/ourmid/pngtree-cat-default-avatar-image_2246581.jpg"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">{profile?.userName || "null"}</p>
                
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profile?.userName || "null"}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profile?.userEmail || "null"}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Year of Birth</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profile?.userBirthYear || "null"}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">Applications</MDBCardText>

                      {applications.map((application, index) => (
                        <MDBRow  key={index} className="mt-4 mb-1">
                        <MDBCol sm="9">
                          <MDBCardText style={{ fontSize: '.77rem' }}>
                            {application.pet.petName}, {application.pet.petCity}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="3">
                          <MDBBadge className="mx-1" color="info">
                            <MDBIcon icon="check" />{application.applicationStatus}
                          </MDBBadge>
                        </MDBCol>
                    </MDBRow>
                    ))}

                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
        
        <MDBBtn style={ {width: '150px', height: '38px'}} href="/" onClick={logOutHandler}>
          Log Out
        </MDBBtn>
        
      </MDBContainer>
    </section>
  );
}
  