import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';

function App() {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showStats, setShowStats] = useState(false);
    const [contactName, setContactName] = useState('');

    useEffect(() => {
        fetch('http://localhost/api/contacts')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const toggleStats = () => {
        setShowStats(!showStats);
    };

    const addContact = (name) => {
        const inputElement = document.getElementById("contact-name-input");
        if (contactName.trim() !== '') {
            fetch('http://localhost/api/contacts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: inputElement.value })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(contact => {
                setContacts([...contacts, contact]);
                inputElement.value = '';  // Clear the input after adding
            })
            .catch(error => {
                console.error('There was a problem adding the contact:', error);
            });
        }
    };

    // ... Rest of the functions ...

    return (
        <div>
            <Header />
            <div className="input-section">
                <input type="text" id="contact-name-input" placeholder="Name" value={contactName} onChange={e => setContactName(e.target.value)} />
                <button onClick={() => addContact(document.getElementById("contact-name-input").value)}>Create Contact</button>
            </div>
            <div>
                {contacts.map((contact, index) => (
                    // ... Rest of the mapping ...
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
