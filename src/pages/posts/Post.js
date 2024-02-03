import React from 'react'
import styles from '../../styles/Post.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
// bootstrap imports
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
// react icons
import { FaRegThumbsUp } from "react-icons/fa";
import { FaCommentMedical } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa";

import { axiosRes } from '../../api/axiosDefaults';
import { MoreToDo } from '../../components/MoreToDo'
import Share from '../../components/Share'

const Post = (props) => {
    const {
        body_types,
        description,
        downvote_id,
        downvotes_count,
        id,
        image,
        make,   
        model,
        owner,
        profile_id,
        profile_image,
        reviews_count,
        updated_at,
        upvote_id,
        upvotes_count,
        year, 
        postPage,
        setPosts 
    } = props;
    
    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === owner
    const history = useHistory()
    // Allows post update
    const handleEdit = () => {
        history.push(`/posts/${id}/edit`);
      };
    //   Allows post delete
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}/`);
            history.goBack()
        } catch (err){
            console.log(err)
        }
    }

    const handleUpvote = async () => {
        try {
            // check if an downvote exists, prevent upvoting
            if (downvote_id) {        
                console.log("Cannot upvote when downvote exists");
                return;
            }
        // send a post request
        const { data } = await axiosRes.post("/upvotes/", { post: id });
         setPosts((prevPosts) => ({
             ...prevPosts,
             results: prevPosts.results.map((post) => {
                 return post.id === id
                   ? { ...post, upvotes_count: post.upvotes_count + 1, upvote_id: data.id }
                   : post;
             })
         }))
        } catch (err){
         console.log (err)
        }
     }
     const removeUpvote = async () => {
        try {
             // send a delete request
          await axiosRes.delete(`/upvotes/${upvote_id}/`);
          setPosts((prevPosts) => ({
            ...prevPosts,
            results: prevPosts.results.map((post) => {
              return post.id === id
                ? { ...post, upvotes_count: post.upvotes_count - 1, upvote_id: null }
                : post;
            }),
          }));
        } catch (err) {
          console.log(err);
        }
      };


     const handleDownvote = async () => {
        try {
            // check if an upvote exists, prevent downvoting
            if (upvote_id) {
                console.log("Cannot downvote when upvote exists");
                return;
            }
         // send a post request
         const { data } = await axiosRes.post("/downvotes/", { post: id });
         setPosts((prevPosts) => ({
             ...prevPosts,
             results: prevPosts.results.map((post) => {
                 return post.id === id
                   ? { ...post,
                     downvotes_count: post.downvotes_count + 1, 
                     downvote_id: data.id 
                    }
                   : post;
             })
         }))
        } catch (err){
         console.log (err)
        }
     }

     const removeDownvote = async () => {
        try {
             // send a delete request
          await axiosRes.delete(`/downvotes/${downvote_id}/`);
          setPosts((prevPosts) => ({
            ...prevPosts,
            results: prevPosts.results.map((post) => {
              return post.id === id
                ? { ...post,
                     downvotes_count: post.downvotes_count - 1,
                      downvote_id: null 
                  }
                : post;
            }),
          }));
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div>
         <Card className={styles.Post}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link 
                        to={`/profiles/${profile_id}`} 
                        style={{ color: 'black' }}
                    >
                        <Avatar src={profile_image} height={55}/>
                        {owner}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span className='mr-3'>{updated_at}</span>
                        {is_owner &&
                         postPage &&
                          <MoreToDo 
                            handleEdit={ handleEdit } 
                            handleDelete={ handleDelete }
                           />
                        }
                    </div>
                </Media>
                
            </Card.Body>
             <Link to={`/posts/${id}`}>
                <Card.Img 
                    src={image} 
                    className={styles.Display} 
                    alt={`${make} ${model} picture`} 
                />
            </Link>
            <Card.Body>           
            {body_types &&
             <Card.Title className="text-center font-weight-bold">
                {body_types}
             </Card.Title>
            }
            <div className="d-flex mx-auto">
                <div className="mr-2">
                    <span className="font-weight-bold mr-2">
                        {make}
                    </span>
                    <span className="font-weight-bold">
                        {model}
                    </span>
                </div>
                <span className="ml-auto font-weight-bold">
                    {year}
                </span>
            </div>
            {description && 
                <Card.Text>
                    {description}
                </Card.Text>
            }
            <div className="d-flex justify-content-between">
                <div className='mr-2'>
                    {/* Upvote */}
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    You created the post!                           
                                </Tooltip>
                            }
                            >
                            <FaRegThumbsUp 
                                className={`${styles.Heart} mr-2`} 
                                size={25}
                            />
                        </OverlayTrigger>
                    ) : upvote_id ? (
                        <span onClick={removeUpvote}>
                        <FaRegThumbsUp 
                            className={`${styles.Heart} mr-2`} 
                            size={25} 
                        />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleUpvote }>
                            <FaRegThumbsUp 
                                className={`${styles.HeartOutline} mr-2`} 
                                size={25}
                            />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to upvote this post!</Tooltip>}
                        >
                            <FaRegThumbsUp 
                                className={`${styles.HeartOutline} mr-2`} 
                                size={25} 
                            />
                        </OverlayTrigger>
                    )}
                    {upvotes_count}
                </div>
                <div>
                    {/* downvote */}
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    You created the post!                           
                                </Tooltip>
                            }
                            >
                            <FaRegThumbsDown 
                                className={`${styles.Heart} mr-2`} 
                                size={25}
                            />
                        </OverlayTrigger>
                    ) : downvote_id ? (
                        <span onClick={removeDownvote}>
                            <FaRegThumbsDown 
                                className={`${styles.Heart} mr-2`} 
                                size={25} 
                            />
                        </span>
                    ) : currentUser ? (
                        <span onClick={ handleDownvote }>
                            <FaRegThumbsDown 
                                className={`${styles.HeartOutline} mr-2`} 
                                size={25}
                            />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Log in to downvote this post!
                                </Tooltip>
                            }
                        >
                            <FaRegThumbsDown className='mr-2' size={25}/>
                        </OverlayTrigger>
                    )}
                    {downvotes_count}
                </div>
                <div>
                    {/* reviews */}
                    <Link to={`/posts/${id}`} className='mr-1'>
                        <FaCommentMedical style={{ color: 'black' }} size={25} />
                    </Link>
                    {reviews_count}
                </div>
                <Share />
            </div>
            </Card.Body>
        </Card> 
    </div>
  )
}

export default Post