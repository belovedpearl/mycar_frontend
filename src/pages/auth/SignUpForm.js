import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
//Custom styles
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import CoverImage from '../../assets/img.jpeg';
//Bootstrap imports
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
    useRedirect("signedIn")
    const [signUpData, setSignUpData] = useState (
        {
            username: '',
            password1: '',
            password2: '',
        }
    );
    const {username, password1, password2} = signUpData;
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/registration/", signUpData);
            history.push("/signin");  
        } catch (err) {
            // console.log(err)
            setErrors(err.response?.data);
        }
    };
  
    return (
        <Row className={styles.Row}>
            {/* Left side */}
            <Col className="my-auto py-2 p-md-2" md={6}>
                <Container className= "p-4">
                    <h1 className={styles.Header}>SIGN UP</h1>
                
                    {/* Registration form */}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">
                                Username
                            </Form.Label>
                            <Form.Control 
                                className={styles.Input}
                                type="text" 
                                placeholder="Enter username" 
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.username?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group controlId="password1">
                            <Form.Label className="d-none">
                                Password
                            </Form.Label>
                            <Form.Control
                                className={styles.Input} 
                                type="password" 
                                placeholder="Password"
                                name="password1"
                                value={password1}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password1?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group controlId="password2">
                            <Form.Label className="d-none">
                                Confirm Password
                            </Form.Label>
                            <Form.Control 
                                className={styles.Input}
                                type="password" 
                                placeholder="Confirm Password"
                                name="password2" 
                                value={password2}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password2?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <Button 
                            className={
                                `${btnStyles.Button} ${btnStyles.Broad} ${btnStyles.Sharp}`
                            } 
                            type="submit"
                        >
                            Sign Up
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert key={idx} variant="warning" className="mt-3">
                                {message}
                            </Alert>
                        ))}
                    </Form>
                </Container>
                <Container className={`mt-3 ${appStyles.NoResults}`}>
                    <p className={styles.LinkText}>
                        <span className="mr-2">
                            Already have an account?
                        </span>
                        <Link className={styles.Link} to="/signin">
                            Sign in
                        </Link>
                    </p>
                </Container>
            </Col>
            {/* Right side */}
            <Col
                md={6}
                className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
            >
                <Image
                    className={`${appStyles.CoverImage} img-fluid rounded-circle`}
                    src= {CoverImage}
                    alt="Sign up page cover picture"
                />
            </Col>
        </Row>
    );
};

export default SignUpForm;