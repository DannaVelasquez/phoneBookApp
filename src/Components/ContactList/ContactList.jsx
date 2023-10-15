import { useState, useEffect } from "react";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/Contact")
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de contactos:", error);
      });
  }, []); 

  return (
    <div className={styles.contactList}>
      <ul className={`list-group ${styles.list}`}>
        {contacts.map((contact) => (
          <li key={contact.id} className={`list-group-item ${styles.listItem}`}>
            {contact.Name} {contact.Lastname}
            {contact.Phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
