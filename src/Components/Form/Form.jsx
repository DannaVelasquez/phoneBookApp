import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import styles from "./Form.module.css";

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
  };

  return (
    <div className={styles.container}>
      <button className={styles.add} onClick={openModal}>+</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
      >
        <h2 className={styles.title}>New Contact</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="Name"
            placeholder="Name"
            className={styles.input}
            value={newContact.Name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="Lastname"
            placeholder="Lastname"
            className={styles.input}
            value={newContact.Lastname}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="Phone"
            placeholder="Phone"
            className={styles.input}
            value={newContact.Phone}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>
            Add
          </button>
          <button onClick={closeModal} className={styles.button}>
            Cancel
          </button>
        </div>
        </form>
        
      </Modal>
    </div>
  );
};

export default Form;
