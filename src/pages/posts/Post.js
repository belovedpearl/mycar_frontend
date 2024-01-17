import React from 'react'
import styles from '../../styles/Post.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { FaRegThumbsUp } from "react-icons/fa";
import { FaCommentMedical } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa";

const Post = (props) => {
    const {
        body_types,
        description,
        downvote_id,
        downvotes_count,
        id,
        image,
        location,
        make,   
        model,
        owner,
        profile_id,
        profile_image,
        reviews_count,
        review_id,
        updated_at,
        upvote_id,
        upvotes_count,
        year, 
        postPage,   
    } = props;
    
    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === owner
  return (
    <div>
         <Card className={styles.Post}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`} style={{ color: 'black' }}>
                        <Avatar src={profile_image} height={55}/>
                        {owner}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span>{updated_at}</span>
                        {is_owner && postPage && '...' }
                    </div>
                </Media>
                
            </Card.Body>
             <Link to={`/posts/${id}`}>
                <Card.Img src={image} alt={`${make} ${model} picture`} />
            </Link>
            <Card.Body>           
            {body_types && <Card.Title className="text-center font-weight-bold">{body_types}</Card.Title>}
            <div className="d-flex mx-auto">
                <div className="mr-2">
                    <span className="font-weight-bold mr-2">{make}</span>
                    <span className="font-weight-bold">{model}</span>
                </div>
                <span className="ml-auto font-weight-bold">{year}</span>
            </div>
            {description && <Card.Text>{description}</Card.Text>}
            <div className="d-flex justify-content-between">
                <div className='mr-2'>
                    {/* Upvote */}
                    {is_owner ? (
                        <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>You created the post!</Tooltip>}
                        >
                        <FaRegThumbsUp className={`${styles.Heart} mr-2`}/>
                        </OverlayTrigger>
                    ) : upvote_id ? (
                        <span onClick={()=>{}}>
                        <FaRegThumbsUp className={`${styles.Heart} mr-2`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={ ()=> {} }>
                        <FaRegThumbsUp className={`${styles.HeartOutline} mr-2`} size={30}/>
                        </span>
                    ) : (
                        <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Log in to add your review!</Tooltip>}
                        >
                        <FaRegThumbsUp />
                        </OverlayTrigger>
                    )}
                    {upvotes_count}
                </div>
                <div>
                {/* downvote */}
                {is_owner ? (
                    <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>You created the post!</Tooltip>}
                    >
                    <FaRegThumbsDown className={`${styles.Heart} mr-2`}/>
                    </OverlayTrigger>
                ) : downvote_id ? (
                    <span onClick={()=>{}}>
                    <FaRegThumbsDown className={`${styles.Heart} mr-2`}/>
                    </span>
                ) : currentUser ? (
                    <span onClick={ ()=> {} }>
                    <FaRegThumbsDown className={`${styles.HeartOutline} mr-2`} size={30}/>
                    </span>
                ) : (
                    <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Log in to add your review!</Tooltip>}
                    >
                    <FaRegThumbsDown className='mr-2'/>
                    </OverlayTrigger>
                )}
                {downvotes_count}
                </div>
                <div>
                    {/* reviews */}
                <Link to={`/posts/${id}`} className='mr-1'>
                    <FaCommentMedical style={{ color: 'black' }} />
                </Link>
                {reviews_count}
                </div>
            </div>
            </Card.Body>
        </Card> 
    </div>
  )
}

export default Post