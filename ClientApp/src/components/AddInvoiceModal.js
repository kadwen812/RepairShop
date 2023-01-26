import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddInvoiceModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { invoices: [], loading: true };
    }

    handleSubmit(event) {
        event.preventDefault();
        const service = this.props.services.find(service => service.id === parseInt(event.target.services.value));
        fetch(process.env.REACT_APP_API_URL + 'Invoice', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customerName: event.target.CustomerName.value,
                customerPhone: event.target.CustomerPhone.value,
                paid: false,
                service:  service.name,
                description: service.description,
                price: service.price,
                manufacturer: service.manufacturer,
                make: service.make,
                model: service.model,
                identifier: event.target.DeviceIdentifier.value,
                technician: event.target.Technician.value
            })
        }).then(res => res.json())
            .then((result) => {
                this.props.onHide();
                window.location.reload(false);
            },
                (error) => {
                    alert('Failed');
                })
    }

    render() {
        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aira-labeledby="container-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Invoice</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="CustomerName">
                                        <Form.Label>Customer Name</Form.Label>
                                        <Form.Control type="text" name="CustomerName" required
                                            placeholder="Customer Name" />
                                    </Form.Group>
                                    <Form.Group controlId="CustomerPhone">
                                        <Form.Label>Customer Phone</Form.Label>
                                        <Form.Control type="text" name="CustomerPhone" required
                                            placeholder="Customer Phone" />
                                    </Form.Group>
                                    <Form.Group controlId="DeviceIdentifier">
                                        <Form.Label>Device Identifier</Form.Label>
                                        <Form.Control type="text" name="DeviceIdentifier" required
                                            placeholder="Device Identifier" />
                                    </Form.Group>
                                    <Form.Group controlId="Technician">
                                        <Form.Label>Technician</Form.Label>
                                        <Form.Control type="text" name="Technician"
                                            placeholder="Technician" />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label htmlFor="services">Services</Form.Label>
                                        <Form.Select id="services" name="services">
                                            <option key="0" value="0">Add Service</option>
                                            {this.props.services.map((service) => {
                                                return (
                                                    <option key={service.id} value={service.id}>
                                                        {service.name},{service.price},{service.manufacturer},{service.make},{service.model},{service.description}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                    &nbsp;
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Invoice
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}