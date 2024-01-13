import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'

const NavBar = () => {
  return (
    <div>
        <Navbar bg="light" expand="md" fixed='top'>
            <Container>
                <Navbar.Brand >Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <Nav.Link>
                            <i className='fas fa-home mr-2'> </i>
                            Home  
                        </Nav.Link>
                        <Nav.Link>
                            <i className="fas fa-right-to-bracket mr-2"></i>
                            Sign in
                        </Nav.Link>
                        <Nav.Link>
                            <i className="fas fa-user-plus mr-2"></i>
                            Sign up
                        </Nav.Link>
                        
                    
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavBar