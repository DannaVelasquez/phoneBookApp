import { useState, useEffect } from "react";
import styles from "./ContactList.module.css";
import { FaPhone, FaTrash } from "react-icons/fa";
import Searchbar from "../Searchbar/searchbar";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchContact, setSearchContact] = useState("");

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


  const handleSearch = (event) => {
    setSearchContact(event.target.value);
  };
 



  return (
    
    <div className={styles.contactList}>
        <Searchbar handleSearch={handleSearch} /> 
        <br/>
      <ul className={`list-group  ${styles.list} ${styles.centerList}`}>
      {contacts.filter((contact) => {
        const fullName = `${contact.Name} ${contact.Lastname}`.toLowerCase();
        return fullName.includes(searchContact.toLowerCase()) || contact.Phone.includes(searchContact);
      }).map((contact) => (
          <li key={contact.id} className={`list-group-item d-flex justify-content-between ${styles.listItem}`}>
            <div>
            {contact.Name} {contact.Lastname}
            <br/>
            <div className={styles.phone}>
            <FaPhone className={styles.phoneIcon}/> {contact.Phone}

            </div>
            </div>
            <div>
            <FaTrash className={styles.deleteContact}/>
            </div>
            
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
