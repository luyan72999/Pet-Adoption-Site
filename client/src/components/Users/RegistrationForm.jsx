import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetSuccess} from "../../redux/slice/userSlice";
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { Alert } from 'react-bootstrap';


export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
      email: "",
      password: "",
      name: "",
      birthYear: ""
    });
    
    const [validationErrors, setValidationErrors] = useState({});
    const { email, password, name, birthYear} = formData;

    const validateForm = () => {
      const errors = {};
      const required = ['email', 'password', 'name', 'birthYear'];

      required.forEach((field) => {
        if (!formData[field]) {
          errors[field] = `${field} is required.`;
        }
      });

      return errors;
    };

    // //---onchange handler----
    const onChangeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // //---onsubmit handler----
    const onSubmitHandler = (e) => {
      //The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
      e.preventDefault();
      const errors = validateForm(); 
    if (Object.keys(errors).length === 0) { 
      dispatch(registerUser({email, password, name, birthYear}));
      setValidationErrors({});
    } else {
      setValidationErrors(errors);
    }
    };

    const {error, loading, user, success} = useSelector((state)=>{
      return state?.user;
    });

    useEffect(() => {
      if (success) {
        alert("You've created your account!");
        navigate('/login');
        dispatch(resetSuccess())
      }
    }, [success, navigate]);

    return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <form onSubmit={onSubmitHandler}>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg'/>
                  <MDBInput label='Your Email' id='email' name='email' type='email' value={email} onChange={onChangeHandler}/>
                  {validationErrors.email && (
                    <Alert variant="danger">{validationErrors.email}</Alert>
                  )}
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg'/>
                  <MDBInput label='Password' id='password'  name='password' type='password'  value={password} onChange={onChangeHandler}/>
                  {validationErrors.password && (
                    <Alert variant="danger">{validationErrors.password}</Alert>
                  )}
                </div>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size='lg'/>
                  <MDBInput label='Your Name' className='w-100' id='name'  name='name' type='text' value={name} onChange={onChangeHandler}/>
                  {validationErrors.name && (
                    <Alert variant="danger">{validationErrors.name}</Alert>
                  )}
                </div>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size='lg'/>
                  <MDBInput label='Year of Birth' id='birthYear' name='birthYear' value={birthYear} type='text' className='w-100' onChange={onChangeHandler}/>
                  {validationErrors.birthYear && (
                    <Alert variant="danger">{validationErrors.birthYear}</Alert>
                  )}
                </div>

                {error && <p>{error?.message}</p>}

                <div className='mb-4'>
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                </div>

                <MDBBtn style={ {width: '150px', height: '50px'} } className='mb-4' size='lg'>Register</MDBBtn>
              </form>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid alt="An art showing a person walking into a door"/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}
  