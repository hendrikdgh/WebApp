import React, { useEffect, useState } from 'react'; // Make sure to import useEffect
import './App.css';

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
            <h1>Contactor</h1>
            <div>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter Name"
                />
                <button onClick={handleAddContact}>Add Contact</button>
            </div>
            <div>
                {contacts.map(contact => (
                    <div key={contact.name}>
                        <span>{contact.name}</span>
                        <button onClick={() => handleDeleteContact(contact.name)}>Delete</button>
                        {selectedContact === contact.name && (
                            <div>
                                <input
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="Enter Phone Number"
                                />
                                <button onClick={handleAddPhone}>Add Phone</button>
                            </div>
                        )}
                        <button onClick={() => setSelectedContact(contact.name)}>View Phones</button>
                    </div>
                ))}
            </div>
            <div>
                <button>Show Stats</button>
                {selectedContact && (
                    <div>
                        <h2>{selectedContact}</h2>
                        <ul>
                            {contacts.find(c => c.name === selectedContact).phones.map(phone => (
                                <li key={phone}>{phone}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
