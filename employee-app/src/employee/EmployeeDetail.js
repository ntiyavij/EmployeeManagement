import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './employee.css';
import moment from 'moment';
import queryString from 'query-string';

class EmployeeDetail extends Component {
    formatDate = (employee) => {
        return ({
            ...employee,
            hireDate: moment(employee.hireDate).format('MM/DD/YYYY'),
            dateOfBirth: moment(employee.dateOfBirth).format('MM/DD/YYYY')
        });
    }

    handleClick = (sortBy)=>{
        this.props.history.push(`/employee?sortBy=${sortBy}`);
    }

    state = {
        isRequesting: true,
        employee: {},
        employeeData: [{
            headerName: "Name", field: "name"
        },
        {
            headerName: "Gender", field: "gender"
        },
        {
            headerName: "Date of Joining", field: "hireDate"
        },
        {
            headerName: "Age", field: "age"
        },
        {
            headerName: "Salary", field: "salary"
        },
        {
            headerName: "Phone Number", field: "phoneNumber"
        },
        {
            headerName: "Date of Birth", field: "dateOfBirth"
        },

        ],
    };
    componentDidMount() {
        const { match: { params: { empId } } } = this.props;

        fetch(`http://localhost:8080/api/employee/${empId}`)
            .then(result => result.json())
            .then(data => this.setState({ employee: this.formatDate(data), isRequesting: false }))
    }
    render() {
        const { employee, employeeData } = this.state;
        const {sortBy} = queryString.parse(this.props.location.search)
        return (
            <div className="flex-container">
                <Card>
                    <Card.Header>Employee Data</Card.Header>
                    {!this.state.isRequesting && <Card.Body>

                        <Container>
                            <Row>
                                <Col xs={3}>
                                    {"Male" === employee.gender?
                                    <img width={200} height={200} mode='fit' src="/MaleIcon.png" />:
                                    <img width={200} height={200} mode='fit' src="/FemaleIcon.png" />}
                                </Col>
                                <Col xs={9}>
                                    {employeeData.map((col, index) => {
                                        return (
                                            <Row key={index}>
                                                <Col xs={4} key={`label${index}`}>
                                                    {col.headerName}:
                                                </Col>
                                                <Col xs={8} key={`value${index}`}>
                                                    {employee[col.field]}
                                                </Col>
                                            </Row>)
                                    }
                                    )}
                                </Col>
                            </Row>

                        </Container>

                    </Card.Body>}
                    <Card.Footer className="text-muted">
                     <Button
                      onClick={this.handleClick.bind(this,sortBy)}
                     >Back</Button>   
                    </Card.Footer>
                </Card>
            </div>
        );
    }

}

export default EmployeeDetail;