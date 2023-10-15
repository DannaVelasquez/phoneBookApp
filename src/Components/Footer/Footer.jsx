import styles from "./Footer.module.css";

const Footer = () => {
    return(
        <div className={styles.footer}>
            <p className={styles.title}>Made by Danna Velasquez</p>
            <p className={styles.title}>© GrupoR5</p>
        </div>
    )
}

export default Footer;