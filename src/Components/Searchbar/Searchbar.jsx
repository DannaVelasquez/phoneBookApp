import styles from "./Searchbar.module.css";
import { FaSearch } from "react-icons/fa";
import PropTypes from 'prop-types';


const Searchbar = ({ handleSearch }) => {

    Searchbar.propTypes = {
        handleSearch: PropTypes.func.isRequired,
      };
      
   
      


  return (
    <div className={styles.bar}>
      <div className="input-group">
        
        <input
          className={`form-control ${styles.input}`}
          type="text"
          placeholder="Search"
          onChange={handleSearch}
        />
        <div className="input-group-prepend">
          <span className={`input-group-text ${styles.iconContainer}`}>
            <FaSearch className={styles.searchIcon} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
