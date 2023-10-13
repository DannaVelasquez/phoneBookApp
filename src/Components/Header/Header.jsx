import styles from "./Header.module.css";
import {FaAddressBook} from "react-icons/fa";

const Header = () => {
    return(
        <div className={styles.header}>
            <FaAddressBook className={styles.book}/>
            <h1 className={styles.title}>Phone Book App</h1>
        </div>
    )
}

export default Header;