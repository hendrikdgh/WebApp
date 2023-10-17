import React, { useEffect, useState } from 'react';
import './App.css';
import { renderContacts } from './Contactor';
import Header from './Header';
import Stats from './Stats';

function App() {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [stats, setStats] = useState({
        numContacts: 0,
        numPhones: 0,
        oldestContact: '',
        newestContact: ''
    });
    const [name, setContactName] = useState('');
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        fetchContacts();
        fetchStats();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch('http://localhost:5006/api/contacts', {
                method:"GET"
            });
            const data = await response.json();  // <-- Add this line
            const contactsWithPhones = data.map(contact => ({
                ...contact,
                phones: contact.phones || []
            }));
            setContacts(contactsWithPhones);
        } catch (error) {
            console.error('There was a problem fetching the contacts:', error);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetch('http://localhost:5006/api/stats', {
                method:"GET"
            });
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('There was a problem fetching the stats:', error);
        }
    };

    const toggleStats = () => setShowStats(prevShowStats => !prevShowStats);  

    const addContact = async () => {
        if (name.trim() !== '') {
            try {
                const response = await fetch('http://localhost:5006/api/contacts/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: name })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const contact = await response.json();
                setContacts(prevContacts => [...prevContacts, contact]);
                setContactName('');
            } catch (error) {
                console.error('There was a problem adding the contact:', error);
            }
        }
    };
    

    const deleteContact = (contactId) => {
        fetch(`http://localhost:5006/api/contacts/${contactId}`, {
            method: 'DELETE'
        })
        .then(() => {
            setContacts(prevContacts => prevContacts.filter(contact => contact.contactId !== contactId));
        });
    };
    
    const addPhoneNumber = (contactId, type, number) => {
        fetch(`http://localhost:5006/api/contacts/${contactId}/phones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, number })
        })
        .then(response => response.json())
        .then(phone => {
            const newContacts = [...contacts];
            const contactIndex = newContacts.findIndex(contact => contact.contactId === contactId);
            if (!newContacts[contactIndex].phones) {
                newContacts[contactIndex].phones = [];
            }
            newContacts[contactIndex].phones.push(phone);
            setContacts(newContacts);
        });
    };
    
    
    const deletePhoneNumber = (contactId, phoneId) => {
        fetch(`http://localhost:5006/api/contacts/${contactId}/phones/${phoneId}`, {
            method: 'DELETE'
        })
        .then(() => {
            const newContacts = [...contacts];
            const contactIndex = newContacts.findIndex(contact => contact.contactId === contactId);
            newContacts[contactIndex].phones = newContacts[contactIndex].phones ? 
                newContacts[contactIndex].phones.filter(phone => phone.phoneId !== phoneId) :
                [];
            setContacts(newContacts);
        });
    };

    return (
        <div>
            <Header />
            <div className="container">
                <h2>Contactor</h2>
                <div className="input-section">
                    <input type="text" id="contact-name-input" placeholder="Name" value={name} onChange={e => setContactName(e.target.value)} />
                </div>
                <div>
                    <button onClick={addContact}>Create Contact</button> 
                </div><hr></hr>
                <div className="contacts-section">
                    {renderContacts(contacts, setSelectedContact, selectedContact, deleteContact, addPhoneNumber, deletePhoneNumber)}
                </div>
                </div><hr></hr>
                <div className="information-section">
                    <p>Click a contact to view associated phone numbers</p>
                </div>
                <div className="contacts-section">
                <button onClick={toggleStats} className="stats-toggle-btn">
                    {showStats ? "Hide Stats" : "Show Stats"}
                </button>
                </div>
                <div>
                {showStats && <Stats stats={stats} refreshStats={fetchStats} />}
                </div>
        </div>
    );
}

export default App;
