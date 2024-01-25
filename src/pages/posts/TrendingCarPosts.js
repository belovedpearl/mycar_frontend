import React, { useEffect, useState } from 'react';
import appStyles from '../../App.module.css';
import { Container } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import { Link } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';

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
    }, []);

    return (
        <Container className={appStyles.Content}>
            <p>Trending car posts</p>
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
                                alt={`Image of ${post.make} ${post.model}`}
                                className="img-fluid rounded mt-1"
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </Container>
    );
}

export default TrendingCarPosts;