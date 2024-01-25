import React, { useEffect, useState } from 'react';
import appStyles from '../../App.module.css';
import { Container } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import { Link } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import Asset from '../../components/Assets';

const TrendingCarPosts = () => {
    const [trendingCarPosts, setTrendingCarPosts] = useState([]);

    useEffect(() => {
        const fetchTrendingCars = async () => {
            try {
                const response = await axiosReq.get('/posts/?ordering=-upvotes_count');
                    setTrendingCarPosts(response.data.results);
                    console.log(trendingCarPosts)
            } catch (err) {
                console.error(err);
            }
        }
        fetchTrendingCars();
    }, [trendingCarPosts]);

    return (
        <Container className={appStyles.Content}>
            {trendingCarPosts.length?(
                <>
                    <p>
                        Trending car posts
                    </p>
                    <ul>                       
                        {trendingCarPosts.map((post, index) => (
                            <li key={index} className='mb-3'>
                                <Link to={`/posts/${post.id}`}>
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
                ): (
                    <Asset spinner />
            )}
        </Container>
    );
}

export default TrendingCarPosts;