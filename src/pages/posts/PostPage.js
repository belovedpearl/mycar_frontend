import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

import ReviewCreateForm from "../reviews/ReviewCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function PostPage() {
  // Add your logic here
  const {id} = useParams()
  const [post, setPost] = useState({results: []})

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [reviews, setReviews] = useState({ results: [] });
  
  useEffect( () => {
    const handleMount = async () => {
        try {        
            const [{ data: post }] = await Promise.all([
                axiosReq.get(`/posts/${id}`),
            ])
            setPost({results: [post]});
            console.log(post)
        } catch (err){
            console.log(err)
        }
    }
    handleMount()
  }, [id])


  return (
    <Row className="h-100">
      <Col lg={2} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={6}>
        <p>Popular profiles for mobile</p>
        {/* Post Component here */}
        <Post {...post.results[0]} setPosts= {setPost} postPage/>
        <Container className={appStyles.Content}>
        {currentUser ? (
          <ReviewCreateForm
          profile_id={currentUser.profile_id}
          profileImage={profile_image}
          post={id}
          setPost={setPost}
          setComments={setReviews}
        />
        ) : reviews.results.length ? (
          "Reviews"
        ) : null}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;