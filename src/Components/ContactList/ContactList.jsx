import { useState, useEffect } from "react";
import styles from "./ContactList.module.css";
import { FaPhone, FaTrash } from "react-icons/fa";
import Searchbar from "../Searchbar/searchbar";
import { useContactContext } from "../ContactContext/ContactContext";
import ContactInfo from "../ContactInfo/ContactInfo";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const ContactList = () => {
  const [searchContact, setSearchContact] = useState("");
  const { contactState, contactDispatch } = useContactContext(); //usa el contexto global
  const [selectedContact, setSelectedContact] = useState(null);

  //Llamada a API (Json Server) para consulta GET de los contactos
  useEffect(() => {
    fetch("http://localhost:3001/Contact")
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.Name.localeCompare(b.Name)); //Organiza los datos resultantes en orden alfabético (A-Z)
        contactDispatch({ type: "GET_CONTACTS", payload: data });
      })
      .catch((error) => {
        console.error("Error al obtener la lista de contactos:", error);
      });
  }, [contactDispatch]);

  //Función para manejar la búsqueda en la barra
  const handleSearch = (event) => {
    setSearchContact(event.target.value);
  };

  //Llamada a API (Json Server) para DELETE de los contactos
  const handleDeleteContact = (contactId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el contacto permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#176294",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/Contact/${contactId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              // Elimina contacto en el servidor, actualiza el estado local
              contactDispatch({ type: "DELETE_CONTACT", payload: contactId });
            } else {
              console.error("Error al eliminar el contacto en el servidor");
            }
          })
          .catch((error) => {
            console.error("Error al eliminar el contacto:", error);
          });
      }
    });
  };

  //Función para filtrar los contactos de acuerdo a lo que se busque en la barra
  const filteredContacts = contactState.contacts.filter((contact) => {
    const fullName = `${contact.Name} ${contact.Lastname}`.toLowerCase();
    return (
      fullName.includes(searchContact.toLowerCase()) ||
      contact.Phone.includes(searchContact)
    );
  });

  //Manejo de estados para el pop-up de información al seleccionar un contacto en específico
  const handleItemClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleCloseContactInfo = () => {
    setSelectedContact(null);
  };

  return (
    <div className={styles.contactList}>
      <Searchbar handleSearch={handleSearch} />
      <br />
      <ul className={`list-group  ${styles.list} ${styles.centerList}`}>
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <li
              key={contact.id}
              className={`list-group-item d-flex justify-content-between ${styles.listItem}`}
            >
              <div onClick={() => handleItemClick(contact)}>
                {contact.Name} {contact.Lastname}
                <br />
                <div className={styles.phone}>
                  <FaPhone className={styles.phoneIcon} /> {contact.Phone}
                </div>
              </div>
              <div>
                <FaTrash
                  className={styles.deleteContact}
                  onClick={() => handleDeleteContact(contact.id)}
                />
              </div>
            </li>
          ))
        ) : (
          <li className={`list-group-item ${styles.listItem}`}>
            No results found.
          </li>
        )}
      </ul>
      {selectedContact && (
        <ContactInfo
          contact={selectedContact}
          onClose={handleCloseContactInfo}
        />
      )}
    </div>
  );
};

export default ContactList;
