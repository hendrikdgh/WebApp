import React, { useState } from 'react';

function ContactItem({ contact }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div onClick={() => setShowDetails(!showDetails)}>
            <p>{contact.name}</p>
            {showDetails && (
                <div>
                    {/* Display phone details, perhaps in another component */}
                </div>
            )}
        </div>
    );
}

export default ContactItem;
