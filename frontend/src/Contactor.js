import React from 'react';
import './App.css';

export function renderContacts(contacts, setSelectedContact, selectedContact, deleteContact, addPhoneNumber, deletePhoneNumber) {
    const contactElements = [];

    for (let contact of contacts) {
        const contactId = contact.contactId;
        contactElements.push(
            <div className="contact-item" key={contactId}>
                <span className="contact-name" onClick={() => setSelectedContact(contactId === selectedContact ? null : contactId)}>{contact.name}</span>
                <button onClick={() => deleteContact(contactId)}>Delete</button>
    
                <div className="phone-section">
                    {contactId === selectedContact && (
                        <div className="phone-input-section">
                            <input type="text" placeholder="Name" id={`type-input-${contactId}`} />
                            <input type="text" placeholder="Phone Number" id={`phone-input-${contactId}`} />
                            <button onClick={() => addPhoneNumber(contactId, document.getElementById(`type-input-${contactId}`).value, document.getElementById(`phone-input-${contactId}`).value)}>Add</button>
                        </div>
                    )}
                    {contact.phones && contact.phones.length > 0 && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Phone Type</th>
                                    <th>Phone Number</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {contact.phones.map(phone => (
                                    <tr key={phone.phoneId}>
                                        <td>{phone.type}</td>
                                        <td>{phone.phone_number}</td>
                                        <td>
                                            <button onClick={() => deletePhoneNumber(contact.contactId, phone.phoneId)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        );
    }
    
    return contactElements;
}
