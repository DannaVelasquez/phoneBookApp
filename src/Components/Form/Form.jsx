import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import styles from "./Form.module.css";
import { FaUser, FaPhone } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";

Modal.setAppElement("#root");

const Form = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newContact, setContact] = useState({
    id: uuidv4(),
    Name: "",
    Lastname: "",
    Phone: "",
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    setContact({
      ...newContact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/Contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New contact added:", data);
      });
    setContact({ id: uuidv4(), Name: "", Lastname: "", Phone: "" });
    closeModal();
    location.reload();
  };

  return (
    <div>
      <div className={styles.container}>
        <h3 className={styles.title}>Contacts</h3>
        <button className={styles.add} onClick={openModal}>
          +
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={`${styles.modalCentered}  modal-dialog modal-lg`}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2 className={`${styles.titleModal} modal-title`}>New Contact</h2>
            <button
              type="button"
              className={`${styles.add} close`}
              onClick={closeModal}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="form-group" onSubmit={handleSubmit}>
              <div className="input-group mb-2">
                <span className={`${styles.inputIcon} input-group-text`}>
                  <FaUser />
                </span>
                <input
                  className="form-control"
                  type="text"
                  name="Name"
                  placeholder="Name"
                  value={newContact.Name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group mb-2">
                <span className={`${styles.inputIcon} input-group-text`}>
                  <FaUser />
                </span>
              <input
                type="text"
                name="Lastname"
                placeholder="Lastname"
                className="form-control"
                value={newContact.Lastname}
                onChange={handleInputChange}
              />
              </div>
              <div className="input-group mb-2">
                <span className={`${styles.inputIcon} input-group-text`}>
                  <FaPhone />
                </span>
              <input
                type="text"
                name="Phone"
                placeholder="Phone"
                className="form-control"
                value={newContact.Phone}
                onChange={handleInputChange}
              />
              </div>
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.button}>
                  Add
                </button>
                <button onClick={closeModal} className={styles.buttonSecond}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Form;
