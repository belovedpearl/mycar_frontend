import React, { useEffect, useState } from 'react';
import appStyles from '../../App.module.css';
// bootstrap imports
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { axiosReq } from '../../api/axiosDefaults';
import { Link } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import Asset from '../../components/Assets';
import styles from '../../styles/TrendingCarPosts.module.css'

const TrendingCarPosts = ({mobile}) => {
    const [trendingCarPosts, setTrendingCarPosts] = useState([]);

    useEffect( () => {
        const fetchTrendingCars = async () => {
            try {
                const response = await axiosReq.get(
                    '/posts/?ordering=-upvotes_count'
                );
                // filter out posts with higher upvotes than downvotes
                const filteredPosts = response.data.results.filter(
                    post => post.upvotes_count > post.downvotes_count
                );
                    // set them as trending posts
                    setTrendingCarPosts(filteredPosts);
            } catch (err) {
                // console.error(err);
            }
        }
        fetchTrendingCars();
    }, []);

    return (
        <Container 
            className={`${appStyles.Content} ${mobile && 'd-lg-none mr-2'}`}
        >
            {trendingCarPosts.length?(
                <>
                    {mobile ? (
                        <NavDropdown title="Trending" id="basic-nav-dropdown"
                        className={styles.DropDown}
                        >
                            {trendingCarPosts.map((post, index) => (
                                <NavDropdown.Item 
                                    key={index} 
                                    as={Link} 
                                    to={`/posts/${post.id}`}
                                >
                                    <strong>
                                        {`${post.make} ${post.model}`}
                                    </strong>
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    ): (
                    <>
                        <p>
                            Trending car posts
                        </p>
                        <ul>                       
                            {trendingCarPosts.map((post, index) => (
                                <li 
                                    key={index} 
                                    className='mb-3'
                                >
                                    <Link 
                                        to={`/posts/${post.id}`}
                                    >
                                        <p>
                                            <FaCar className="mr-2" />
                                            {`${post.make} ${post.model}`}
                                        </p>
                                        <img
                                            src={post.image}
                                            alt=''
                                            className="img-fluid rounded mt-1"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                    )}
               </>
                ): (
                    <Asset spinner />
            )}
        </Container>
    );
}

export default TrendingCarPosts;