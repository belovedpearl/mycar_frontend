import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Assets";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import PopularProfiles from "./PopularProfiles";
import { Button, Image, Tabs } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import NoResults from '../../assets/no-results.png'
import { fetchMoreData } from "../../utils/utils";
import Post from '../posts/Post'
import InfiniteScroll from "react-infinite-scroll-component";
import Tab from "react-bootstrap/Tab";
import { ProfileEditDropdown } from "../../components/MoreToDo";
import TrendingCarPosts from "../posts/TrendingCarPosts";


function ProfilePage() { 
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const {id} = useParams()
    const { 
        setProfileData, 
        handleFollow, 
        handleUnfollow 
    } = useSetProfileData()
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;
    const [profilePosts, setProfilePosts] = useState({ results: [] });
    const [upvotePosts, setUpvotePosts] = useState({ results: [] });
    const [downvotePosts, setDownvotePosts] = useState({ results: [] });
     
    useEffect(() => {
        const fetchData = async() => {
            try{
                const [
                    {data: pageProfile}, 
                    { data: profilePosts }, 
                    {data: upvotePosts}, 
                    {data: downvotePosts}
                        ] = await Promise.all(
                    [
                        axiosReq.get(`/profiles/${id}/`),
                        axiosReq.get(`/posts/?owner__profile=${id}`),
                        axiosReq.get(
                            `/posts/?upvotes__owner__profile=${id}&ordering=-upvotes__created_at&`
                        ),
                        axiosReq.get(
                            `/posts/?downvotes__owner__profile=${id}&ordering=-downvotes__created_at&`
                        ),                       
                    ]
                )
                setProfileData(prevState => ({
                    ...prevState,
                    pageProfile: {results: [pageProfile]}
                }))
                setProfilePosts(profilePosts);
                setUpvotePosts(upvotePosts)
                setDownvotePosts(downvotePosts)
                setHasLoaded(true);
            }catch(err){
                console.log(err)
            }
        }
        fetchData(); 
    }, [id, upvotePosts, downvotePosts, setProfileData])

    const mainProfile = (
        <>
            {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">          
                    <Image 
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                    />                 
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">
                        {profile?.owner}
                    </h3>
                    <p className="m-2">
                        {profile?.job_title}, {profile?.current_employer}
                    </p>                    
                    {profile?.location && <p className="m-2">
                        <FaLocationDot />
                        {profile.location}
                        </p>
                    }
                    <Row className="justify-content-center no-gutters">
                        <Col xs={4} className="my-2">
                            <div>
                                {profile?.posts_count}
                            </div>
                            <div>
                                Posts
                            </div>
                        </Col>
                        <Col xs={4} className="my-2">
                            <div>
                                {profile?.followers_count}
                            </div>
                            <div>
                                Followers
                            </div>
                        </Col>
                        <Col xs={4} className="my-2">
                            <div>
                                {profile?.following_count}
                            </div>
                            <div className="ml-2">
                                Following
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className="text-lg-right">
                    {currentUser &&
                        !is_owner &&
                        (profile?.following_id ? (
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                            onClick={() => handleUnfollow(profile)}
                        >
                            Unfollow
                        </Button>
                        ) : (
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Black}`}
                            onClick={() => handleFollow(profile)}
                        >
                            Follow
                        </Button>
                    ))}
                </Col>
                {profile?.about && <Col className="p-3">{profile.about}</Col>}
            </Row>
        </>
  );

  const mainProfilePosts = (
        <>
            {profilePosts.results.length ? (
                <InfiniteScroll
                    children={profilePosts.results.map((post) => (
                        <Post key={post.id} {...post} setPosts={setProfilePosts} />
                    ))}
                    dataLength={profilePosts.results.length}
                    loader={ <Asset spinner />}
                    hasMore={ !!profilePosts.next }
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                />
                ) : (
                    <Asset
                        src={NoResults}
                        message={`No results found ${
                            profile?.owner
                        } hasn't created any posts yet.`}
                    />
            )}
        </>
    );
    const upvotes = (
        <>
            {upvotePosts.results.length ? (
                <InfiniteScroll
                    children={upvotePosts.results.map((post) => (
                        <Post key={post.id} {...post} setPosts={setUpvotePosts} />
                    ))}
                    dataLength={upvotePosts.results.length}
                    loader={ <Asset spinner />}
                    hasMore={ !!upvotePosts.next }
                    next={() => fetchMoreData(upvotePosts, setUpvotePosts)}
                />
                ) : (
                    <Asset
                        src={NoResults}
                        message={`No results found ${
                            profile?.owner
                        } has not upvoted any post.`}
                    />
            )}
        </>
    )
    const downvotes = (
        <>
            {downvotePosts.results.length ? (
                <InfiniteScroll
                    children={downvotePosts.results.map((post) => (
                        <Post key={post.id} {...post} setPosts={setDownvotePosts} />
                    ))}
                    dataLength={downvotePosts.results.length}
                    loader={ <Asset spinner />}
                    hasMore={ !!downvotePosts.next }
                    next={() => fetchMoreData(downvotePosts, setDownvotePosts)}
                />
                ) : (
                    <Asset
                        src={NoResults}
                        message={`No results found ${
                            profile?.owner
                        } has not downvoted any post.`}
                    />
            )}
        </>
    )

  const profileSections = (
        <>
            <Tabs 
                className="d-flex justify-content-around" 
                defaultActiveKey="posts" 
                id="profile-tab"
            >
                <Tab eventKey="posts" title={`Posts`}>
                    { mainProfilePosts }
                </Tab>
                <Tab eventKey="upvotes" title={`Upvotes`}>
                    { upvotes }
                </Tab>
                <Tab eventKey="downvotes" title={`Downvotes`}>
                    { downvotes }
                </Tab>
            </Tabs>
        </>
    );

  return (
    <Row>
        <Col md={3} className="d-none d-lg-block p-0 p-lg-2">
              <TrendingCarPosts />
            </Col>
        <Col className="py-2 p-0 p-lg-2" lg={6}>
            <PopularProfiles mobile />
            <Container className={ appStyles.Content }>
                {hasLoaded ? (
                    <>
                        {mainProfile}
                        {profileSections}
                    </>
                    ) : (
                        <Asset spinner />
                    )
                }
            </Container>
        </Col>
        <Col md={3} className="d-none d-lg-block p-0 p-lg-2">
            <PopularProfiles />
        </Col>
    </Row>
  );
 }

export default ProfilePage;