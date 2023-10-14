import React, { useState } from 'react';
import './App.css';
import Header from './Header';

function App() {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);  // Store the clicked contact
    const [showStats, setShowStats] = useState(false);

    const toggleStats = () => {
        setShowStats(!showStats);
    };

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

    const stats = {
        numberOfContacts: contacts.length,
        numberOfPhones: contacts.reduce((acc, contact) => acc + contact.phones.length, 0),
        newestContactTimestamp: contacts.length ? contacts[contacts.length - 1].timestamp : '',
        oldestContactTimestamp: contacts.length ? contacts[0].timestamp : ''
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

            <button onClick={toggleStats}>
                {showStats ? "Hide Stats" : "Show Stats"}
            </button>

            {showStats && (
                <div className="stats-section">
                    <h2>Statistics</h2>
                    <p>Number of Contacts: {stats.numberOfContacts}</p>
                    <p>Number of Phones: {stats.numberOfPhones}</p>
                    <p>Newest Contact Timestamp: {stats.newestContactTimestamp}</p>
                    <p>Oldest Contact Timestamp: {stats.oldestContactTimestamp}</p>
                </div>
            )}
        </div>
    );
}

export default App;
