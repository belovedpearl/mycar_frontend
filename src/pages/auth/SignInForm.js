import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import CoverImage from '../../assets/img.jpeg';

import { Button, Form, Image, Col, Row, Container } from "react-bootstrap";
import axios from "axios";

const SignInForm = () => {
    const [signInData, setSignInData] = useState(
        {
            username: '',
            password: ''
        }
    )
    const { username, password } = signInData;

    const handleChange = (event) => {
        setSignInData({
          ...signInData,
          [event.target.name]: event.target.value,
        });
       };
    
    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await axios.post("/dj-rest-auth/login/", signInData);
    } catch (err) {
        console.log(err)
    }
    };
    
  return (
    <div>
        <Row className={styles.Row}>
            {/* Left side */}
            <Col
                md={6}
                className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
            >
                <Image
                className={`${appStyles.CoverImage} img-fluid rounded-circle`}
                src= {CoverImage}
                alt="Sign up page cover picture"
                />
            </Col>
            {/* Right side */}
            <Col className="my-auto py-2 p-md-2" md={6}>
                <Container className= "p-4">
                <h1 className={styles.Header}>SIGN IN</h1>
                {/* Sign in form */}
                <Form onSubmit={handleSubmit} >
                    <Form.Group controlId="username">
                    <Form.Label className="d-none">Username</Form.Label>
                    <Form.Control 
                        className={styles.Input}
                        type="text" 
                        placeholder="Enter username" 
                        name="username"
                        value= {username}
                        onChange={handleChange}                       
                    />
                    </Form.Group>

                    <Form.Group controlId="password">
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control
                        className={styles.Input} 
                        type="password" 
                        placeholder="Password"
                        name="password"
                        value= {password}
                        onChange={handleChange}
                        
                    />
                    </Form.Group>

                    
                    <Button 
                    className={`${btnStyles.Button} ${btnStyles.Broad} ${btnStyles.Sharp}`} 
                    type="submit"
                    >
                    Sign In
                    </Button>
                </Form>

                </Container>
                <Container className={`mt-3 ${appStyles.Content}`}>
                <p className={styles.LinkText}>
                    <span className="mr-2">
                        You don't have an account?
                    </span>
                    <Link className={styles.Link} to="/signup">
                        Sign up
                    </Link>
                </p>
                </Container>
            </Col>
            
      </Row>
    </div>
  )
}

export default SignInForm