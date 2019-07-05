import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

  function Header(props) {
    
  
    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand >
          {'Employee Management System'}
        </Navbar.Brand>
        <Nav className="mr-auto">
          
      <Link to="/employee">EmployeeList</Link>
      
    </Nav>
      </Navbar>
    );
  }
  

  
  export default Header;
