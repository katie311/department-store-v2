import React from "react";
import axios from 'axios';
import { Card, Header, Button, Icon, } from "semantic-ui-react";

class Product extends React.Component {
    state = {
        product: {},
        editing: false,
    }

    // componentDidMount() {
    //     axios.get(`/api/departments/${this.props.id}/products`)
    //         .then( res => {
    //     this.setState({ products: res.data, });
    //     });
    // }
    toggleEdit = () => {
        this.setState({editing: !this.state.editing})
      }

    editProduct = (product) => {
        const id = this.props.match.params.id
        axios.put(`/api/departments/${this.props.match.params.id}/products/${id}`, {product})
        .then( res => {
          const product = this.state.product
          if (product.id === id)
            return res.data
          return product
        })
        this.setState({ product });
      }

    render() {
        return (
            <Card>
            <Card.Content>
                <Header>{ this.props.name }</Header>
                <Card.Description>{ this.props.description }</Card.Description>
                <Header>{ this.props.price }</Header>
            </Card.Content>
            <Card.Content extra>
                <Button 
                    icon 
                    color="red" 
                    size="tiny" 
                    onClick={() => this.props.deleteProduct(this.props.id)} 
                    style={{ marginLeft: "15px", }}
                >
                <Icon name="trash" />
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
            </Card.Content>
            </Card>
        )
    }
}

export default Product;
