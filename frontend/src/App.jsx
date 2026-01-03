import React from "react";
import axios from "axios";
import ContactForm from "./Components/ContactForm";
import Contacts from "./Components/Contacts";

export default function App() {
  const [contacts, setContacts] = React.useState([]);

  React.useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(
          "https://contact-management-web-app-e7cs.onrender.com/api/contacts"
        );
        setContacts(res.data);
      } catch (err) {
        console.error("Failed to fetch contacts", err);
      }
    };
    fetchContacts();
  }, []);

  return (
    <React.Fragment>
      <div className="max-w-4xl mx-auto py-8">
        <ContactForm
          onSuccess={(newContact) =>
            setContacts((prev) => (newContact ? [...prev, newContact] : prev))
          }
        />
        <Contacts contacts={contacts} setContacts={setContacts} />
      </div>
    </React.Fragment>
  );
}
