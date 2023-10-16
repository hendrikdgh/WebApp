import React from 'react';

function Stats({ stats, refreshStats }) {
    return (
        <div>
            <p>Total Contacts: {stats.numberOfContacts}</p>
            <p>Total Phones: {stats.numberOfPhones}</p>
            <p>Newest Contact: {new Date(stats.newestContactTimestamp).toLocaleString()}</p>
            <p>Oldest Contact: {new Date(stats.oldestContactTimestamp).toLocaleString()}</p>
            <button onClick={refreshStats}>Refresh Stats</button>
        </div>
    );
}

export default Stats;
