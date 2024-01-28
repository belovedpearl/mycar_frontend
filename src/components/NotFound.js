import React from 'react'
import NoResults2 from '../assets/no-results2.webp'
import styles from '../styles/NotFound.module.css'
import Asset from './Assets'
import btnStyles from '../styles/Button.module.css'
import { Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

const NotFound = () => {
    const history = useHistory();
    
    const handleButtonClick = () => {
        history.push('/');
    };
  return (
    <div className={styles.NotFoundDisplay}>
        <Asset 
            src={NoResults2} 
            message={   
                <span className={styles.errorText}>
                    Zoom Off!!! the page you're looking for does not exist
                </span>
            } 
        />
        <div className={styles.HomeBtn}>
            <Button 
                className={`${btnStyles.Button} ${btnStyles.Sharp}`} 
                type="submit"
                onClick={handleButtonClick}
            >
                Home
            </Button>
        </div>
    </div>
  )
}

export default NotFound