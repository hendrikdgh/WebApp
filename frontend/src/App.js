import React, { useEffect, useState } from 'react';
import './App.css';
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
            const response = await fetch('http://localhost/api/contacts');
            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.error('There was a problem fetching the contacts:', error);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetch('http://localhost/api/stats');
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
                const response = await fetch('http://localhost/api/contacts/', {
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
                fetchStats();
            } catch (error) {
                console.error('There was a problem adding the contact:', error);
            }
        }
    };
    

    const deleteContact = (index) => {
        const contactId = contacts[index].id;
        fetch(`http://localhost/api/contacts/${contactId}`, {
            method: 'DELETE'
        })
        .then(() => {
            setContacts(prevContacts => {
                const newContacts = [...prevContacts];
                newContacts.splice(index, 1);
                return newContacts;
            });
        });
    };
    

    const addPhoneNumber = (index, type, number) => {
        const contactId = contacts[index].id;
        fetch(`http://localhost/api/contacts/${contactId}/phones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, number })
        })
        .then(response => response.json())
        .then(phone => {
            const newContacts = [...contacts];
            newContacts[index].phones.push(phone);
            setContacts(newContacts);
        });
    };

    const deletePhoneNumber = (contactIndex, phoneIndex) => {
        const contactId = contacts[contactIndex].id;
        const phoneId = contacts[contactIndex].phones[phoneIndex].id;
        fetch(`http://localhost/api/contacts/${contactId}/phones/${phoneId}`, {
            method: 'DELETE'
        })
        .then(() => {
            const newContacts = [...contacts];
            newContacts[contactIndex].phones.splice(phoneIndex, 1);
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
                </div>
                <div className="contacts-section">
                    {contacts.map((contact, index) => (
                        <div className="contact-item" key={index}>
                            <span className="contact-name" onClick={() => setSelectedContact(index === selectedContact ? null : index)}>{contact.name}</span>
                            <button onClick={() => deleteContact(index)}>Delete</button>
                            {index === selectedContact && (
                                <div className="phone-section">
                                    <div className="phone-input-section">
                                        <input type="text" placeholder="Name" id={`type-input-${index}`} />
                                        <input type="text" placeholder="Phone Number" id={`phone-input-${index}`} />
                                        <button onClick={() => addPhoneNumber(index, document.getElementById(`type-input-${index}`).value, document.getElementById(`phone-input-${index}`).value)}>Add</button>
                                    </div>
                                    {contact.phones.map((phone, phoneIndex) => (
                                        <div className="phone-item" key={phoneIndex}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Number</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{phone.type}</td>
                                                    <td>{phone.number}</td>
                                                    <td>
                                                        <button onClick={() => deletePhoneNumber(index, phoneIndex)}>Delete</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                </div>
                <div className="information-section">
                    <p>Click a contact to view associated phone numbers</p>
                </div>
                <div className="contacts-section">
                <button onClick={toggleStats} className="stats-toggle-btn">
                    {showStats ? "Hide Stats" : "Show Stats"}
                </button>
                </div>
                {showStats && <Stats stats={stats} />}
            </div>
        </div>
    );    
}

export default App;
