import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { FaUpload } from "react-icons/fa";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { Alert } from "react-bootstrap";
import { useRedirect } from "../../hooks/useRedirect";

function PostCreateForm() {
    useRedirect("signedOut")
    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        make: "",
        model: "",
        year: "",
        description: "",
        body_types: "",
        image: ""
    });
    const { 
        make, 
        model, 
        year, 
        description, 
        body_types, 
        image 
      } = postData;
    const imageInput = useRef(null)
    const history = useHistory()

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };
    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("make", make);
        formData.append("model", model);
        formData.append("year", year);
        formData.append("description", description);
        formData.append("body_types", body_types);
        formData.append("image", imageInput.current.files[0]);
        try {
            const { data } = await axiosReq.post("/posts/", formData);
            history.push(`/posts/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    }
    const textFields = (
        <div className="text-center">
            {/* Car Make Input */}
            <Form.Group controlId="make">
                <Form.Label className="d-none">Car Make</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter car make" 
                    name="make"
                    value={make} 
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.make?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            {/* Car Model Input */}
            <Form.Group controlId="model">
                <Form.Label className="d-none">Car Model</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter car model" 
                    name="model"
                    value={model} 
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.model?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            {/* Car Year Input */}
            <Form.Group controlId="year">
                <Form.Label className="d-none">Car Year</Form.Label>
                <Form.Control 
                    type="number" 
                    placeholder="Enter car year" 
                    name="year"
                    value={year} 
                    onChange={handleChange} 
                />
            </Form.Group>
            {errors.year?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            {/* Car Description Input */}
            <Form.Group controlId="description">
                  <Form.Label className="d-none">
                      Car Description
                  </Form.Label>
                  <Form.Control 
                      as="textarea" 
                      rows={3} 
                      placeholder="Your view about the car" 
                      name="description"
                      value={description}
                      onChange={handleChange}
                  />
            </Form.Group>
            {errors.description?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))} 
            
            {/* Car Body Type */}
            <Form.Group controlId="body_types">
                <Form.Label className="d-none">
                    Car Bodytype
                </Form.Label>
                <Form.Control
                    as="select"
                    name="body_types"
                    value={body_types}
                    onChange={handleChange}
                >
                    <option>Hatchbacks</option>
                    <option>Convertible</option>
                    <option>SUV</option>
                    <option>Electric</option>
                    <option>Sports car</option>
                    <option>Hybrid</option>
                    <option>Vintage</option>
                    <option>Muscle</option>
                    <option>Limousine</option>
                    <option>Others</option>
                </Form.Control>
            </Form.Group>
            {errors.body_types?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}
                
            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => history.goBack()}
            >
                Cancel
            </Button>
            <Button 
                className={`${btnStyles.Button} ${btnStyles.Blue}`} 
                type="submit"
            >
                Create
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${styles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                    <figure>
                                        <Image 
                                            className={appStyles.Image} 
                                            src={image} rounded
                                        />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                                            htmlFor="image-upload"
                                        >
                                            Change the image
                                        </Form.Label>
                                    </div>
                                </>
                            ): (
                                <Form.Label
                                  className="d-flex flex-column align-items-center"
                                  htmlFor="image-upload"
                                >
                                  <FaUpload size='5em' className="mb-4"/>
                                  <span>Click or tap to add an image</span>
                                </Form.Label>
                              )}
                              <Form.File
                                  id="image-upload"
                                  accept="image/*"
                                  onChange={handleChangeImage}
                                  ref={imageInput}
                              />
                        </Form.Group>
                        <div className="d-md-none">
                            {textFields}
                        </div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={styles.Content}>
                        {textFields}
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PostCreateForm;