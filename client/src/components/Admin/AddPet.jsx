import { Form, Button, Alert } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPet, getPets, resetIsAdded} from '../../redux/slice/petSlice';
import { useNavigate } from 'react-router-dom';


export default function AddPet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    petName: '',
    petGender: '',
    petBirthYear: '',
    petCity: '',
    petImageUrl: '',
    petDescription: '',
  });

  const { petName, petGender, petBirthYear, petCity, petImageUrl, petDescription} = formData;

  const [validationErrors, setErrors] = useState({});
  const [descriptionError, setDescriptionError] = useState(false);

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
    const { name, value } = e.target;
    
    // Check if petDescription is over 140 characters
    if (name === 'petDescription') {
      setDescriptionError(value.length > 140);
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //---onsubmit handler----
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      //console.log({ petName, petGender, petBirthYear, petCity, petImageUrl, petDescription});
      dispatch(createPet({petName, petGender, petBirthYear, petCity, petImageUrl, petDescription}));
      //console.log("dispatched!")
    } else {
      setErrors(validationErrors);
    }
  };

  const {error, loading, pet, isAdded, pets} = useSelector((state)=>{
    return state?.pet;
  });

  useEffect(() => {
    if (isAdded) {
      dispatch(getPets({}));
      navigate('/admin');
      dispatch(resetIsAdded());
    }
  }, [isAdded, navigate]);

    return (
      <div>
        <h2>AddPet</h2>
        <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3 p-3" controlid="petName">
          <Form.Label>Pet Name</Form.Label>
          <Form.Control
            type="text"
            name="petName"
            controlid="petName"
            value={petName}
            onChange={onChangeHandler}
          />
          {validationErrors.petName && <Alert variant="danger">{validationErrors.petName}</Alert>}
        </Form.Group>

         <Form.Group className="mb-3 p-3" controlid="petGender">
          <Form.Label>Pet Gender</Form.Label>
          <div>
            <Form.Check
              type="radio"
              name="petGender"
              controlid="male"
              label="Male"
              value="male"
              checked={petGender === 'male'}
              onChange={onChangeHandler}
            />
            <Form.Check
              type="radio"
              name="petGender"
              controlid="female"
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

        <Form.Group className="mb-3 p-3" controlid="petBirthYear">
          <Form.Label>Pet Birth Year</Form.Label>
          <Form.Control
            type="text"
            name="petBirthYear"
            controlid="petBirthYear"
            value={petBirthYear}
            onChange={onChangeHandler}
          />
          {validationErrors.petBirthYear && <Alert variant="danger">{validationErrors.petBirthYear}</Alert>}
        </Form.Group>

        <Form.Group className="mb-3 p-3" controlid="petCity">
          <Form.Label>Pet City</Form.Label>
          <Form.Control
            type="text"
            name="petCity"
            controlid="petCity"
            value={petCity}
            onChange={onChangeHandler}
          />
          {validationErrors.petCity && <Alert variant="danger">{validationErrors.petCity}</Alert>}
        </Form.Group>

        <Form.Group className="mb-3 p-3" controlid="petImageUrl">
          <Form.Label>Pet Image URL</Form.Label>
          <Form.Control
            type="text"
            name="petImageUrl"
            controlid="petImageUrl"
            value={petImageUrl}
            onChange={onChangeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3 p-3" controlid="petDescription">
          <Form.Label>Pet Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="petDescription"
            controlid="petDescription"
            value={petDescription}
            placeholder='No more than 140 characters'
            onChange={onChangeHandler}
          />
           {descriptionError && (
              <Alert variant="danger">
                Description must be no more than 140 characters.
              </Alert>
            )}
        </Form.Group>

        <Button className="m-3" variant="primary" type="submit">
          Add
        </Button>
      </Form>
      </div>
    );
}
  