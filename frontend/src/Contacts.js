import React from 'react';
import ContactItem from './ContactItem';

function Contacts({ contacts }) {
    return (
        <div>
            {contacts.map((contact, idx) => (
                <ContactItem key={idx} contact={contact} />
            ))}
        </div>
    );
}

export default Contacts;
