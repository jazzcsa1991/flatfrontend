import React from 'react';
import {Navbar,Nav,NavDropdown } from 'react-bootstrap';
import logo from '../assets/logo.png'
function NavBar() {
  return(
    <div>
      <Navbar  expand="lg" style={{backgroundColor:"#fff"}}>
      <Navbar.Brand href="#home">
      <img
          alt=""
          src={logo}
          width="50"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/branch">Git information</Nav.Link>
      <NavDropdown title="PR" id="basic-nav-dropdown">
        <NavDropdown.Item href="create">Create</NavDropdown.Item>
        <NavDropdown.Item href="pr_list">PR list</NavDropdown.Item>
        <NavDropdown.Item href="pr_backup">PR created</NavDropdown.Item>
      </NavDropdown>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
export default NavBar;











