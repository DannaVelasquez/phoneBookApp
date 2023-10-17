import { useState, useEffect } from "react";
import styles from "./ContactList.module.css";
import { FaPhone, FaTrash } from "react-icons/fa";
import Searchbar from "../Searchbar/searchbar";
import { useContactContext } from "../ContactContext/ContactContext";
import ContactInfo from "../ContactInfo/ContactInfo";

const ContactList = () => {
  const [searchContact, setSearchContact] = useState("");
  const { contactState, contactDispatch } = useContactContext();
  const [selectedContact, setSelectedContact] = useState(null);

  //Llamada a API (Json Server) para consulta GET de los contactos
  useEffect(() => {
    fetch('http://localhost:3001/Contact')
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.Name.localeCompare(b.Name));
        contactDispatch({ type: 'GET_CONTACTS', payload: data });
      })
      .catch((error) => {
        console.error('Error al obtener la lista de contactos:', error);
      });
  }, [contactDispatch]);

  const handleSearch = (event) => {
    setSearchContact(event.target.value);
  };

  //Llamada a API (Json Server) para DELETE de los contactos
  const handleDeleteContact = (contactId) => {
    fetch(`http://localhost:3001/Contact/${contactId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Eliminación exitosa en el servidor, actualiza el estado local
          contactDispatch({ type: "DELETE_CONTACT", payload: contactId });
        } else {
          console.error("Error al eliminar el contacto en el servidor");
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el contacto:", error);
      });
  };

  const filteredContacts = contactState.contacts.filter((contact) => {
    const fullName = `${contact.Name} ${contact.Lastname}`.toLowerCase();
    return fullName.includes(searchContact.toLowerCase()) || contact.Phone.includes(searchContact);
  });

  const handleItemClick = (contact) => {
    // Abre el popup de información detallada al hacer clic en un ítem de la lista
    setSelectedContact(contact);
  };

  const handleCloseContactInfo = () => {
    // Cierra el popup de información detallada
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
              onClick={() => handleItemClick(contact)} // Abre información detallada al hacer clic
            >
              <div>
                {contact.Name} {contact.Lastname}
                <br />
                <div className={styles.phone}>
                  <FaPhone className={styles.phoneIcon} /> {contact.Phone}
                </div>
              </div>
              <div>
                <FaTrash className={styles.deleteContact} onClick={() => handleDeleteContact(contact.id)}/>
              </div>
            </li>
          ))
        ) : (
          <li className={`list-group-item ${styles.listItem}`}>
            No results founded.
          </li>
        )}
      </ul>
      {selectedContact && (
        // Muestra el popup de información detallada si se ha seleccionado un contacto
        <ContactInfo contact={selectedContact} onClose={handleCloseContactInfo} />
      )}
    </div>
  );
};

export default ContactList;
