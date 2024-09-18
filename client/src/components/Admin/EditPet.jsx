import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Form, Button, Alert } from 'react-bootstrap';
import { editPet, getPets, resetIsUpdated } from '../../redux/slice/petSlice';
import { useNavigate } from 'react-router-dom';

export default function EditPet() {

  const { petID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let pets = useSelector((state) => state.pet?.pets?.data);
  const pet = pets?.find((pet) => pet.petID == petID);  // pet.petID is int and petID is string, so use == not ===
  console.log(pet);
  
  const [formData, setFormData] = useState({
    petName: '',
    petGender: '',
    petBirthYear: '',
    petCity: '',
    petImageUrl: '',
    petDescription: '',
  });

  useEffect(() => {
    if (pet) {
      setFormData({
        petName: pet.petName,
        petGender: pet.petGender,
        petBirthYear: pet.petBirthYear,
        petCity: pet.petCity,
        petImageUrl: pet.imageUrl,
        petDescription: pet.petDescription,
      });
    }
  }, [pet, petID]);

  const { petName, petGender, petBirthYear, petCity, petImageUrl, petDescription} = formData;
  const [validationErrors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    const required = ['petName', 'petGender', 'petBirthYear', 'petCity'];

    required.forEach((field) => {
      if (!formData[field]) {
        errors[field] = `${field} is required.`;
      }
    });

    return errors;
  };

  //---onchange handler----
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //---onsubmit handler----
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      //console.log({ petName, petGender, petBirthYear, petCity, petImageUrl, petDescription});
      dispatch(editPet({petName, petGender, petBirthYear, petCity, petImageUrl, petDescription, petID}));
      //console.log("dispatched!")
    } else {
      setErrors(validationErrors);
    }
  };

  let {error, loading, isUpdated} = useSelector((state)=>{
    return state?.pet;
  });

  useEffect(() => {
    if (isUpdated) {
      dispatch(getPets({}));
      navigate('/admin');
      dispatch(resetIsUpdated());
    }
  }, [isUpdated, navigate]);

  return (
    <div>
      <h2>Edit Pets</h2>  
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3 p-3" controlId="petName">
          <Form.Label>Pet Name</Form.Label>
          <Form.Control
            type="text"
            name="petName"
            id="petName"
            value={petName}
            onChange={onChangeHandler}
          />
          {validationErrors.petName && <Alert variant="danger">{validationErrors.petName}</Alert>}
        </Form.Group>

         <Form.Group className="mb-3 p-3" controlId="petGender">
          <Form.Label>Pet Gender</Form.Label>
          <div>
            <Form.Check
              type="radio"
              name="petGender"
              id="male"
              label="Male"
              value="male"
              checked={petGender === 'male'}
              onChange={onChangeHandler}
            />
            <Form.Check
              type="radio"
              name="petGender"
              id="female"
              label="Female"
              value="female"
              checked={petGender === 'female'}
              onChange={onChangeHandler}
            />
          </div>
          {validationErrors.petGender && (
            <Alert variant="danger">{validationErrors.petGender}</Alert>
          )}
        </Form.Group>

        <Form.Group className="mb-3 p-3" controlId="petBirthYear">
          <Form.Label>Pet Birth Year</Form.Label>
          <Form.Control
            type="text"
            name="petBirthYear"
            id="petBirthYear"
            value={petBirthYear}
            onChange={onChangeHandler}
          />
          {validationErrors.petBirthYear && <Alert variant="danger">{validationErrors.petBirthYear}</Alert>}
        </Form.Group>

        <Form.Group className="mb-3 p-3" controlId="petCity">
          <Form.Label>Pet City</Form.Label>
          <Form.Control
            type="text"
            name="petCity"
            id="petCity"
            value={petCity}
            onChange={onChangeHandler}
          />
          {validationErrors.petCity && <Alert variant="danger">{validationErrors.petCity}</Alert>}
        </Form.Group>

        <Form.Group className="mb-3 p-3" controlId="petImageUrl">
          <Form.Label>Pet Image URL</Form.Label>
          <Form.Control
            type="text"
            name="petImageUrl"
            id="petImageUrl"
            value={petImageUrl}
            onChange={onChangeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3 p-3" controlId="petDescription">
          <Form.Label>Pet Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="petDescription"
            id="petDescription"
            value={petDescription}
            onChange={onChangeHandler}
          />
        </Form.Group>

        <Button className="m-3" variant="primary" type="submit">
          Update
        </Button>
      </Form>
    
        
    </div>
  );
}
  