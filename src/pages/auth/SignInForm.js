import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import CoverImage from '../../assets/img.jpeg';

import { Button, Form, Image, Col, Row, Container } from "react-bootstrap";

const SignInForm = () => {
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
                <Form >
                    <Form.Group controlId="username">
                    <Form.Label className="d-none">Username</Form.Label>
                    <Form.Control 
                        className={styles.Input}
                        type="text" 
                        placeholder="Enter username" 
                        name="username"
                        
                        
                    />
                    </Form.Group>

                    <Form.Group controlId="password1">
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control
                        className={styles.Input} 
                        type="password" 
                        placeholder="Password"
                        name="password1"
                        
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