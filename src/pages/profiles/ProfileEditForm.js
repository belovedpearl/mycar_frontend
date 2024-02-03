import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
// bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const ProfileEditForm = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const imageFile = useRef();

    const [profileData, setProfileData] = useState({
        name: "",
        about: "",
        image: "",
        current_employer: "",
        job_title: "",
        location: "",
    });
    const { 
        name, 
        about, 
        image, 
        current_employer, 
        job_title, 
        location 
    } = profileData;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(
                        `/profiles/${id}/`
                    );
                    const { 
                        name, 
                        about, 
                        image, 
                        current_employer, 
                        job_title, 
                        location 
                    } = data;
                    setProfileData({ 
                        name, 
                        about, 
                        image, 
                        current_employer, 
                        job_title, 
                        location 
                    });
                } catch (err) {
                    console.log(err);
                    history.push("/");
                }
            } else {
                history.push("/");
            }
        };

        handleMount();
    }, [currentUser, history, id]);

    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("about", about);
        formData.append("current_employer", current_employer);
        formData.append("job_title", job_title);
        formData.append("location", location);

        if (imageFile?.current?.files[0]) {
            formData.append("image", imageFile?.current?.files[0]);
        }
        try {
            const { data } = await axiosReq.put(
                `/profiles/${id}/`, formData
            );
            setCurrentUser((currentUser) => ({
                ...currentUser,
                profile_image: data.image,
            }));
        history.goBack();
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
        }
    };

    const textFields = (
        <>
            <Form.Group>
                <Form.Label className="d-none">
                    Name
                </Form.Label>
                <Form.Control
                    as="textarea"
                    value={name}
                    onChange={handleChange}
                    placeholder="Name"
                    name="name"
                    rows={1}
                />
            </Form.Group>
            {errors?.name?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Label className="d-none">
                    About
                </Form.Label>
                <Form.Control
                    as="textarea"
                    value={about}
                    onChange={handleChange}
                    placeholder="A bit about yourself..."
                    name="about"
                    rows={4}
                />
            </Form.Group>
            {errors?.about?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Label className="d-none">
                    Current Employer
                </Form.Label>
                <Form.Control
                    as="textarea"
                    value={current_employer}
                    onChange={handleChange}
                    placeholder="Your current employer"
                    name="current_employer"
                    rows={1}
                />
            </Form.Group>
            {errors?.current_employer?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Label className="d-none">
                    Job title
                </Form.Label>
                <Form.Control
                    as="textarea"
                    value={job_title}
                    onChange={handleChange}
                    placeholder="Your job title"
                    name="job_title"
                    rows={1}
                />
            </Form.Group>
            {errors?.job_title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Label className="d-none">
                    Location
                </Form.Label>
                <Form.Control
                    as="textarea"
                    value={location}
                    onChange={handleChange}
                    placeholder="Location"
                    name="location"
                    rows={1}
                />
            </Form.Group>
            {errors?.location?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={ () => history.goBack() }
            >
                Cancel
            </Button>
            <Button 
                className={`${btnStyles.Button} ${btnStyles.Blue}`} 
                type="submit"
            >
                Save
            </Button>
        </>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col 
                    className="py-2 p-0 p-md-2 text-center" 
                    md={7} 
                    lg={6}
                >
                    <Container className={appStyles.Content}>
                        <Form.Group>
                            {image && (
                                <figure>
                                <Image src={image} fluid />
                                </figure>
                            )}
                            {errors?.image?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                            <div>
                                <Form.Label
                                className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
                                htmlFor="image-upload"
                                >
                                    Change the image
                                </Form.Label>
                            </div>
                            <Form.File
                                id="image-upload"
                                ref={imageFile}
                                accept="image/*"
                                onChange={(e) => {
                                if (e.target.files.length) {
                                    setProfileData({
                                    ...profileData,
                                    image: URL.createObjectURL(e.target.files[0]),
                                    });
                                }
                                }}
                            />
                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col 
                    md={5} 
                    lg={6} 
                    className="d-none d-md-block p-0 p-md-2 text-center"
                >
                    <Container className={appStyles.Content}>
                        {textFields}
                    </Container>
                </Col>
            </Row>
        </Form>
    );
};

export default ProfileEditForm;