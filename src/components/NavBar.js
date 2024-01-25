import React from 'react'
import { NavLink } from 'react-router-dom'
// Bootstrap Imports
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// Additional Local imports
import styles from '../styles/NavBar.module.css'
import logo from '../assets/logo.png'
import Avatar from './Avatar'
// React icons
import { MdAddCircleOutline } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { BiSolidUserPlus } from "react-icons/bi";
import { MdOutlineDynamicFeed } from "react-icons/md";

import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext'
import useClickOutside from '../hooks/useClickOutside'
import axios from 'axios'

const NavBar = () => {
    const currentUser = useCurrentUser()
    const setCurrentUser = useSetCurrentUser()

    const {expanded, setExpanded, ref} = useClickOutside()

    const handleSignOut = async () => {
        try{
            await axios.post("dj-rest-auth/logout");
            setCurrentUser(null)
        }catch (err){
            console.log(err)
        }
    };
    
    const signedOutIcons = 
                    <>
                        <NavLink 
                            to = "/signin" 
                            className={`${styles.NavLink} mr-2`} 
                            activeClassName = {styles.Active}
                        >
                            <i className="fas fa-right-to-bracket mr-1"></i>
                            Sign in
                        </NavLink>           
                        <NavLink 
                            to = "/signup" 
                            className={`${styles.NavLink} mr-2`} 
                            activeClassName = {styles.Active}
                        >
                            <BiSolidUserPlus size={30} className="mr-1" />
                            Sign up
                        </NavLink>
                    </>
    const signedInIcons = 
                        <>
                            <NavLink 
                                to='/feed'  
                                className={`ml-3 ${styles.NavLink}`}
                            >
                                <MdOutlineDynamicFeed size={30} />
                                Feed
                            </NavLink>
                           <NavLink 
                                to='/'  
                                className={`ml-3 ${styles.NavLink}`}
                                onClick = { handleSignOut }
                            >
                                <FaSignOutAlt size={30}/>
                                Sign out
                            </NavLink>
                            <NavLink 
                                to={`/profiles/${currentUser?.profile_id}`}
                                className={styles.NavLink} 
                            >
                                <Avatar 
                                    src= {currentUser?.profile_image}  
                                    height={30}
                                    text = {currentUser?.username}
                                />
                            </NavLink>                        
                        </>
    const addPost = <NavLink 
                        to='/posts/create' 
                        className={styles.NavLink} 
                        activeClassName={styles.Active}>
                        <MdAddCircleOutline size={30}/>
                        Add Post
                    </NavLink> 
  return (
        <div>
            <Navbar 
                expanded= {expanded} 
                className={styles.NavBar} 
                expand="md" 
                fixed='top'
            >
                <Container>
                    <NavLink to = "/">
                        <Navbar.Brand>
                            <img src={logo} alt='Brand logo' height='40' />
                        </Navbar.Brand>
                    </NavLink>
                    <Navbar.Toggle 
                        ref={ref} 
                        onClick={() => setExpanded(!expanded)} 
                        aria-controls="basic-navbar-nav" 
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto text-left">
                            <NavLink 
                                exact to = "/" 
                                className={`${styles.NavLink} mr-2`} 
                                activeClassName = {styles.Active} 
                            >
                                <i className='fas fa-home mr-1'></i>
                                Home
                            </NavLink>
                            {currentUser && addPost}
                            {currentUser ? signedInIcons : signedOutIcons}               
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
  )
}

export default NavBar