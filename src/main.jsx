import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContactProvider from "./Components/ContactContext/ContactContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContactProvider>
      <App />
    </ContactProvider>
  </BrowserRouter>
);
