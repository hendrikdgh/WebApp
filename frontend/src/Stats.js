import React from 'react';

function Stats({ stats, refreshStats }) {
    return (
        <div>
            <p>Total Contacts: {stats.numContacts}</p>
            <p>Total Phones: {stats.numPhones}</p>
            <p>Oldest Contact Timestamp: {new Date(stats.oldestContact).toLocaleString()}</p>
            <p>Newest Contact Timestamp: {new Date(stats.newestContact).toLocaleString()}</p>
            <button onClick={refreshStats}>Refresh Stats</button>
        </div>
    );
}

export default Stats;
