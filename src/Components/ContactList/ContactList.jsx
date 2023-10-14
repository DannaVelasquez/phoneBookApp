import { useState, useEffect } from "react";

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
    <div>
      <h1>Contact List</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.Name} {contact.Lastname} - {contact.Phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
