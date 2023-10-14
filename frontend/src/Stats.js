import React from 'react';

function Stats() {
  // Dummy data for now
  const stats = {
    totalContacts: 1,
    totalPhones: 1,
    newestContact: "Kiki",
    oldestContact: "John"
  };

  return (
    <div>
      <p>Total Contacts: {stats.totalContacts}</p>
      <p>Total Phones: {stats.totalPhones}</p>
      <p>Newest Contact: {stats.newestContact}</p>
      <p>Oldest Contact: {stats.oldestContact}</p>
    </div>
  );
}

export default Stats;
