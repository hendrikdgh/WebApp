import React, { useState } from 'react';

function ContactItem({ contact }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div onClick={() => setShowDetails(!showDetails)}>
            <p>{contact.name}</p>
            {showDetails && (
                <div>
                    {contact.phones.map((phone, idx) => (
                        <p key={idx}>{phone}</p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ContactItem;
