import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import styles from "./Form.module.css";
import { FaUser, FaPhone } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";

Modal.setAppElement("#root");

const Form = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addButtonDisabled, setAddButtonDisabled] = useState(true); //estados para habilitar/inhabilitar boton de crear contacto
  const [newContact, setContact] = useState({
    id: uuidv4(), //Genera Id's automáticos
    Name: "",
    Lastname: "",
    Phone: "",
  });

  //Maneja el abrir y cerrar del modal para crear contacto
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  //Función para controlar los estados de los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "Phone") {
      const validPhoneInput = /^[0-9()+-]*$/; //Valida que se ingresen solo numeros, + , - y () en el campo Phone. de no ser asi no actualiza estado
      if (!value.match(validPhoneInput)) {
        return;
      }
    }
    setContact({
      ...newContact,
      [name]: value,
    });

    //estados boton para crear contacto
    const isDisabled = !newContact.Name || !newContact.Phone;
    setAddButtonDisabled(isDisabled);
  };

  //Función para controlar el botón de crear
  const handleSubmit = (e) => {
    e.preventDefault();
    //Llamada a API (Json Server) para crear un nuevo contacto
    fetch("http://localhost:3001/Contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json())
      .then((data) => {
        data;
        setContact({ id: uuidv4(), Name: "", Lastname: "", Phone: "" });
        closeModal();
      });
    location.reload();
  };

  return (
    <div>
      <div className={styles.container}>
        <h3 className={styles.title}>Contacts</h3>
        <button className={`${styles.add} add`} onClick={openModal}>
          +
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className={`${styles.modalCentered}  modal-dialog modal-lg`}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2 className={`${styles.titleModal} modal-title`}>
                New Contact
              </h2>
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
                  <button
                    type="submit"
                    className={
                      addButtonDisabled
                        ? `${styles.button} ${styles.disabledButton}`
                        : styles.button
                    }
                    disabled={addButtonDisabled}
                  >
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
    </div>
  );
};

export default Form;
