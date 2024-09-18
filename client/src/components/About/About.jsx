import React from 'react';
import {MDBFooter,
  MDBCarousel, 
  MDBCarouselItem, 
  MDBCarouselCaption,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle, 
  MDBCardText,
  MDBCardFooter,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow, 
  MDBIcon} from 'mdb-react-ui-kit';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./About.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function About() {
  return (
    <div>
      <h1>CatFinder</h1>
      <h2>Where Adoption Begins</h2>
      <Container>
      
      <Container className='d-block h-50'>
      <Row className="justify-content-center py-5">
      <MDBCol xl={8}>
        <MDBCarousel showIndicators showControls fade>
          <MDBCarouselItem itemId={1}>
            <img src='https://images.pexels.com/photos/1358689/pexels-photo-1358689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='d-block w-100' alt='Cat licking paw' />
            <MDBCarouselCaption>
              <h5>Kitten Care Guide</h5>
              <p>Do you wonder what your kitten need? Check it out! </p>
            </MDBCarouselCaption>
          </MDBCarouselItem>

          <MDBCarouselItem itemId={2}>
            <img src='https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg' className='d-block w-100' alt='Cat rests on couch' />
            <MDBCarouselCaption>
              <h5>Adult Cat Care Guide</h5>
              <p>Take care of your adult cat with these special tips! </p>
            </MDBCarouselCaption>
          </MDBCarouselItem>

          <MDBCarouselItem itemId={3}>
            <img src='https://images.pexels.com/photos/5958799/pexels-photo-5958799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='d-block w-100' alt='...' />
            <MDBCarouselCaption>
              <h5>Senior Cat Care Guide</h5>
              <p>Your senior cat needs your love. </p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
        </MDBCarousel>
      </MDBCol>
    </Row>
    </Container>

    <Container className='d-block h-50 py-5'>
    <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://images.pexels.com/photos/266784/pexels-photo-266784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            alt='A taby cat sleeping on a fluffy carpet'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Adoption Story of the Month</MDBCardTitle>
            <MDBCardText>
            Meet Abby the tabby, who was adopted by a loving couple a year ago. Ho wis he doing now? Let's find out! 
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://images.pexels.com/photos/12577521/pexels-photo-12577521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            alt='A calico cat'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>CatFinder's Staff of the Month</MDBCardTitle>
            <MDBCardText>
              Meet Taco the calico! She has been working with us since 2022. 
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://images.pexels.com/photos/15381494/pexels-photo-15381494/free-photo-of-photo-of-a-calico-cat-on-a-concrete-surface.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            alt='A long-hair calico cat sitting on street.'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Help Cats on the Streets</MDBCardTitle>
            <MDBCardText>
              There are many ways you can help improving a cat's life. We're working very hard to save lives, and we need your help too. 
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
    </MDBRow>
    </Container>
  </Container>
    </div>
    
  );
}