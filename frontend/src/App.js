import React, { useState } from 'react';
import './App.css';

function App() {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneType, setPhoneType] = useState("mobile");
    const [selectedContact, setSelectedContact] = useState(null);

    const addContact = () => {
        if (name) {
            setContacts([...contacts, { name, phones: [] }]);
            setName("");
        }
    };

    const addPhone = () => {
        if (selectedContact && phone) {
            let updatedContacts = [...contacts];
            const index = updatedContacts.findIndex(c => c.name === selectedContact.name);
            updatedContacts[index].phones.push({ type: phoneType, number: phone });
            setContacts(updatedContacts);
            setPhone("");
        }
    };

    const selectContact = (contact) => {
        setSelectedContact(contact);
    };

    return (
        <div className="App">
            <div className="contact-section">
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={addContact}>Create Contact</button>
                
                <ul>
                    {contacts.map(contact => (
                        <li key={contact.name} onClick={() => selectContact(contact)}>
                            {contact.name}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedContact && (
                <div className="phone-section">
                    <h3>{selectedContact.name}</h3>
                    <input 
                        type="text" 
                        placeholder="Phone Number" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <select onChange={(e) => setPhoneType(e.target.value)}>
                        <option value="mobile">Mobile</option>
                        <option value="office">Office</option>
                        {/* You can add more phone types here */}
                    </select>
                    <button onClick={addPhone}>Add</button>

                    <ul>
                        {selectedContact.phones.map((p, index) => (
                            <li key={index}>
                                {p.type}: {p.number}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
