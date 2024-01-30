import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaShare } from 'react-icons/fa';
import styles from '../styles/Share.module.css';

const SocialShare = () => {
    const url = window.location.href;
    const description = "Intresting car post:"
    return (
        <div className={styles.SocialShare}>
            <Dropdown>
                <Dropdown.Toggle className={styles.DropdownButton} id="dropdown-basic">
                    <FaShare /> 
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.MenuDisplay}>
                    <Dropdown.Item 
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(description)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-twitter"></i>
                    </Dropdown.Item>
                    <Dropdown.Item 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-facebook"></i>
                    </Dropdown.Item>
                    <Dropdown.Item 
                        href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-pinterest"></i>
                    </Dropdown.Item>
                    <Dropdown.Item 
                        href={`mailto:?subject=${encodeURIComponent(description)}&body=Check out this post: ${encodeURIComponent(url)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <i className="fas fa-envelope"></i>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default SocialShare;