import React from "react";
import axios from 'axios';
import { Card, Header, Button, Icon, } from "semantic-ui-react";

class Product extends React.Component {
    state = {
        product: {},
        editingItem: false,
    }

    componentDidMount() {
        axios.get(`/api/departments/${this.props.id}/products`)
            .then( res => {
        this.setState({ products: res.data, });
        });
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
                {/* <Button 
                icon 
                color="red" 
                size="tiny" 
                onClick={() => this.deleteProduct(product.department.id)} 
                style={{ marginLeft: "15px", }}
                >
                <Icon name="trash" />
                </Button> */}
            </Card.Content>
            </Card>
        )
    }
}

export default Product;
