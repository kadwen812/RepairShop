import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddInvoiceModal} from './AddInvoiceModal';
import {EditInvoiceModal} from './EditInvoiceModal';

export class Invoices extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      invoices: [], 
      services: [], 
      addModalShow: false, 
      editModalShow: false, 
      deleteModalShow: false };
  }

  refreshList() {
    if (this.state.loading) return;
    this.setState({ loading: true });
    fetch(process.env.REACT_APP_API_URL+'Invoice')
      .then(response => response.json())
      .then(invoiceData => {
        fetch(process.env.REACT_APP_API_URL+'Service')
          .then(response => response.json())
          .then(data => {
            this.setState({ loading: false });
            if(this.state.invoices !== invoiceData || this.state.services !== data) {
              this.setState({invoices:invoiceData, services:data})
            }
          });
        });
  }
      
  componentDidMount() {
    this.refreshList();
  }

  deleteInvoice(invoiceid) {
    if (this.state.loading) return;
    this.setState({ loading: true });
    if (!window.confirm('Are you sure?')) {
      this.setState({ loading: false });
      return;
    }
    fetch(process.env.REACT_APP_API_URL+'Invoice/'+invoiceid, {
      method: 'DELETE',
      header: {'Accept':'application/json',
      'Content-Type':'application/json'}
    }).then(this.setState({ loading: false }).then(this.refreshList()));
  }

  render() {
    const { 
      invoices,
      services,
      invoiceid,
      customername,
      customerphone,
      paid,
      service,
      description,
      price,
      manufacturer,
      make,
      model,
      identifier,
      technician} = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <h1>Invoices</h1>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Customer</th>
              <th>Description</th>
              <th>Make</th>
              <th>Model</th>
              <th>Price</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice =>
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.customerName}</td>
                <td>{invoice.description}</td>
                <td>{invoice.make}</td>
                <td>{invoice.model}</td>
                <td>{invoice.price}</td>
                <td>{invoice.paid?'paid':''}</td>
                <td>
                  <ButtonToolbar>
                    <Button className="mr-2" variant="info"
                      onClick={() => this.setState({ editModalShow: true,
                        services: services,
                        invoiceid: invoice.id,
                        customername: invoice.customerName,
                        customerphone: invoice.customerPhone,
                        paid: invoice.paid.toString(),
                        service: invoice.service,
                        description: invoice.description,
                        price: invoice.price,
                        manufacturer: invoice.manufacturer,
                        make: invoice.make,
                        model: invoice.model,
                        identifier: invoice.identifier,
                        technician: invoice.technician})}>
                          Edit
                    </Button>
                    &nbsp;
                    <Button className="mr-2" variant="danger"
                      onClick={()=>this.deleteInvoice(invoices.id)}>
                        Delete
                    </Button>
                    <EditInvoiceModal show={this.state.editModalShow}
                      onHide={editModalClose}
                      services={services}
                      invoiceid={invoiceid}
                      customername={customername}
                      customerphone={customerphone}
                      paid={paid}
                      service={service}
                      description={description}
                      price={price}
                      manufacturer={manufacturer}
                      make={make}
                      model={model}
                      identifier={identifier}
                      technician={technician}
                      />
                  </ButtonToolbar>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button variant='primary'
            onClick={() => this.setState({ addModalShow: true,
              services: services
              })}>
            Add Invoice
          </Button>
          <AddInvoiceModal show={this.state.addModalShow}
            onHide={addModalClose}
            services={services}
            />
        </ButtonToolbar>
      </div>
    );
  }
}
