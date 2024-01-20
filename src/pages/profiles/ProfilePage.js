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
import { Button, Image } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";



function ProfilePage() { 
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const {id} = useParams()
    const { setProfileData } = useSetProfileData()
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;
    

  
    useEffect(() => {
        const fetchData = async() => {
            try{
                const [{data: pageProfile}] = await Promise.all(
                    [
                        axiosReq.get(`/profiles/${id}/`)
                        
                    ]
                )
                setProfileData(prevState => ({
                    ...prevState,
                    pageProfile: {results: [pageProfile]}
                }))
                console.log(pageProfile)
                
                setHasLoaded(true);
            }catch(err){
                console.log(err)
            }
        }
        fetchData(); 
    }, [id, setProfileData])

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
            
          <Image 
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
          
        </Col>
        <Col lg={6}>
            <h3 className="m-2">{profile?.owner}</h3>
             <p className="m-2">
                {profile?.job_title}, {profile?.current_employer}
             </p>
             <p className="m-2">
            <FaLocationDot />
            {profile?.location}
            </p>
            <Row className="justify-content-center no-gutters">
                <Col xs={4} className="my-2">
                    <div>{profile?.posts_count}</div>
                    <div>posts</div>
                </Col>
                <Col xs={4} className="my-2">
                    <div>{profile?.followers_count}</div>
                    <div >followers</div>
                </Col>
                <Col xs={4} className="my-2">
                    <div>{profile?.following_count}</div>
                    <div className="ml-2">following</div>
                </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
        <p>Follow button</p>
        </Col>
        {profile?.about && <Col className="p-3">{profile.about}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">Profile owner's posts</p>
      <hr />
    </>
  );
  return (
    <Row>
        <Col lg={2} className="d-none d-lg-block p-0 p-lg-2">
            <p>popular profiles for desktop</p>
          </Col>
      <Col className="py-2 p-0 p-lg-2" lg={6}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
 }

export default ProfilePage;