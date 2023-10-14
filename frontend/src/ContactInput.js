import React, { useState } from 'react';

function ContactInput({ addContact }) {
    const [name, setName] = useState('');

    const handleSubmit = () => {
        addContact(name);
        setName(''); // Reset the input field
    };

    return (
        <div>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Input Name"
            />
            <button onClick={handleSubmit}>Add</button>
        </div>
    );
}

export default ContactInput;
