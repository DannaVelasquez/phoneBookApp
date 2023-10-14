import styles from "./Searchbar.module.css"

const Searchbar = () => {
    return(
        <div className={styles.bar}>
            <input
                className={styles.input}
                type="text"
            />
        </div>
    )

}

export default Searchbar;