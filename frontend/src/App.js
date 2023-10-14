import React, { useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [phones, setPhones] = useState([]);
  const [stats, setStats] = useState({});

  // Load Contacts
  const loadContacts = () => {
    fetch('/api/contacts')
      .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setContacts(data))
      .catch(error => console.error('Error fetching contacts:', error.message));
  };

  // Load Phones
  const loadPhones = () => {
    fetch('/api/phones')
      .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setPhones(data))
      .catch(error => console.error('Error fetching phones:', error.message));
  };

  // Load Stats
  const loadStats = () => {
    fetch('/api/stats')
      .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setStats(data))
      .catch(error => console.error('Error fetching stats:', error.message));
  };

  return (
    <div className="App">
      <button onClick={loadContacts}>Load Contacts</button>
      <button onClick={loadPhones}>Load Phones</button>
      <button onClick={loadStats}>Load Stats</button>

      <div className="data-display">
        <div>
          <h3>Contacts:</h3>
          {/* Render your contacts data here */}
        </div>
        <div>
          <h3>Phones:</h3>
          {/* Render your phones data here */}
        </div>
        <div>
          <h3>Stats:</h3>
          {/* Render your stats data here */}
        </div>
      </div>
    </div>
  );
}

export default App;
