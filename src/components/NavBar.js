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
import { removeTokenTimestamp } from '../utils/utils';
// React icons
import { MdAddCircleOutline } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { BiSolidUserPlus } from "react-icons/bi";
import { MdOutlineDynamicFeed } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";

import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext'
import useClickOutside from '../hooks/useClickOutside'
import axios from 'axios'
import TrendingCarPosts from "../pages/posts/TrendingCarPosts"

const NavBar = () => {
    const currentUser = useCurrentUser()
    const setCurrentUser = useSetCurrentUser()
    
    const {expanded, setExpanded, ref} = useClickOutside()

    const handleSignOut = async () => {
        try{
            await axios.post("dj-rest-auth/logout");
            setCurrentUser(null)
            removeTokenTimestamp()
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
                            <span className={styles.LinkContainer}>
                                <PiSignInBold size={30} className="mr-1" />
                            Sign in
                            </span>
                        </NavLink>           
                        <NavLink 
                            to = "/signup" 
                            className={`${styles.NavLink} mr-2`} 
                            activeClassName = {styles.Active}
                        >
                            <span className={styles.LinkContainer}>
                                <BiSolidUserPlus size={30} className="mr-1" />
                                Sign up
                            </span>
                        </NavLink>
                    </>
    const signedInIcons = 
                        <>
                            <NavLink 
                                to='/feed'  
                                className={`ml-3 ${styles.NavLink}`}
                            >
                                <span className={styles.LinkContainer}>
                                    <MdOutlineDynamicFeed size={30} />
                                    Feed
                                </span>
                            </NavLink>
                           <NavLink 
                                to='/'  
                                className={`ml-3 ${styles.NavLink}`}
                                onClick = { handleSignOut }
                            >
                                <span className={styles.LinkContainer}>
                                    <FaSignOutAlt size={30}/>
                                    Sign out
                                </span>
                            </NavLink>
                            <NavLink 
                                to={`/profiles/${currentUser?.profile_id}`}
                                className={styles.NavLink}
                                dataTest= 'user_profile' 
                            >
                                <span className={styles.LinkContainer}>
                                    <Avatar 
                                        src= {currentUser?.profile_image}  
                                        height={30}
                                        text = {currentUser?.username}
                                    />
                                </span>
                            </NavLink>                        
                        </>
    const addPost = <NavLink 
                        to='/posts/create' 
                        className={styles.NavLink} 
                        activeClassName={styles.Active}
                    >
                        <span className={styles.LinkContainer}>
                            <MdAddCircleOutline size={30}/>
                            Add Post
                        </span>
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
                    <Nav className="text-left">
                        <div 
                            className="d-flex align-items-center justify-content-between w-100"
                        >
                            <div>
                                <NavLink to="/">
                                    <Navbar.Brand>
                                        <img src={logo} alt='Brand logo' height='40' />
                                    </Navbar.Brand>
                                </NavLink>
                            </div>
                            <div>
                                <TrendingCarPosts mobile />
                            </div>
                        </div>
                    </Nav>
                    <Navbar.Toggle 
                        ref={ref} 
                        onClick={() => setExpanded(!expanded)} 
                        aria-controls="basic-navbar-nav" 
                        className={styles.ToggleButton}
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto text-left">
                            <NavLink 
                                exact to = "/" 
                                className={`${styles.NavLink} mr-2`} 
                                activeClassName = {styles.Active} 
                            >
                                <span className={styles.LinkContainer}>
                                    <FaHome className='mr-1' size={30}/>
                                    Home
                                </span>
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