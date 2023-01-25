import React,{Component} from "react";
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class AddServiceModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    } 
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API_URL+'Service',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Name:event.target.Service.value,
                Description:event.target.Description.value,
                Price:event.target.Price.value,
                Manufacturer:event.target.Manufacturer.value,
                Make:event.target.Make.value,
                Model:event.target.Model.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            this.props.onHide();
            window.location.reload(false);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render(){
        return(
            <div className="container">
<Modal
{...this.props}
size="lg"
aira-labeledby="container-modal"
>
    <Modal.Header closeButton>
        <Modal.Title>Add Service</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="Service">
                        <Form.Label>Service</Form.Label>
                        <Form.Control type="text" name="Service" required
                            placeholder="Service"/>
                    </Form.Group>
                    <Form.Group controlId="Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="Description" required
                            placeholder="Description"/>
                    </Form.Group>
                    <Form.Group controlId="Price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="Price" required
                            placeholder="Price"/>
                    </Form.Group>
                    <Form.Group controlId="Manufacturer">
                        <Form.Label>Manufacturer</Form.Label>
                        <Form.Control type="text" name="Manufacturer" required
                            placeholder="Manufacturer"/>
                    </Form.Group>
                    <Form.Group controlId="Make">
                        <Form.Label>Make</Form.Label>
                        <Form.Control type="text" name="Make" required
                            placeholder="Make"/>
                    </Form.Group>
                    <Form.Group controlId="Model">
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" name="Model" required
                            placeholder="Model"/>
                    </Form.Group>
                    &nbsp;
                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Service
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