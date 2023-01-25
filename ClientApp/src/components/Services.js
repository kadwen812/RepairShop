import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddServiceModal} from './AddServiceModal';
import {EditServiceModal} from './EditServiceModal';

export class Services extends Component {

  constructor(props) {
    super(props);
    this.state = { services: [], addModalShow: false, editModalShow: false, deleteModalShow: false };
  }

  refreshList() {
    if (this.state.loading) return;
    this.setState({ loading: true });
    fetch(process.env.REACT_APP_API_URL+'Service')
      .then(response => response.json())
      .then(data => {
        this.setState({ loading: false });
        if(this.state.services !== data) {
          this.setState({services:data})
        }
      });
  }
      
  componentDidMount() {
    this.refreshList();
  }

  deleteService(serviceid) {
    if (this.state.loading) return;
    this.setState({ loading: true });
    if (!window.confirm('Are you sure?')) {
      this.setState({ loading: false });
      return;
    }
    fetch(process.env.REACT_APP_API_URL+'Service/'+serviceid, {
      method: 'DELETE',
      header: {'Accept':'application/json',
      'Content-Type':'application/json'}
    }).then(this.setState({ loading: false }).then(this.refreshList()));
  }

  render() {
    const { 
      services, 
      serviceid , 
      servicename, 
      servicedescription, 
      serviceprice, 
      servicemanufacturer, 
      servicemake, 
      servicemodel } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <h1>Services</h1>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Service</th>
              <th>Description</th>
              <th>Price</th>
              <th>Manufacturer</th>
              <th>Make</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {services.map(services =>
              <tr key={services.id}>
                <td>{services.name}</td>
                <td>{services.description}</td>
                <td>{services.price}</td>
                <td>{services.manufacturer}</td>
                <td>{services.make}</td>
                <td>{services.model}</td>
                <td>
                  <ButtonToolbar>
                    <Button className="mr-2" variant="info"
                      onClick={() => this.setState({ editModalShow: true,
                        serviceid: services.id, 
                        servicename: services.name,
                        servicedescription: services.description,
                        serviceprice: services.price,
                        servicemanufacturer: services.manufacturer,
                        servicemake: services.make,
                        servicemodel: services.model})}>
                          Edit
                    </Button>
                    &nbsp;
                    <Button className="mr-2" variant="danger"
                      onClick={()=>this.deleteService(services.id)}>
                        Delete
                    </Button>
                    <EditServiceModal show={this.state.editModalShow}
                      onHide={editModalClose}
                      serviceid={serviceid}
                      servicename={servicename}
                      servicedescription={servicedescription}
                      serviceprice={serviceprice}
                      servicemanufacturer={servicemanufacturer}
                      servicemake={servicemake}
                      servicemodel={servicemodel}
                      />
                  </ButtonToolbar>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button variant='primary'
            onClick={() => this.setState({ addModalShow: true })}>
            Add Service
          </Button>
          <AddServiceModal show={this.state.addModalShow}
            onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    );
  }
}
