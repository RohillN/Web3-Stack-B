import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const AppNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
            <Navbar color="dark" dark light expand="md">
                <NavbarBrand href="/">Web 3</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/countries">Countries</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/countries/add">Countries Add</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/countries/edit">Countries Edit</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/countries/delete">Countries Delete</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/about">About</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>Stack B - MERN</NavbarText>
                </Collapse>
            </Navbar>
        </div>
  );
}

export default AppNavbar;
