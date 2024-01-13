import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import styles from '../styles/NavBar.module.css'
import logo from '../assets/logo.png'

const NavBar = () => {
  return (
    <div>
        <Navbar className={styles.NavBar} expand="md" fixed='top'>
            <Container>
                <Navbar.Brand>
                    <img src={logo} alt='Brand logo' height='40' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <Nav.Link className={`${styles.NavLink} mr-2`}>
                            <i className='fas fa-home mr-1'></i>
                            Home
                        </Nav.Link>
                        <Nav.Link className={`${styles.NavLink} mr-2`}>
                            <i className="fas fa-right-to-bracket mr-1"></i>
                            Sign in
                        </Nav.Link>
                        <Nav.Link className={`${styles.NavLink} mr-2`}>
                            <i className="fas fa-user-plus mr-1"></i>
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