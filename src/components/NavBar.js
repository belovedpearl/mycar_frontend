import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import styles from '../styles/NavBar.module.css'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { SetCurrentUserContext } from '../App'

const NavBar = () => {
    const currentUser = useContext(SetCurrentUserContext)

    const signedOutIcons = 
                    <>
                        <NavLink to = "/signin" className={`${styles.NavLink} mr-2`} activeClassName = {styles.Active}>
                            <i className="fas fa-right-to-bracket mr-1"></i>
                            Sign in
                        </NavLink>
            
                        <NavLink to = "/signup" className={`${styles.NavLink} mr-2`} activeClassName = {styles.Active}>
                            <i className="fas fa-user-plus mr-1"></i>
                            Sign up
                        </NavLink>
                    </>
    const signedInIcons = 
                        <>
                            {currentUser?.username}
                        </>


  return (
    <div>
        <Navbar className={styles.NavBar} expand="md" fixed='top'>
            <Container>
                <NavLink to = "/">
                    <Navbar.Brand>
                        <img src={logo} alt='Brand logo' height='40' />
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <NavLink exact to = "/" className={`${styles.NavLink} mr-2`} activeClassName = {styles.Active} >
                            <i className='fas fa-home mr-1'></i>
                            Home
                        </NavLink>
                        {currentUser ? signedInIcons : signedOutIcons}               
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavBar