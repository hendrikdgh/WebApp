import React, { useState } from 'react';
import './App.css';
import Header from './Header';

function App() {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);  // Store the clicked contact

    const addContact = (name) => {
        if (name.trim() !== '') {
            setContacts([...contacts, { name, phones: [] }]);
        }
    };

    const deleteContact = (index) => {
        const newContacts = [...contacts];
        newContacts.splice(index, 1);
        setContacts(newContacts);
    };

    const addPhoneNumber = (index, type, number) => {
        const newContacts = [...contacts];
        newContacts[index].phones.push({ type, number });
        setContacts(newContacts);
    };

    const deletePhoneNumber = (contactIndex, phoneIndex) => {
        const newContacts = [...contacts];
        newContacts[contactIndex].phones.splice(phoneIndex, 1);
        setContacts(newContacts);
    };

    return (
        <div>
            <Header />
            <div className="input-section">
                <input type="text" placeholder="Name" id="contact-name-input" />
                <button onClick={() => addContact(document.getElementById("contact-name-input").value)}>Create Contact</button>
            </div>
            <div>
                {contacts.map((contact, index) => (
                    <div key={index}>
                        <span className="contact-name" onClick={() => setSelectedContact(index === selectedContact ? null : index)}>{contact.name}</span>
                        <button onClick={() => deleteContact(index)}>Delete</button>
                        {index === selectedContact && (
                            <div className="phone-input-section">
                                <input type="text" placeholder="Name" id={`type-input-${index}`} />
                                <input type="text" placeholder="Phone Number" id={`phone-input-${index}`} />
                                <button onClick={() => addPhoneNumber(index, document.getElementById(`type-input-${index}`).value, document.getElementById(`phone-input-${index}`).value)}>Add</button>
                            </div>
                        )}
                        {contact.phones.map((phone, phoneIndex) => (
                            <div key={phoneIndex}>
                                <span>{phone.type}: {phone.number}</span>
                                <button onClick={() => deletePhoneNumber(index, phoneIndex)}>Delete</button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
