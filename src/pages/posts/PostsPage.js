import React, { useEffect, useState } from "react";
// bootstrap imports
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import NoResults from '../../assets/no-results.png'
import Asset from '../../components/Assets'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import TrendingCarPosts from "./TrendingCarPosts";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function PostsPage({message, filter= ''}) {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
              const { data } = await axiosReq.get(
                `/posts/?${filter}search=${query}`
              );
              setPosts(data);
              setHasLoaded(true);
            } catch (err) {
              // console.log(err);
            }
        };
        setHasLoaded(false);
        const timer = setTimeout(() => {
          fetchPosts();
        }, 1000);
    
        return () => {
          clearTimeout(timer);
        };
      }, [filter, query, pathname, currentUser]);
  
  return (
    <Row className="h-100">
        <Col md={3} className="d-none d-lg-block p-0 p-lg-2">
          <TrendingCarPosts />
        </Col>
      <Col className="py-2 p-0 p-lg-2" lg={6}>
        <PopularProfiles mobile/>
        {/* Search Bar */}
        <i className= {`fas fa-search ${styles.SearchIcon}`} />
        <Form 
          className= {styles.SearchBar} 
          onSubmit={(event) => event.preventDefault()}
        >   
        <Form.Control
            type="text"
            className="mr-sm-2"
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Form>
        {/* Post Load */}
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll children= {posts.results.map((post) => (
                <Post 
                  key={post.id} {...post} 
                  setPosts={setPosts} 
                />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container className={appStyles.Content}>
                  <Asset 
                    src={NoResults} 
                    message={message} 
                  />
              </Container>
            )}
          </>
        ) : (
          <Container>
              <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={3} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostsPage;