

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { Link,Navigate,useNavigate } from "react-router-dom";
import Messages from "../../components/Messages";




const YourCompaniesPage: React.FC = () => {
    const [companies, setCompanies] = useState([]);
    const token = localStorage.getItem("token");  // Récuperation le jeton JWT du stockage local
    const userId = localStorage.getItem("userId");
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const navigate = useNavigate();

    const handleDeleteCompany = (companyId: any) => {
    


        if (token) {
            // Si un jeton JWT est présent, envoyez-le dans l'en-tête de la requête DELETE
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            // Effectuez une requête DELETE pour supprimer l'entreprise avec l'ID spécifié
            axios
                .delete(`http://localhost:8081/companies/${companyId}`, { headers })
                .then((response) => {
                    // La suppression a réussi, vous pouvez mettre à jour l'état de votre composant ou effectuer d'autres actions nécessaires
                    setDeleteSuccess(true);
                    window.localStorage.setItem("companylogo", response.data.logo)
                    navigate(`/user/${userId}/start`)

                })
                .catch((error) => {
                    console.error("Erreur lors de la suppression de l'entreprise :", error);
                });


        }
    };


    useEffect(() => {
        if (token) {
            // Si un jeton JWT est présent, envoie-le dans l'en-tête de la requête GET
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            // Effectue une requête GET pour récupérer la liste des entreprises créées par l'utilisateur
            axios
                .get("http://localhost:8081/companies/all-Company", { headers })
                .then((response) => {
                    // Filtrer les entreprises pour ne montrer que celles de l'administrateur actuel
                    const filteredCompanies = response.data.filter((company: { adminId: string | null; }) => company.adminId == userId);
                    setCompanies(filteredCompanies);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des entreprises :", error);
                });

        }
    }, [token]);

   

    return (
        <Container>
            {deleteSuccess && <Alert>Entreprise supprimée avec succès.</Alert>}
            <h1>Your Companies</h1>
            {companies.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((company: any) => (
                            <tr key={company.id}>
                                <td>{company.name}</td>
                                <td>{company.email}</td>
                                <td>{company.phoneNumber}</td>
                                <td>
                                    <Link to={`/company/${company.id}/${company.name}`}>
                                        <Button variant="primary">Manage</Button>
                                    </Link>{" "}
                                    <Button variant="danger" onClick={() => handleDeleteCompany(company.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
    
                </Table>
            ) : (
                    <div>
                        <p>You have not created any companies yet.</p>
                        <Link to={"/create-company"}>
                            <Button variant="outline-primary">Create here</Button>
                        </Link>
                    </div>

            )}
        </Container>
    );
};

export default YourCompaniesPage;

