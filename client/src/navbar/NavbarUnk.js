import React, { useEffect, useContext } from 'react'
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Icon from '../assets/Icon.png'



function NavbarUnk({modalShowOn, ModalShowOff, ModalShowOffRegis, modalShowOnRegis}) {
  const navigate = useNavigate()

  const pageLogin = () => {
    navigate('/')
  }

 

  return (
    <Navbar className="navbar fixed-top navbar-expand-lg navbar-dark" onClick={ModalShowOff}>
    <Container onClick={ModalShowOffRegis}>
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
            <img src={Icon} alt="Logo" onClick={pageLogin} />
        </Nav>
        <Form className="d-flex">
          <Button className="me-2" variant="outline-dark" onClick={modalShowOn}>Login</Button>
          <Button variant="primary" onClick={modalShowOnRegis}>Register</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavbarUnk