import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginUser, logOut } from "../../redux/slice/userSlice";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
}
from 'mdb-react-ui-kit';
import "./Profile.css";


export default function Login() {
    // clear local storage
    localStorage.removeItem("userInfo");

    const dispatch = useDispatch();  
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    
    const { email, password } = formData;
    
    // //---onchange handler----
    const onChangeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // //---onsubmit handler----
    const onSubmitHandler = (e) => {
      //The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
      e.preventDefault();
      dispatch(loginUser({email, password}));
    };

    const {error, loading, userInfo} = useSelector((state)=>{
      return state?.user?.userAuth;
    });

    //redirect user to profile using userInfo.token to send a request to http://localhost:8000/api/v1/users/profile
    useEffect(() => {
      if (!userInfo) {
        return;
      }
      console.log(userInfo.token);
      
      if (userInfo?.data?.userRole === "USER") {
        // go to user-profile
        navigate('/user-profile', {
          state: {
            token: userInfo.token, // User token
          },
        });
      
      } else if (userInfo?.data?.userRole === "ADMIN") {
        // go to admin
        navigate('/admin');
      }
    });
    
    return (
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <h3>Sign in to your account</h3>
        <form onSubmit={onSubmitHandler}>
          <MDBInput wrapperClass='mb-4' label='Email Address' id='email' name='email' type='email' value={email} onChange={onChangeHandler}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='password' name='password' type='password' value={password} onChange={onChangeHandler}/>
  
          {/* <div className="d-flex justify-content-between mx-3 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div> */}
    
          <MDBBtn style={ {width: '150px', height: '50px'}} className="mb-4">Sign in</MDBBtn>
        </form>
        {error && <p>{error?.message}</p>}
        
        {/* <div className="text-center">
          <p>Not a member? <a href="#!">Register</a></p>
          <p>or sign up with:</p>
  
          <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='facebook-f' size="sm"/>
            </MDBBtn>
  
            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='twitter' size="sm"/>
            </MDBBtn>
  
            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='google' size="sm"/>
            </MDBBtn>
  
            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='github' size="sm"/>
            </MDBBtn>
  
          </div>
        </div>
   */}
      </MDBContainer>
    );
}
  