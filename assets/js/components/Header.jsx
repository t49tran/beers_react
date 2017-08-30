import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router';

export default function Header() {
  return (
    <div className="header-wrap">
      <Navbar color="faded" light>
        <NavbarBrand href="/">Beers4Geek</NavbarBrand>
        <Nav className="float-right" navbar>
          <NavItem>
            <Link className="nav-link" to="/global-map">Global Map</Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/breweries">Breweries</Link>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
