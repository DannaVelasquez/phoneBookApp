import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const initialContactState = {
  contacts: [],
};

const ContactContext = createContext(initialContactState);
let updatedList;

const contactReducer = (state, action) => {
  switch (action.type) {
    case "GET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "DELETE_CONTACT":
        updatedList= state.contacts.filter(contact => contact.id !== action.payload);
        return {...state, contacts: updatedList};
    default:
      return state;
  }
};

const ContactProvider = ({ children }) => {
  const [contactState, contactDispatch] = useReducer(
    contactReducer,
    initialContactState
  );

  return (
    <ContactContext.Provider value={{ contactState, contactDispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

ContactProvider.propTypes = {
  children: PropTypes.node.isRequired, // Define la validación de children
};

export default ContactProvider;

export const useContactContext = () => useContext(ContactContext);
