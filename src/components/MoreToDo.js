import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreToDo.module.css";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";



// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
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


 
export const MoreToDo = ({handleEdit, handleDelete}) => {
    return (
      <Dropdown className="ml-auto" drop="left">
        <Dropdown.Toggle as={OnlyOwner} />
  
        <Dropdown.Menu
          className="text-center"
          popperConfig={{ strategy: "fixed" }}
        >
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleEdit}
            aria-label="edit"
          >
            {/* <<i className="fas fa-edit" />> */}
            <FaRegEdit  size={30}/>
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleDelete}
            aria-label="delete"
          >
            {/* <i className="fas fa-trash-alt" /> */}
            <MdDeleteForever size={30} />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  

  