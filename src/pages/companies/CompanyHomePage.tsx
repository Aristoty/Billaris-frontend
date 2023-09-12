import React, { useEffect, useState } from 'react';
import { useParams, Link  } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Image } from 'react-bootstrap';


const CompanyHomePage: React.FC = () => {
  const { companyId } = useParams(); // Récupère l'ID de l'entreprise à partir de l'URL
  
  const [company, setCompany] = useState<any>({});
  const token = localStorage.getItem("token"); 
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (token) {
        // Si un jeton JWT est présent, envoyez-le dans l'en-tête de la requête DELETE
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        // Effectuez une requête GET pour récupérer les détails de l'entreprise
        axios
        .get(`http://localhost:8081/companies/${companyId}`, { headers })
        .then((response) => {
            setCompany(response.data);
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des détails de l'entreprise :", error);
        });

    }
  }, [companyId]);


  return (
 <Container fluid>
      <Row>
        <Col md={3} className="bg-primary text-white p-4">
          <h5 className='bg-warning text-primary'>Dashboard</h5>
          <ul className="list-unstyled">
            <li>
              <Link to={`/create-invoice/${companyId}`} className="btn btn-outline-light mt-2 mb-2 " style={{fontWeight: 'bold'}}>
                Create Invoice
              </Link>
            </li>
            <li>
              <Link to={`/your-invoices/${companyId}`} className="btn btn-outline-light mt-2 mb-2  " style={{fontWeight: 'bold'}}>
                Your Invoices
              </Link>
            </li>
            <li>
              <Link to={`/manage-invoices/${companyId}`} className="btn btn-outline-light mt-2 mb-2 "style={{fontWeight: 'bold'}}>
                Manage Invoices
              </Link>
            </li>
            <li>
              <Link to={`/manage-products/${companyId}`} className="btn btn-outline-light mt-2 mb-2 "style={{fontWeight: 'bold'}}>
                Manage Products
              </Link>
            </li>
            <li>
              <Link to={`/manage-users/${companyId}`} className="btn btn-outline-light mt-2 mb-2 "style={{fontWeight: 'bold'}}>
                Manage Users
              </Link>
            </li>
            <li>
              <Link to={`/manage-payment/${companyId}`} className="btn btn-outline-light mt-2 mb-2 "style={{fontWeight: 'bold'}}>
                Payment Method
              </Link>
            </li>
          </ul>
        </Col>
        <Col md={8}>
          <Container>
            <h1>{company.name}</h1>
            <Image src={company.logo} alt={company.name} style={{ maxWidth: '200px', borderRadius: "50%" }} />
            <Row>
              <Col>
                <p >Welcome &ensp;
                    <span style={{ color: 'blue', fontWeight: 'bold', fontSize: 20 }}>
                        {username}
                    </span>
                    , manage your &ensp;
                     <span style={{ color: 'blue', fontWeight: 'bold', fontSize: 20 }}>
                      {company.name}   
                    </span>
                    's company here!
                </p>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyHomePage;
