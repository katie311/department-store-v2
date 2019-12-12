import React from "react";
import axios from 'axios';
import styled from 'styled-components';
import { Link, } from 'react-router-dom';
import { Card, Header, Button, Icon, Segment, } from "semantic-ui-react";

class Departments extends React.Component {
  state = { departments: [],};

  componentDidMount() {
    axios.get("/api/departments")
      .then( res => {
        this.setState({ 
            departments: res.data, 
        });
      })
  }
  
  deleteDepartment = (id) => {
    axios.delete(`/api/departments/${id}`)
      .then( res => {
        const { departments, } = this.state;
        this.setState({ departments: departments.filter(d => d.id !== id), })
      })
  }

  renderDepartments = () => {
    const { departments, } = this.state;

    if (departments.length <= 0)
      return <h2>No Departments</h2>
    return departments.map( department => (
      <div>
        <Segment basic>
        <Card.Group>
      <Card>
        <Card.Content>
          <Card.Header>{ department.name }</Card.Header>
          <Card.Meta>{ department.department }</Card.Meta>
          <Card.Description>
            { department.description }
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as={Link} to={`/departments/${department.id}`} color="light-grey">
            View Department
          </Button>
          <Button 
            icon 
            color="red" 
            size="tiny" 
            onClick={() => this.deleteDepartment(department.id)} 
            style={{ marginLeft: "15px", }}
          >
          <Icon name="trash" />
          </Button>
        </Card.Content>
      </Card>
        </Card.Group>
        </Segment>
      </div>
    ))
  }

  render() {
    return (
      <div>
        <Segment>
          <Header as="h1">Departments</Header>
        </Segment>

        <Segment>
          <Button as={Link} color="light-grey" to="/departments/new">
              Add Department
          </Button>
          <hr />
          <br />
            <Card.Group>
              { this.renderDepartments() }
            </Card.Group>
            <br />
        </Segment>

      </div>
    )
  }
}

const StyledCard = styled(Card)`

  `

export default Departments;