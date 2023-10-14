import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [stats, setStats] = useState(null);

    const API_BASE_URL = '/api';  // Assuming the API is under the /api path

    // Fetch all contacts on component mount
    useEffect(() => {
        axios.get(`${API_BASE_URL}/contacts`).then(response => {
            setContacts(response.data);
        });
    }, []);

    // Function to create a new contact
    const createContact = (name) => {
        axios.post(`${API_BASE_URL}/contacts`, { name }).then(response => {
            setContacts([...contacts, response.data]);
        });
    };

    // Function to select a contact and fetch its phone numbers
    const selectContact = (contactId) => {
        axios.get(`${API_BASE_URL}/phones?contactId=${contactId}`).then(response => {
            setSelectedContact({
                ...contacts.find(c => c.id === contactId),
                phones: response.data
            });
        });
    };

    // Fetch stats
    const fetchStats = () => {
        axios.get(`${API_BASE_URL}/stats`).then(response => {
            setStats(response.data);
        });
    };

    return (
        <div className="app">
            {/* Contact creation */}
            <div className="contact-creation">
                {/* Add input and button elements here to create a new contact */}
            </div>

            {/* Contact list */}
            <div className="contact-list">
                {/* Map through contacts and display them, adding onClick handlers to select a contact */}
            </div>

            {/* Selected contact's phone numbers */}
            <div className="selected-contact-phones">
                {/* Display phone numbers of the selected contact here */}
            </div>

            {/* Stats */}
            <div className="stats">
                <button onClick={fetchStats}>Show Stats</button>
                {/* Display stats when fetched */}
            </div>
        </div>
    );
}

export default App;
