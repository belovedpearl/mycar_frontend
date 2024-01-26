import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreToDo.module.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useHistory } from "react-router";

// The forwardRef is important!!
const OnlyOwner = React.forwardRef(({ onClick }, ref) => (
    <i
      className="fas fa-ellipsis-v"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
));
 
export const MoreToDo = ( {handleEdit, handleDelete} ) => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={OnlyOwner} />   
            <Dropdown.Menu
                className="text-center"
                popperConfig={ { strategy: "fixed" } }
            >
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={ handleEdit }
                    aria-label="edit"
                >
                    <FaRegEdit  size={30}/>
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.DropdownItem}
                  onClick={ handleDelete }
                  aria-label="delete"
                >
                    <MdDeleteForever size={30} />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
  };
  
export function ProfileEditDropdown({ id }) {
    const history = useHistory();
    return (
      <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
          <Dropdown.Toggle as={OnlyOwner} />
          <Dropdown.Menu>
              <Dropdown.Item
                onClick={ () => history.push(`/profiles/${id}/edit`) }
                aria-label="edit-profile"
              >
                  <i className="fas fa-edit" />
                  Edit Profile
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => history.push(`/profiles/${id}/edit/username`)}
                aria-label="edit-username"
              >
                  <i className="far fa-id-card" />
                  Change Username
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => history.push(`/profiles/${id}/edit/password`)}
                aria-label="edit-password"
              >
                  <i className="fas fa-key" />
                  Change Password
              </Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
    );
}