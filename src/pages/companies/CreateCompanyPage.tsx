

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';


const CreateCompanyPage = () => {
  const navigate = useNavigate();

  const [companyData, setCompanyData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    logo: '',
    description: '',
    userIds: [],
    adminId: null, // L'ID de l'administrateur principal sera défini automatiquement
    address: {
      street: '',
      zipCode: '',
      city: '',
      country: '',
    },
  });

  const handlePhoneNumberChange = (value: any) => {
    setCompanyData({
      ...companyData,
      phoneNumber: value,
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Récupère le premier fichier sélectionné (vous pouvez gérer plusieurs fichiers si nécessaire)
  
    if (file) {
      // Crée un objet URL pour obtenir le chemin d'accès du fichier
      const fileURL = URL.createObjectURL(file);
  
      // Met à jour l'état avec le chemin d'accès du fichier
      setCompanyData({
        ...companyData,
        logo: fileURL,
      });
    }
  };
  

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value,
      address: {
        ...companyData.address,
        [name]: value,
      },


    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Envoyez la requête pour créer une nouvelle entreprise
      const response = await axios.post('http://localhost:8081/companies/create', companyData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Redirigez l'utilisateur vers la page de gestion de l'entreprise nouvellement créée
      navigate(`/company/${response.data.id}/${response.data.name}`);
    } catch (error) {
      console.error('Erreur lors de la création de l\'entreprise :', error);
      // Gérez les erreurs ici, par exemple, affichez un message d'erreur à l'utilisateur
    }
  };

  return (
    <Container>
      <h2>Create Company</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={companyData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={companyData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <div style={{ width: "20%" }}>
            <PhoneInput
              value={companyData.phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>

        </Form.Group>
        {/* <Form.Group controlId="logo">
          <Form.Label>Logo URL</Form.Label>
          <Form.Control
            type="file"
            name="logo"
            accept='image/*'
            onChange={handleFileInputChange}

          /> */}
        <Form.Group controlId="logo">
          <Form.Label>Logo URL</Form.Label>
          <Form.Control
            type="text"
            name="logo"
            value={companyData.logo}
            onChange={handleInputChange}
          
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={companyData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <h3>Address</h3>
        <Form.Group controlId="street">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            name="street"
            value={companyData.address.street}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="zipCode">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            name="zipCode"
            value={companyData.address.zipCode}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={companyData.address.city}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={companyData.address.country}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary mt-3" type="submit">
          Create Company
        </Button>
      </Form>
    </Container>
  );
};

export default CreateCompanyPage;

