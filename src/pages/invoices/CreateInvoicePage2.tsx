import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const CreateInvoicePage = () => {
    const [formData, setFormData] = useState({
        invoiceNumber: '',
        invoiceDate: '',
        totalAmount: '',
        addressId: '',
        taxId: '',
        discountId: '',
        clientId: '',
        statusId: '',
        paymentMethodId: '',
        invoiceLines: [] as { productId: string; quantity: number; unitPrice: number, subtotal: number }[],
    });

    const [newLine, setNewLine] = useState({
        productId: '',
        quantity: 0,
        unitPrice: 0,
        subtotal: 0,
    });

    const handleLineChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setNewLine({ ...newLine, [name]: value });
    };


    const handleAddLine = () => {
        // // Ajoutez la nouvelle ligne au tableau des lignes de facture
        // setFormData({
        //     ...formData,
        //     invoiceLines: [...formData.invoiceLines, newLine],
        // });

        // // Réinitialisez les champs de la nouvelle ligne
        // setNewLine({
        //     product: '',
        //     quantity: 0,
        //     unitPrice: 0,
        // });

        // Obtenez le produit sélectionné à partir de l'ID du produit
        // const selectedProduct = products.find((product) => product.id === newLine.productId);

        // Calculez le sous-total pour la nouvelle ligne
        // const quantity = parseFloat(newLine.quantity);
        // const unitPrice = parseFloat(newLine.unitPrice);
        // const subtotal = isNaN(quantity) || isNaN(unitPrice) ? 0 : quantity * unitPrice;

        // Ajoutez la nouvelle ligne au tableau des lignes de facture
        // setFormData({
        //     ...formData,
        //     invoiceLines: [
        //         ...formData.invoiceLines,
        //         {
        //             productId: newLine.productId,
        //             quantity: newLine.quantity,
        //             unitPrice: newLine.unitPrice,
        //             subtotal,
        //         },
        //     ],
        // });

        // // Réinitialisez les champs de la nouvelle ligne
        setNewLine({
            productId: '',
            quantity: 0,
            unitPrice: 0,
            subtotal: 0,
        });
    };

     // Obtenez les produits disponibles depuis votre API
    const [products, setProducts] = useState([]); // Stockez les produits ici


    const handleEditLine = (index: number) => {
        // Obtenez la ligne de facture sélectionnée
        const selectedLine = formData.invoiceLines[index];

        // Pré-remplissez les champs de formulaire avec les valeurs actuelles
        // setNewLine({
        //     product: selectedLine.product,
        //     quantity: selectedLine.quantity,
        //     unitPrice: selectedLine.unitPrice,
        // });

        // Supprimez la ligne de facture du tableau
        const updatedLines = [...formData.invoiceLines];
        updatedLines.splice(index, 1);
        setFormData({
            ...formData,
            invoiceLines: updatedLines,
        });
    };

    const handleDeleteLine = (index: number) => {
        const updatedLines = [...formData.invoiceLines];
        updatedLines.splice(index, 1);
        setFormData({
            ...formData,
            invoiceLines: updatedLines,
        });
    };



    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.status === 201) {
                // Facture créée avec succès, redirigez l'utilisateur ou affichez un message de réussite
            } else {
                // Gestion des erreurs si la création de la facture a échoué
            }
        } catch (error) {
            console.error('Erreur lors de la création de la facture', error);
        }
    };

    // Fonction pour récupérer les données nécessaires pour les listes déroulantes (par exemple, les clients, les taxes, les rabais, etc.)
    const fetchDropdownData = async () => {
        try {
            // Récupérez les données depuis votre API et mettez-les dans le state local pour les listes déroulantes
        } catch (error) {
            console.error('Erreur lors de la récupération des données pour les listes déroulantes', error);
        }
    };

    useEffect(() => {
        fetchDropdownData();
    }, []);

    return (
        <Container>
            <h1>Créer une Facture</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="invoiceNumber">
                    <Form.Label>Numéro de Facture</Form.Label>
                    <Form.Control
                        type="text"
                        name="invoiceNumber"
                        value={formData.invoiceNumber}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="invoiceDate">
                    <Form.Label>Date de Facture</Form.Label>
                    <Form.Control
                        type="date"
                        name="invoiceDate"
                        value={formData.invoiceDate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Ajoutez d'autres champs du formulaire ici pour les références (dropdowns) */}
                {/* Exemple pour un dropdown de client */}
                <Form.Group controlId="clientId">
                    <Form.Label>Client</Form.Label>
                    <Form.Control
                        as="select"
                        name="clientId"
                        value={formData.clientId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionnez un client</option>
                        {/* Remplissez les options avec les clients disponibles */}
                    </Form.Control>
                </Form.Group>

                {/* Dropdown pour les Lignes de Facture */}
                {/* <Form.Group controlId="invoiceLines">
                    <Form.Label>Lignes de Facture</Form.Label>
                    <Form.Control
                        as="select"
                        name="invoiceLines"
                        multiple // Permet de sélectionner plusieurs lignes
                        value={formData.invoiceLines}
                        onChange={handleChange}
                        required
                    > */}
                {/* Remplissez les options avec les lignes de facture disponibles */}
                {/* <option value="1">Ligne de Facture 1</option>
                        <option value="2">Ligne de Facture 2</option>
                        <option value="3">Ligne de Facture 3</option> */}
                {/* Ajoutez d'autres options en fonction de vos données */}
                {/* </Form.Control>
                </Form.Group> */}

                {/* Section pour ajouter des lignes de facture */}
                <div className="border p-3 mt-2">
                    <h2>Lignes de Facture</h2>
                    <Row>
                        <Col>
                            <Form.Group controlId="product">
                                <Form.Label>Produit</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="product"
                                    value={newLine.productId}
                                    onChange={handleLineChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="quantity">
                                <Form.Label>Quantité</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="quantity"
                                    value={newLine.quantity}
                                    onChange={handleLineChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="unitPrice">
                                <Form.Label>Prix Unitaire</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="unitPrice"
                                    value={newLine.unitPrice}
                                    onChange={handleLineChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col className="align-self-end">
                            <Button
                                variant="primary"
                                onClick={handleAddLine}
                            >
                                Ajouter
                            </Button>
                        </Col>
                    </Row>
                    <ul>
                        {/* Affichez les lignes de facture ajoutées */}
                        {formData.invoiceLines.map((line, index) => (
                            <li key={index}>
                                {/* Produit: {line.product}, Quantité: {line.quantity}, Prix Unitaire: {line.unitPrice} */}
                                <Button variant="info" onClick={() => handleEditLine(index)}>Modifier</Button>
                                <Button variant="danger" onClick={() => handleDeleteLine(index)}>Supprimer</Button>
                            </li>
                        ))}
                    </ul>
                </div>


                {/* Dropdown pour la Taxe */}
                <Form.Group controlId="taxId">
                    <Form.Label>Taxe</Form.Label>
                    <Form.Control
                        as="select"
                        name="taxId"
                        value={formData.taxId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionnez une taxe</option>
                        {/* Remplissez les options avec les taxes disponibles */}
                    </Form.Control>
                </Form.Group>

                {/* Dropdown pour le Rabais */}
                <Form.Group controlId="discountId">
                    <Form.Label>Rabais</Form.Label>
                    <Form.Control
                        as="select"
                        name="discountId"
                        value={formData.discountId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionnez un rabais</option>
                        {/* Remplissez les options avec les rabais disponibles */}
                    </Form.Control>
                </Form.Group>





                {/* Ajoutez d'autres dropdowns pour les autres références (taxes, rabais, etc.) de manière similaire */}

                <Form.Group controlId="totalAmount">
                    <Form.Label>Montant Total</Form.Label>
                    <Form.Control
                        type="number"
                        name="totalAmount"
                        value={formData.totalAmount}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Dropdown pour le Mode de Paiement */}
                <Form.Group controlId="paymentMethodId">
                    <Form.Label>Mode de Paiement</Form.Label>
                    <Form.Control
                        as="select"
                        name="paymentMethodId"
                        value={formData.paymentMethodId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionnez un mode de paiement</option>
                        {/* Remplissez les options avec les modes de paiement disponibles */}
                    </Form.Control>
                </Form.Group>

                {/* Dropdown pour le Statut de la Facture */}
                <Form.Group controlId="statusId">
                    <Form.Label>Statut de la Facture</Form.Label>
                    <Form.Control
                        as="select"
                        name="statusId"
                        value={formData.statusId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionnez un statut</option>
                        {/* Remplissez les options avec les statuts de facture disponibles */}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary mt-2" type="submit">
                    Créer la Facture
                </Button>
            </Form>
        </Container>
    );
};

export default CreateInvoicePage;
