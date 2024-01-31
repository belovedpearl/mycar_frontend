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
                            <div className={styles.LinkContainer}>
                                <PiSignInBold size={30} className="mr-1" />
                            Sign in
                            </div>
                        </NavLink>           
                        <NavLink 
                            to = "/signup" 
                            className={`${styles.NavLink} mr-2`} 
                            activeClassName = {styles.Active}
                        >
                            <div className={styles.LinkContainer}>
                                <BiSolidUserPlus size={30} className="mr-1" />
                                Sign up
                            </div>
                        </NavLink>
                    </>
    const signedInIcons = 
                        <>
                            <NavLink 
                                to='/feed'  
                                className={`ml-3 ${styles.NavLink} ${styles.NavLinkText}`}
                            >
                                <div className={`${styles.LinkContainer} ${styles.AddandSign}`}>
                                    <MdOutlineDynamicFeed size={30} />
                                    Feed
                                </div>
                            </NavLink>
                           <NavLink 
                                to='/'  
                                className={`ml-3 ${styles.NavLink} ${styles.NavLinkText}`}
                                onClick = { handleSignOut }
                            >
                                <div className={`${styles.LinkContainer} ${styles.AddandSign}`}>
                                    <FaSignOutAlt size={30}/>
                                    Sign out
                                </div>
                            </NavLink>
                            <NavLink 
                                to={`/profiles/${currentUser?.profile_id}`}
                                className={`${styles.NavLink} ${styles.NavLinkText}`} 
                            >
                                <div className={styles.LinkContainer}>
                                    <Avatar 
                                        src= {currentUser?.profile_image}  
                                        height={30}
                                        text = {currentUser?.username}
                                    />
                                </div>
                            </NavLink>                        
                        </>
    const addPost = <NavLink 
                        to='/posts/create' 
                        className={styles.NavLink} 
                        activeClassName={styles.Active}
                    >
                        <div  className={`ml-3 ${styles.LinkContainer} ${styles.AddandSign}`} >                    
                            <MdAddCircleOutline size={30}/>
                            Add Post
                        </div>
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
                        // className={`${styles.ToggleButton} navbar-light`}
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto text-left">
                            <NavLink 
                                exact to = "/" 
                                className={`${styles.NavLink} mr-2 ${styles.HomeIcon}`} 
                                activeClassName = {styles.Active} 
                            >
                                <div className={`${styles.LinkContainer} ${styles.AddandSign}`}>
                                    <FaHome className='mr-1' size={30}/>
                                    Home
                                </div>
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