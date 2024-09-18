import React, { useState } from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBIcon, MDBCollapse } from 'mdb-react-ui-kit';
import "./Navbar.css";

export default function Navbar() {
  const [openNavSecond, setOpenNavSecond] = useState(false);

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/' className='navbar-brand'>CatFinder</MDBNavbarBrand>
        <MDBNavbarToggler
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNavSecond(!openNavSecond)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNavSecond}>
          <MDBNavbarNav>
            <MDBNavbarLink active aria-current='page' href='/'>
              Home
            </MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' href='/about'>
              About
            </MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' href='/admin'>
              Admin
            </MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' href='/register'>
              Create Account
            </MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' href='/login'>
              Log In
            </MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' href='/user-profile'>
              User Profile
            </MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' href='/external-login'>
              External Log In
            </MDBNavbarLink>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
