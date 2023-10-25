import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import { Cart } from './Offcanvas/OffCanvas';
import { SearchForm } from './SearchForm/SearchForm';

export const TheNavbar = () => {
  return (
    <Navbar className='row' expand="lg">
      <Navbar.Brand className='col-2 text-white' href="#home">ComercioDummy</Navbar.Brand>
        <Nav className='col-9'>
   
        </Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="col-1">
          <Cart/>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};


