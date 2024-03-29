import React, { useState } from "react";
import styles from '../../styles/Reviews.module.css'
import Avatar from "../../components/Avatar";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Media } from 'react-bootstrap';
import { MoreToDo } from '../../components/MoreToDo';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';
import ReviewEditForm from "./ReviewEditForm";



const Reviews = (props) => {
    const {
      profile_id, 
      profile_image, 
      owner, 
      updated_at, 
      content, 
      id, 
      setPost, 
      setReviews
    } = props
    const [showEditForm, setShowEditForm] = useState(false);

    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === owner

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/reviews/${id}/`);
            setPost(prevPost => ({
              results: [
                {
                  ...prevPost.results[0],
                  reviews_count: prevPost.results[0].reviews_count -1
                }
              ]
          }))
          setReviews((prevReviews) => ({
              ...prevReviews,
              results: prevReviews.results.filter((review) => review.id !== id),
          }));
        } catch (err){
          // console.log(err)
        }
    }

    return (
      <>
        <hr />
        <Media>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} />
            </Link>
            <Media.Body className="align-self-center ml-2">
              <span className={styles.Owner}>
                {owner}
              </span>
              <span className={styles.Date}>
                {updated_at}
              </span>
              {showEditForm ? (
                <ReviewEditForm
                id={id}
                profile_id={profile_id}
                content={content}
                profileImage={profile_image}
                setReviews={setReviews}
                setShowEditForm={setShowEditForm}
                />
              ) : (
                <p>{content}</p>
              )}
            </Media.Body>
            {is_owner && !showEditForm && (
              <MoreToDo
                handleEdit={() => setShowEditForm(true)}
                handleDelete={handleDelete}
              />
            )}
        </Media>
      </>
    );
}

export default Reviews