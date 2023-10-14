import React, { useState } from 'react'; // Make sure to import useEffect
import './App.css';

function App() {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);

    const handleAddContact = () => {
        setContacts([...contacts, { name, phones: [] }]);
        setName("");
    };

    const handleAddPhone = () => {
        const updatedContacts = [...contacts];
        const contact = updatedContacts.find(c => c.name === selectedContact);
        contact.phones.push(phone);
        setContacts(updatedContacts);
        setPhone("");
    };

    const handleDeleteContact = (name) => {
        setContacts(contacts.filter(c => c.name !== name));
        setSelectedContact(null);
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
