import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditInvoiceModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = { invoices: [], loading: true };
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API_URL + 'Invoice/' + event.target.InvoiceId.value, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: event.target.InvoiceId.value,
                customerName: event.target.CustomerName.value,
                customerPhone: event.target.CustomerPhone.value,
                paid: event.target.Paid.checked,
                service: event.target.Service.value,
                description: event.target.Description.value,
                price: event.target.Price.value,
                manufacturer: event.target.Manufacturer.value,
                make: event.target.Make.value,
                model: event.target.Model.value,
                identifier: event.target.DeviceIdentifier.value,
                technician: event.target.Technician.value
            })
        }).then(res => res.json())
            .then((result) => {
                this.props.onHide();
                window.location.reload(false);
            },
                (error) => {
                    this.props.onHide();
                    window.location.reload(false);
                })
    }

    handleChange = (event) => {
        this.setState({ selected: !this.state.selected });
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
                                    <Form.Group controlId="InvoiceId">
                                        <Form.Label>Invoice</Form.Label>
                                        <Form.Control type="text" name="Invoice" required
                                            disabled
                                            defaultValue={this.props.invoiceid}
                                            placeholder="Invoice" />
                                    </Form.Group>
                                    <Form.Group controlId="CustomerName">
                                        <Form.Label>Customer Name</Form.Label>
                                        <Form.Control type="text" name="CustomerName" required
                                            defaultValue={this.props.customername}
                                            placeholder="Customer Name" />
                                    </Form.Group>
                                    <Form.Group controlId="CustomerPhone">
                                        <Form.Label>Customer Phone</Form.Label>
                                        <Form.Control type="text" name="CustomerPhone" required
                                            defaultValue={this.props.customerphone}
                                            placeholder="Customer Phone" />
                                    </Form.Group>
                                    <Form.Group controlId="DeviceIdentifier">
                                        <Form.Label>Device Identifier</Form.Label>
                                        <Form.Control type="text" name="DeviceIdentifier" required
                                            defaultValue={this.props.identifier}
                                            placeholder="Device Identifier" />
                                    </Form.Group>
                                    <Form.Group controlId="Technician">
                                        <Form.Label>Technician</Form.Label>
                                        <Form.Control type="text" name="Technician"
                                            defaultValue={this.props.technician}
                                            placeholder="Technician" />
                                    </Form.Group>
                                    <Form.Group controlId="Service">
                                        <Form.Label>Service</Form.Label>
                                        <Form.Control type="text" name="Service" required
                                            defaultValue={this.props.service}
                                            placeholder="Service" />
                                    </Form.Group>
                                    <Form.Group controlId="Description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="Description" required
                                            defaultValue={this.props.description}
                                            placeholder="Description" />
                                    </Form.Group>
                                    <Form.Group controlId="Price">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="text" name="Price" required
                                            defaultValue={this.props.price}
                                            placeholder="Price" />
                                    </Form.Group>
                                    <Form.Group controlId="Paid">
                                        <Form.Label>Paid</Form.Label>
                                        <Form.Check name="Paid"
                                            defaultChecked={this.props.paid==='true'} />
                                    </Form.Group>
                                    <Form.Group controlId="Manufacturer">
                                        <Form.Label>Manufacturer</Form.Label>
                                        <Form.Control type="text" name="Manufacturer" required
                                            defaultValue={this.props.manufacturer}
                                            placeholder="Manufacturer" />
                                    </Form.Group>
                                    <Form.Group controlId="Make">
                                        <Form.Label>Make</Form.Label>
                                        <Form.Control type="text" name="Make" required
                                            defaultValue={this.props.make}
                                            placeholder="Make" />
                                    </Form.Group>
                                    <Form.Group controlId="Model">
                                        <Form.Label>Model</Form.Label>
                                        <Form.Control type="text" name="Model" required
                                            defaultValue={this.props.model}
                                            placeholder="Model" />
                                    </Form.Group>
                                    &nbsp;
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Invoice
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