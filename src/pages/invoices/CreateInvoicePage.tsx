import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Dropdown } from 'react-bootstrap';

const CreateInvoicePage = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    totalAmount: 0,
    taxId: null, // Utilisez null pour indiquer que l'ID n'est pas encore sélectionné
    discountId: null,
    clientId: null,
    invoiceStatusId: null,
    paymentMethodId: null,
    invoiceLineId: null,
  });


  interface Tax {
    id: number;
    name: string;
    taxRate: any;
    desciption: string;
    createAt: any;
    updateAt: any;
  }

  interface Client {
    id: number;
    name: string;
    taxRate: any;
    desciption: string;
    createAt: any;
    updateAt: any;
  }

  interface InvoiceStatus {
    id: number;
    name: string;
    desciption: string;
  }

  interface Discount {
    id: number;
    name: string;
    desciption: string;
  }

  interface PaymentMethod {
    id: number;
    name: string;
    desciption: string;
    createAt: any;
    updateAt: any;
  }

  interface InvoiceLine {
    id: number;
    quantity: number;
    unitPrice: any;
    subtotal: any;
    product: any;

  }

  interface Product {
    id: number;
    name: string;
    desciption: string;
    unitPrice: any;
    category: any;
    createAt: any;
    updateAt: any;
  }



  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [loadingTaxes, setLoadingTaxes] = useState(false);

  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loadingDiscounts, setLoadingDiscounts] = useState(false);

  const [clients, setClients] = useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);

  const [invoiceStatus, setInvoiceStatus] = useState<InvoiceStatus[]>([]);
  const [loadingInvoiceStatus, setLoadingInvoiceStatus] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(false);

  const [invoiceLines, setInvoiceLines] = useState([
    {
      productId: null,
      quantity: 0,
      unitPrice: 0,
      subtotal: 0,
    },
  ]);
  const [loadingInvoiceLines, setLoadingInvoiceLines] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);


  useEffect(() => {
    // Récupérez la liste des taxes disponibles depuis votre API
    const token = localStorage.getItem('token');
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      setLoadingTaxes(true);
      setLoadingClients(true);   
      setLoadingInvoiceStatus(true);
      setLoadingPaymentMethods(true);
      setLoadingInvoiceLines(true);
      setLoadingProducts(true);
      setLoadingDiscounts(true);


      //Tax
      axios
        .get('http://localhost:8081/taxes', { headers })
        .then((response) => {
          setTaxes(response.data as Tax[]);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des taxes :', error);
        })
        .finally(() => {
          setLoadingTaxes(false);
        });


    
      //Client
      axios
        .get('http://localhost:8081/clients', { headers })
        .then((response) => {
          setClients(response.data as Client[]);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des clients :', error);
        })
        .finally(() => {
          setLoadingClients(false);
        });


      //Invoice Statut
      axios
        .get('http://localhost:8081/invoice-status', { headers })
        .then((response) => {
          setInvoiceStatus(response.data as InvoiceStatus[]);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des status :', error);
        })
        .finally(() => {
          setLoadingInvoiceStatus(false);
        });

        
        //Payment Method
      axios
        .get('http://localhost:8081/payment-methods', { headers })
        .then((response) => {
          setPaymentMethods(response.data as PaymentMethod[]);
        })
        .catch((error) => {
          console.error('Error retrieving payment methods :', error);
        })
        .finally(() => {
          setLoadingPaymentMethods(false);
        });


        // Discount
      axios
        .get('http://localhost:8081/discounts', { headers })
        .then((response) => {
          setDiscounts(response.data as Discount[]);
        })
        .catch((error) => {
          console.error('Error retrieving discounts :', error);
        })
        .finally(() => {
          setLoadingDiscounts(false);
        });



    }
  }, []);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: name === 'totalAmount' ? parseFloat(value) : value, // Convertit le totalAmount en nombre
    });
  };

  //tax
  const handleTaxSelection = (taxId: any) => {
    setInvoiceData({
      ...invoiceData,
      taxId,
    });
  };

  //Client
  const handleClientSelection = (clientId: any) => {
    setInvoiceData({
      ...invoiceData,
      clientId,
    });
  };

  // Invoice status
  const handleInvoiceStatusSelection = (invoiceStatusId: any) => {
    setInvoiceData({
      ...invoiceData,
      invoiceStatusId,
    })
  }

  // Payment Method
  const handlePaymentMethodsSelection = (paymentMethodId: any) =>{
    setInvoiceData({
      ...invoiceData,
      paymentMethodId,
    })
    
  }

    // Discount
    const handleDiscountsSelection = (discountId: any) =>{
      setInvoiceData({
        ...invoiceData,
        discountId,
      })
      
    }


    // Invoice Line
    //add IL
    const addInvoiceLine = () => {
      setInvoiceLines([
        ...invoiceLines,
        {
          productId: null,
          quantity: 0,
          unitPrice: 0,
          subtotal: 0,
        },
      ])
    };
    //delete IL
    const removeInvoiceLine = (index: number) =>{
      const updatedLines = [...invoiceLines];
      updatedLines.splice(index, 1);
      setInvoiceLines(updatedLines);
    };
    //update IL
    const updateInvoiceLine = (index: number, updatedLine: { productId: null; quantity: number; unitPrice: number; subtotal: number; }) =>{
      const updatedLines = [...invoiceLines];
      updatedLines[index] = updatedLine;
      setInvoiceLines(updatedLines);
    }


  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Envoyez la requête pour créer une nouvelle facture avec invoiceData
    // Vous pouvez utiliser axios ou une autre bibliothèque pour cela
    // Gérez la réponse ou les erreurs ici
  };




  return (
    <Container>
      <div className="panel panel-default invoice" id="invoice">
        <div className="panel-body">

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="invoiceNumber">
              <Form.Label>Invoice Number</Form.Label>
              <Form.Control
                type="text"
                name="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="totalAmount">
              <Form.Label>Total Amount</Form.Label>
              <Form.Control
                type="number"
                name="totalAmount"
                value={invoiceData.totalAmount}
                onChange={handleInputChange}
                required
              />
            </Form.Group>


            <Form.Group controlId="taxId">
              <Form.Label>Tax ID</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="tax-dropdown">
                  {invoiceData.taxId ? `Selected Tax ID: ${invoiceData.taxId}` : 'Select Tax ID'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {loadingTaxes ? (
                    <Dropdown.Item>Loading Taxes...</Dropdown.Item>
                  ) : (
                    taxes.map((tax) => (
                      <Dropdown.Item
                        key={tax.id}
                        onClick={() => handleTaxSelection(tax.id)}
                      >
                        {tax.name}
                      </Dropdown.Item>
                    ))
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            
            <Form.Group controlId="clientId">
              <Form.Label>Client ID</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="client-dropdown">
                  {invoiceData.clientId ? `Selected Client ID: ${invoiceData.clientId}` : 'Select Client ID'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {loadingClients ? (
                    <Dropdown.Item>Loading Client...</Dropdown.Item>
                  ) : (
                    clients.map((client) => (
                      <Dropdown.Item
                        key={client.id}
                        onClick={() => handleClientSelection(client.id)}
                      >
                        {client.name}
                      </Dropdown.Item>
                    ))
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group controlId="invoiceStatusId">
              <Form.Label>Invoice Status ID</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="invoiceStatus-dropdown">
                  {invoiceData.invoiceStatusId ? `Selected InvoiceStatus ID: ${invoiceData.invoiceStatusId}` : 'Select invoice Status ID'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {loadingInvoiceStatus ? (
                    <Dropdown.Item>Loading Invoice Status...</Dropdown.Item>
                  ) : (
                    invoiceStatus.map((invoiceStatus) => (
                      <Dropdown.Item
                        key={invoiceStatus.id}
                        onClick={() => handleInvoiceStatusSelection(invoiceStatus.id)}
                      >
                        {invoiceStatus.name}
                      </Dropdown.Item>
                    ))
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group controlId="paymentMethodId">
              <Form.Label>Payment Method ID</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="paymentMethod-dropdown">
                  {invoiceData.paymentMethodId ? `Selected PaymentMethod ID: ${invoiceData.paymentMethodId}` : 'Select Payment Method ID'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {loadingPaymentMethods ? (
                    <Dropdown.Item>Loading Payment Methods...</Dropdown.Item>
                  ) : (
                    paymentMethods.map((paymentMethod) => (
                      <Dropdown.Item
                        key={paymentMethod.id}
                        onClick={() => handlePaymentMethodsSelection(paymentMethod.id)}
                      >
                        {paymentMethod.name}
                      </Dropdown.Item>
                    ))
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group controlId="taxId">
              <Form.Label>Discount ID</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="tax-dropdown">
                  {invoiceData.discountId ? `Selected Discount ID: ${invoiceData.discountId}` : 'Select Discount ID'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {loadingDiscounts ? (
                    <Dropdown.Item>Loading Discounts...</Dropdown.Item>
                  ) : (
                    discounts.map((discount) => (
                      <Dropdown.Item
                        key={discount.id}
                        onClick={() => handleDiscountsSelection(discount.id)}
                      >
                        {discount.name}
                      </Dropdown.Item>
                    ))
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            
            <Button variant="primary mt-3" type="submit">
              Create Invoice
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default CreateInvoicePage;
