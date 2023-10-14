// Contacts.js
import React from 'react';

function Contacts({ contacts }) {
    return (
        <div>
            {contacts.map((contact, index) => (
                <div key={index}>
                    {contact.name}
                    {/* You could add logic here to display phone numbers for each contact when clicked */}
                </div>
            ))}
        </div>
    );
}

export default Contacts;
