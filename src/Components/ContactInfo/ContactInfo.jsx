import PropTypes from "prop-types";
import Modal from "react-modal";
import styles from "./ContactInfo.module.css";
import { FaUser } from "react-icons/fa";

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
              <div>
                <FaUser className={styles.profileIcon} />
              </div>
              <h2 className={styles.titleModal}>
                {contact.Name} {contact.Lastname}
              </h2>
              <p className={styles.phone}>{contact.Phone}</p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

//PropTypes para las props onClose y contact
ContactInfo.propTypes = {
  contact: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Lastname: PropTypes.string.isRequired,
    Phone: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default ContactInfo;
