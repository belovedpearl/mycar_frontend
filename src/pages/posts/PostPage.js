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
import Reviews from "../reviews/Reviews";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Assets";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import TrendingCarPosts from "./TrendingCarPosts";

function PostPage() {
  const {id} = useParams()
  const [post, setPost] = useState({results: []})
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [reviews, setReviews] = useState({ results: [] });
  
  useEffect( () => {
      const handleMount = async () => {
          try {        
              const [{ data: post }, {data: reviews}] = await Promise.all([
                  axiosReq.get(`/posts/${id}`),
                  axiosReq.get(`/reviews/?post=${id}`),
              ])
              setPost({results: [post]});
              setReviews(reviews);
              console.log(post)
          } catch (err){
              console.log(err)
          }
      }
      handleMount()
    }, [id])


    return (
        <Row className="h-100">
            <Col md={3} className="d-none d-lg-block p-0 p-lg-2">
              <TrendingCarPosts />
            </Col>
          <Col className="py-2 p-0 p-lg-2" lg={6}>
            <PopularProfiles  mobile />
            {/* Post Component here */}
            <Post {...post.results[0]} setPosts= {setPost} postPage/>
            <Container className={appStyles.Content}>
            {currentUser ? (
              <ReviewCreateForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                post={id}
                setPost={setPost}
                setReviews={setReviews}
            />
            ) : reviews.results.length ? (
              "Reviews"
            ) : null}
            {reviews.results.length?(
              <InfiniteScroll children={reviews.results.map(
                review => (
                  <Reviews key={review.id} {...review} setPost= {setPost} setReviews= {setReviews}/>
                ))}
                dataLength={reviews.results.length}
                loader={<Asset spinner />}
                hasMore={!!reviews.next}
                next={() => fetchMoreData(reviews, setReviews)}
              />
            ): currentUser ? (
              <span>No Reviews yet, be the first to add a review</span>
            ): (
              <span>No Reviews yet</span>
            )}
            </Container>
          </Col>
          <Col md={3} className="d-none d-lg-block p-0 p-lg-2">
              <PopularProfiles />
          </Col>
        </Row>
    );
}

export default PostPage;