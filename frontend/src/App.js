import React, { useEffect, useState } from 'react'; // Make sure to import useEffect
import './App.css';
import ContactInput from './ContactInput';
import Contacts from './Contacts';
import Header from './Header';

function App() {
    const [contacts, setContacts] = useState([]); // State to maintain contacts list

    useEffect(() => {
        fetch('http://localhost/api/contacts')
            .then(response => response.json())
            .then(data => setContacts(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const addContact = (name) => {
        // Logic to add contact
        // Here, you could also make an API call to POST the contact to your backend
        setContacts([...contacts, { name, phones: [] }]);
    };

    return (
        <div>
            <Header />
            <ContactInput addContact={addContact} />
            <Contacts contacts={contacts} />
        </div>
    );
}

export default App;
