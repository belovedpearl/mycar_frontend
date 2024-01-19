import React from 'react'
import styles from '../../styles/Reviews.module.css'
import Avatar from "../../components/Avatar";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Media } from 'react-bootstrap';
import { MoreToDo } from '../../components/MoreToDo';
import { useCurrentUser } from '../../contexts/CurrentUserContext';



const Reviews = (props) => {
  const {profile_id, profile_image, owner, updated_at, content} = props

  const currentUser = useCurrentUser()
  const is_owner = currentUser?.username === owner
  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
         <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <p>{content}</p>
        </Media.Body> 
        {is_owner && <MoreToDo handleEdit={() => {}} handleDelete={() => {}} /> }
      </Media>
    </div>
  );
}

export default Reviews