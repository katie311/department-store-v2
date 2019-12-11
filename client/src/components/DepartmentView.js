import React from "react";
import axios from "axios";
import DepartmentForm from './DepartmentForm';
import Products from './Products';
import ProductForm from './ProductForm';
import { Link, } from 'react-router-dom';
import { Button, Header, Segment, Icon, Card, } from "semantic-ui-react";

class DepartmentView extends React.Component {
  state = { 
    department: {}, 
    products: [],
    editing: false,
    showProductForm: false
  };

  componentDidMount() {
    axios.get(`/api/departments/${this.props.match.params.id}`)
      .then( res => {
        this.setState({ department: res.data, });
      })
    axios.get(`/api/departments/${this.props.match.params.id}/products`)
      .then( res => {
        this.setState({ products: res.data, });
      })
  }


  toggleEdit = () => {
    this.setState({editing: !this.state.editing})
  }

  editDepartment = (department) => {
    const id = this.props.match.params.id
    axios.put(`/api/departments/${id}`, {department})
    .then( res => {
      const department = this.state.department
      if (department.id === id)
        return res.data
      return department
    })
    this.setState({ department });
  }

  addProduct = (name, description, price) => {
    axios.post(`/api/departments/${this.props.match.params.id}/products`, { name, description, price})
      .then( res => {
        this.setState({ products: [...this.state.products, res.data], });
      });
    }

    deleteProduct = (id) => {
      axios.delete(`/api/departments/${this.props.match.params.id}/products/${id}`)
        .then( res => {
          const { products, } = this.state;
          this.setState({ products: products.filter(d => d.id !== id), })
        });
    }

  toggleProductForm = () => this.setState({ showProductForm: !this.state.showProductForm });

  render() {
    const { name, } = this.state.department;

    return (
      <div>
        {
      this.state.editing ? 
      <DepartmentForm 
        name={this.name} 
        id={this.id}  
        toggleEdit={this.toggleEdit} 
        editDepartment={this.editDepartment}
      />
        :
        <Segment>
          <Header as="h1">{ name }</Header>
        </Segment>
        }
        <br />
        <Button 
          color="black" 
          onClick={this.props.history.goBack}
          >
          Back
        </Button>
        <Button
            icon 
            color="green" 
            size="tiny" 
            onClick={this.toggleEdit} 
            style={{ marginLeft: "15px", }}
            >
          <Icon name="pencil" />
          </Button>
          <Segment>
              <Header>Products</Header>
          <Button onClick={this.toggleProductForm}>
              Add Product
          </Button>
          <Segment basic>{this.state.showProductForm ? <ProductForm addProduct={ this.addProduct } /> : null }</Segment>
          <hr />
          <Card.Group>
          <Products 
            products={this.state.products}
            deleteProduct={this.deleteProduct}
            // editProduct={this.editProduct}
            />
            </Card.Group>
          </Segment>
        </div>
    );
  }
}

export default DepartmentView;