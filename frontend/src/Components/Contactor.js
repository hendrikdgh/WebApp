import React from 'react';

export function renderContacts(contacts, setSelectedContact, selectedContact, deleteContact, addPhoneNumber, deletePhoneNumber) {
    const contactElements = [];

    for (let contactId = 0; contactId < contacts.length; contactId++) {
        const contact = contacts[contactId];
        contactElements.push(
            <div className="contact-item" key={contactId}>
                <span className="contact-name" onClick={() => setSelectedContact(contactId === selectedContact ? null : contactId)}>{contact.name}</span>
                <button onClick={() => deleteContact(contactId)}>Delete</button>
                {contactId === selectedContact && (
                    <div className="phone-section">
                        <div className="phone-input-section">
                            <input type="text" placeholder="Name" id={`type-input-${contactId}`} />
                            <input type="text" placeholder="Phone Number" id={`phone-input-${contactId}`} />
                            <button onClick={() => addPhoneNumber(contactId, document.getElementById(`type-input-${contactId}`).value, document.getElementById(`phone-input-${contactId}`).value)}>Add</button>
                        </div>
                        {contact.phones && contact.phones.map((phone, phoneId) => (
                            <div className="phone-item" key={phoneId}>
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
                                            <td>{phone.phone_number}</td>
                                            <td>
                                                <button onClick={() => deletePhoneNumber(contactId, phoneId)}>Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return contactElements;
}
