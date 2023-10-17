import PropTypes from "prop-types";
import Modal from "react-modal";
import styles from "./ContactInfo.module.css";
import {FaUser} from "react-icons/fa"

const ContactInfo = ({ contact, onClose }) => {
  return (
    <div>
      <div className={styles.container}>
        <Modal
          isOpen={true}
          onRequestClose={onClose}
          className={`${styles.modalCentered}  modal-dialog modal-sm`}
        >
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className={`${styles.add} close`}
                onClick={onClose}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body"></div>
            <div className="contactText">
              <div className={styles.containerProfile}>
                <FaUser className={styles.profileIcon}/>
              </div>
              <h2 className={styles.titleModal}>
                {contact.Name} {contact.Lastname}
              </h2>
              <p className={styles.phone}>
                {contact.Phone}
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

ContactInfo.propTypes = {
  contact: PropTypes.shape({
    Name: PropTypes.string.isRequired, // Define los PropTypes para las propiedades de contact
    Lastname: PropTypes.string.isRequired,
    Phone: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired, // Define el PropTypes para onClose
};

export default ContactInfo;
