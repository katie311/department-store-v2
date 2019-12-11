import React from 'react';
import axios from 'axios';

import { Form, Header, } from "semantic-ui-react";

class ProductForm extends React.Component {
  state = { name: '', description: '', price: '', };

  handleSubmit = (e) => {
    e.preventDefault();
    // if (this.props.toggleEdit) {
    //   this.props.editproduct(this.state)
    //   this.props.toggleEdit()
    // }
    // else {
    this.props.addProduct(this.state.name, this.state.description, this.state.price)
    this.setState({ name: '', description: '', price: '', })
    debugger
  }

  handleChange = (e) => {
    const { target: { name, value} } = e
    this.setState({ [name]: value, })
  }

  render() {
    const { name, description, price, } = this.state

    return (
      <div>
        <Header as="h1">New Product</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              label="Name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={this.handleChange}
              required
            />
            <Form.Input
              label="Description"
              name="description"
              placeholder="Description"
              value={description}
              onChange={this.handleChange}
              required
            />
            <Form.Input
              label="Price"
              name="price"
              placeholder="Price"
              type="number"
              value={price}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Button color="blue">Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default ProductForm;